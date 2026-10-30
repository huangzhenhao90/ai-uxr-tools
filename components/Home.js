'use client';
import {useState,useMemo,useEffect,Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';import Icon from './Icon';import Badges from './Badges';
import {tools,CATS,CAT_SLUG,REGIONS,known} from '../lib';
const SLUG_CAT=Object.fromEntries(Object.entries(CAT_SLUG).map(([c,s])=>[s,c]));
const FLAGS=[['zh','支持中文',t=>t.chinese_support==='yes'||t.chinese_support==='partial'],['free','有免费版',t=>t.free_tier==='yes'||t.free_tier==='partial']];
const SORTS={default:'信息完整优先',new:'最近收录',name:'名称 A–Z'};
const EMPTY={region:'',cat:'',q:'',zh:false,free:false,sort:'default'};
const parse=s=>({region:REGIONS[s.get('region')]?s.get('region'):'',cat:SLUG_CAT[s.get('cat')]?s.get('cat'):'',q:s.get('q')||'',zh:s.has('zh'),free:s.has('free'),sort:SORTS[s.get('sort')]?s.get('sort'):'default'});
const toQuery=f=>{const s=new URLSearchParams();if(f.region)s.set('region',f.region);if(f.cat)s.set('cat',f.cat);if(f.q)s.set('q',f.q);for(const k of ['zh','free'])if(f[k])s.set(k,'1');if(f.sort!=='default')s.set('sort',f.sort);const q=s.toString();return q?'?'+q:''};

// 读取 URL 参数（侧栏分类链接、分享链接、前进后退）
function Sync({f,set}){const sp=useSearchParams();useEffect(()=>{const n=parse(sp);if(toQuery(n)!==toQuery(f))set(n)},[sp]);return null}

function Hl({text,q}){if(!q)return text;const i=text.toLowerCase().indexOf(q.toLowerCase());if(i<0)return text;return <>{text.slice(0,i)}<mark>{text.slice(i,i+q.length)}</mark>{text.slice(i+q.length)}</>}

export default function Home(){
 const [f,setF]=useState(EMPTY);
 // 用户操作时同步写入 URL，便于刷新和分享
 const go=n=>{setF(n);const q=toQuery(n);if(q!==location.search)history.replaceState(null,'',location.pathname+q)};
 const up=p=>go({...f,...p});
 const cat=SLUG_CAT[f.cat]||'';
 const base=useMemo(()=>{const q=f.q.trim().toLowerCase();return tools.filter(t=>(!f.region||t.region===f.region)&&FLAGS.every(([k,,fn])=>!f[k]||fn(t))&&(!q||[t.name,t.summary,t.intro,t.use_case,t.category].join(' ').toLowerCase().includes(q)))},[f.region,f.q,f.zh,f.free]);
 const list=useMemo(()=>{const l=base.filter(t=>!cat||t.category===cat);
  if(f.sort==='name')return [...l].sort((a,b)=>a.name.localeCompare(b.name,'zh-CN'));
  if(f.sort==='new')return [...l].sort((a,b)=>b.added.localeCompare(a.added));
  return [...l].sort((a,b)=>known(b)-known(a))},[base,cat,f.sort]);
 const active=f.region||f.cat||f.q||f.zh||f.free;
 const q=f.q.trim();
 return <>
 <Suspense fallback={null}><Sync f={f} set={setF}/></Suspense>
 <div className="region-switch" role="group" aria-label="按产品来源筛选">
  {[['','全部工具','国内外全部收录'],['cn',REGIONS.cn,'中国团队出品，中文界面'],['intl',REGIONS.intl,'海外团队出品，多为英文界面']].map(([r,l,d])=><button key={r} type="button" className="region-switch__opt" aria-pressed={f.region===r} onClick={()=>up({region:r,cat:''})}><span className="region-switch__name">{l}<span className="num">{r?tools.filter(t=>t.region===r).length:tools.length}</span></span><span className="region-switch__desc">{d}</span></button>)}
 </div>
 <div className="tabs-wrap"><div className="pill-tabs" role="group" aria-label="按分类筛选">
  {[['',`全部`,base.length],...CATS.map(c=>[CAT_SLUG[c],c,base.filter(t=>t.category===c).length])].map(([s,l,n])=><button key={s} type="button" className={'pill-tabs__tab'+(n?'':' is-empty')} aria-pressed={f.cat===s} onClick={()=>up({cat:s})}>{l}<span className="pill-tabs__n">{n}</span></button>)}
 </div></div>
 <div className="filter-bar">
  <div className="chip-row" role="group" aria-label="条件筛选">{FLAGS.map(([k,l])=><button key={k} type="button" className="chip" aria-pressed={f[k]} onClick={()=>up({[k]:!f[k]})}>{f[k]&&<span aria-hidden="true">✓</span>}{l}</button>)}</div>
  <div className="filter-bar__tools">
   <select className="select" aria-label="排序" value={f.sort} onChange={e=>up({sort:e.target.value})}>{Object.entries(SORTS).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
   <label className="search-box"><Icon n="search" s={15}/><span className="sr-only">搜索工具</span><input type="search" placeholder="搜索工具或用途：转写、访谈…" value={f.q} onChange={e=>up({q:e.target.value})}/>{f.q&&<button type="button" className="search-box__clear" aria-label="清空搜索" onClick={()=>up({q:''})}><Icon n="x" s={12}/></button>}</label>
  </div>
 </div>
 <div className="result-line" aria-live="polite"><span>{f.region?`${REGIONS[f.region]} · `:''}{cat?`${cat} · `:''}显示 {list.length} 个工具</span>{active&&<button type="button" className="link-button" onClick={()=>go(EMPTY)}>清除筛选</button>}</div>
 {list.length?<div className="grid-cards">{list.map(t=><article key={t.id} className="card card--item">
  <div className="card__head"><span className="badge badge--accent">{t.category}</span><span>{REGIONS[t.region]}</span><a className="card__origin" href={t.url} target="_blank" rel="nofollow noopener" aria-label={`${t.name} 官网（新窗口）`}>官网<Icon n="external" s={12}/></a></div>
  <h2 className="card__title"><Link className="card__link" href={`/tools/${t.id}/`}><Hl text={t.name} q={q}/></Link></h2>
  <p className="card__summary"><Hl text={t.summary} q={q}/></p>
  <div className="card__badges"><Badges t={t}/></div>
  <p className="card__reason"><span>用研场景：{t.use_case}</span></p>
 </article>)}</div>
 :<div className="empty">没有符合条件的工具。<br/>试试减少筛选条件，或者 <button type="button" className="link-button" onClick={()=>go(EMPTY)}>清除全部筛选</button>。<br/>知道一个应该收录的工具？<Link className="text-link" href="/submit/">推荐给我们</Link></div>}
 <p className="legend">全部 {tools.length} 个工具的官网与登录/应用域名，已于 2026-10-30 从中国大陆多地节点实测可直接打开（依赖海外服务的功能如第三方登录、视频上传未逐一测试）。“支持中文”指能处理中文内容（中文转写、访谈或问卷），依据见各工具详情页；查不到官方说明的标为“待核实”。</p>
 </>}
