'use client';
import {Suspense} from 'react';
import Link from 'next/link';
import {usePathname,useSearchParams} from 'next/navigation';
import Icon from './Icon';
import {tools,CATS,CAT_SLUG,REGIONS,catCount,regionCount,UXHOT} from '../lib';

const home=(r,c)=>{const s=new URLSearchParams();if(r)s.set('region',r);if(c)s.set('cat',c);const q=s.toString();return q?`/?${q}`:'/'};
function Side({path,region,cat}){
 const cur=(href,r,c)=>(href==='/'?path==='/'&&region===r&&cat===c:path.startsWith(href))?'page':undefined;
 const L=({href,icon,label,count,r='',c=''})=><Link className="side-link" href={href} aria-current={cur(href.split('?')[0],r,c)}><span className="side-link__icon"><Icon n={icon}/></span><span className="side-link__label">{label}</span>{count!=null&&<span className="side-link__count">{count}</span>}</Link>;
 return <nav className="sidebar__nav" aria-label="主导航">
  <div className="sidebar__section">工具榜</div>
  <div className="sidebar__items"><L href="/" icon="home" label="全部工具" count={tools.length}/><L href={home('cn')} r="cn" icon="cn" label={REGIONS.cn} count={regionCount('cn')}/><L href={home('intl')} r="intl" icon="globe" label={REGIONS.intl} count={regionCount('intl')}/></div>
  <div className="sidebar__section">分类{region&&` · ${REGIONS[region]}`}</div>
  <div className="sidebar__items">{CATS.map(c=><L key={c} href={home(region,CAT_SLUG[c])} r={region} c={CAT_SLUG[c]} icon={CAT_SLUG[c]} label={c} count={catCount(c,region)}/>)}</div>
  <div className="sidebar__section">参与</div>
  <div className="sidebar__items"><L href="/submit/" icon="plus" label="提交 / 纠错"/><L href="/sponsor/" icon="handshake" label="合作"/><L href="/about/" icon="info" label="关于"/></div>
  <div className="sidebar__section">姊妹站</div>
  <div className="sidebar__items"><a className="side-link" href={UXHOT}><span className="side-link__icon"><Icon n="flame"/></span><span className="side-link__label">URhot 热点</span><Icon n="external" s={12}/></a></div>
 </nav>}

function Phone({path,region,cat}){
 const cur=href=>{const [p,q='']=href.split('?');return (p==='/'?path==='/'&&!cat&&q===(region?`region=${region}`:''):path.startsWith(p))?'page':undefined};
 return <nav className="phonebar__nav" aria-label="主导航">
  {[['/','全部工具'],['/?region=cn',REGIONS.cn],['/?region=intl',REGIONS.intl],['/submit/','提交 / 纠错'],['/sponsor/','合作'],['/about/','关于']].map(([h,l])=><Link key={h} href={h} aria-current={cur(h)}>{l}</Link>)}
  <a href={UXHOT}>URhot 热点<Icon n="external" s={12}/></a>
 </nav>}

function WithParams({phone}){const path=usePathname();const sp=useSearchParams();const r=REGIONS[sp.get('region')]?sp.get('region'):'';const c=sp.get('cat')||'';return phone?<Phone path={path} region={r} cat={c}/>:<Side path={path} region={r} cat={c}/>}
function NoParams({phone}){const path=usePathname();return phone?<Phone path={path} region="" cat=""/>:<Side path={path} region="" cat=""/>}
export default function Nav({phone}){return <Suspense fallback={<NoParams phone={phone}/>}><WithParams phone={phone}/></Suspense>}
