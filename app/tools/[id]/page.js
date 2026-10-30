import Link from 'next/link';import Icon from '../../../components/Icon';import Badges from '../../../components/Badges';
import {tools,ZH,YN,CAT_SLUG,REGIONS,catCount,known} from '../../../lib';
export function generateStaticParams(){return tools.map(t=>({id:t.id}))}
export async function generateMetadata({params}){const {id}=await params;const t=tools.find(x=>x.id===id);const title=`${t.name} · AI用研工具榜`;return {title,description:t.summary,openGraph:{title,description:t.summary,type:'article',locale:'zh_CN',siteName:'AI用研工具榜'}}}
const Fact=({k,v,label,id,note,src})=><div className="fact"><div className="fact__k">{k}</div><div className={'fact__v is-'+v}>{label[v]}</div>{note&&<p className="fact__note">{note}{src&&<> · <a href={src} target="_blank" rel="nofollow noopener">依据</a></>}</p>}{v==='unknown'&&<div className="fact__meta"><Link href={`/submit/?tool=${id}`}>知道答案？告诉我们</Link></div>}</div>;
export default async function P({params}){const {id}=await params;const t=tools.find(x=>x.id===id);
 const slug=CAT_SLUG[t.category];
 const related=tools.filter(x=>x.category===t.category&&x.id!==t.id).sort((a,b)=>known(b)-known(a)).slice(0,4);
 const host=t.url.replace(/^https?:\/\/(www\.)?/,'').replace(/\/.*$/,'');
 return <div className="reading">
 <nav className="crumbs" aria-label="面包屑"><Link href="/">工具榜</Link> / <Link href={`/?region=${t.region}`}>{REGIONS[t.region]}</Link> / <Link href={`/?cat=${slug}`}>{t.category}</Link></nav>
 <header className="hero-card">
  <div className="hero-card__kicker"><span className="badge badge--accent">{t.category}</span><span className="badge">{REGIONS[t.region]}</span><Badges t={t}/></div>
  <h1 className="hero-card__title">{t.name}</h1>
  <p className="hero-card__desc">{t.summary}</p>
  <div className="action-row"><a className="pill-button pill-button--primary" href={t.url} target="_blank" rel="nofollow noopener">访问官网 {host}<Icon n="external" s={14}/></a><Link className="pill-button" href={`/submit/?tool=${t.id}`}>纠错 / 补充信息</Link></div>
 </header>
 <section className="section" aria-labelledby="s-intro"><h2 className="section__title" id="s-intro">介绍</h2>
  <div className="prose"><p>{t.intro}</p></div>
  <p className="callout"><strong>用研场景：</strong>{t.use_case}</p>
 </section>
 <section className="section" aria-labelledby="s-facts"><h2 className="section__title" id="s-facts">关键信息</h2>
  <div className="facts">
   <Fact k="中文支持" v={t.chinese_support} label={ZH} id={t.id} note={t.zh_note} src={t.zh_source}/>
   <Fact k="国内可直接访问" v={t.china_accessible} label={YN} id={t.id} note={t.cn_note}/>
   <Fact k="免费版" v={t.free_tier} label={YN} id={t.id}/>
   <div className="fact fact--wide"><div className="fact__k">价格概要</div><div className="fact__price">{t.pricing}</div><div className="fact__meta num">核实日期 {t.pricing_checked} · <a href={t.source_url} target="_blank" rel="nofollow noopener">价格来源</a></div></div>
  </div>
  <p className="muted" style={{marginTop:10}}>信息整理自官网，可能随时变化，以官网为准。</p>
 </section>
 {related.length>0&&<section className="section" aria-labelledby="s-rel"><h2 className="section__title" id="s-rel">同类工具<Link className="section__count text-link" href={`/?cat=${slug}`}>查看全部 {catCount(t.category)} 个 →</Link></h2>
  <div className="grid-tiles">{related.map(r=><Link key={r.id} className="tile" href={`/tools/${r.id}/`}><div className="tile__name">{r.name}</div><p className="tile__desc">{r.summary}</p></Link>)}</div>
 </section>}
 </div>}
