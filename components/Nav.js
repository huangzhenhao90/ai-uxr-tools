'use client';
import {Suspense} from 'react';
import Link from 'next/link';
import {usePathname,useSearchParams} from 'next/navigation';
import Icon from './Icon';
import {tools,CATS,CAT_SLUG,catCount,UXHOT} from '../lib';

function Side({path,cat}){
 const cur=(href,c)=>(href==='/'?path==='/'&&cat===c:path.startsWith(href))?'page':undefined;
 const L=({href,icon,label,count,c=''})=><Link className="side-link" href={href} aria-current={cur(href.split('?')[0],c)}><span className="side-link__icon"><Icon n={icon}/></span><span className="side-link__label">{label}</span>{count!=null&&<span className="side-link__count">{count}</span>}</Link>;
 return <nav className="sidebar__nav" aria-label="主导航">
  <div className="sidebar__section">工具榜</div>
  <div className="sidebar__items"><L href="/" icon="home" label="全部工具" count={tools.length}/></div>
  <div className="sidebar__section">分类</div>
  <div className="sidebar__items">{CATS.map(c=><L key={c} href={`/?cat=${CAT_SLUG[c]}`} c={CAT_SLUG[c]} icon={CAT_SLUG[c]} label={c} count={catCount(c)}/>)}</div>
  <div className="sidebar__section">参与</div>
  <div className="sidebar__items"><L href="/submit/" icon="plus" label="提交 / 纠错"/><L href="/sponsor/" icon="handshake" label="合作"/><L href="/about/" icon="info" label="关于"/></div>
  <div className="sidebar__section">姊妹站</div>
  <div className="sidebar__items"><a className="side-link" href={UXHOT}><span className="side-link__icon"><Icon n="flame"/></span><span className="side-link__label">URhot 热点</span><Icon n="external" s={12}/></a></div>
 </nav>}

function Phone({path,cat}){
 const cur=href=>(href==='/'?path==='/'&&!cat:path.startsWith(href))?'page':undefined;
 return <nav className="phonebar__nav" aria-label="主导航">
  {[['/','全部工具'],['/submit/','提交 / 纠错'],['/sponsor/','合作'],['/about/','关于']].map(([h,l])=><Link key={h} href={h} aria-current={cur(h)}>{l}</Link>)}
  <a href={UXHOT}>URhot 热点<Icon n="external" s={12}/></a>
 </nav>}

function WithParams({phone}){const path=usePathname();const cat=useSearchParams().get('cat')||'';return phone?<Phone path={path} cat={cat}/>:<Side path={path} cat={cat}/>}
function NoParams({phone}){const path=usePathname();return phone?<Phone path={path} cat=""/>:<Side path={path} cat=""/>}
export default function Nav({phone}){return <Suspense fallback={<NoParams phone={phone}/>}><WithParams phone={phone}/></Suspense>}
