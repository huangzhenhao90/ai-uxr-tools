import Link from 'next/link';import {tools,ZH,YN} from '../../../lib';import Cta from '../../../components/Cta';
export function generateStaticParams(){return tools.map(t=>({id:t.id}))}
export async function generateMetadata({params}){const {id}=await params;const t=tools.find(x=>x.id===id);return {title:`${t.name} · AI用研工具榜`,description:t.description}}
export default async function P({params}){const {id}=await params;const t=tools.find(x=>x.id===id);return <div className="reading">
<p className="crumbs"><Link href="/">← 返回榜单</Link></p><h1 className="title">{t.name}</h1><span className="tag b">{t.category}</span><p className="lead">{t.description}</p>
<div className="box"><table><tbody>
<tr><td>官网</td><td><a href={t.url} target="_blank" rel="nofollow noopener">{t.url}</a></td></tr>
<tr><td>中文支持</td><td>{ZH[t.chinese_support]}</td></tr><tr><td>国内可直接访问</td><td>{YN[t.china_accessible]}</td></tr><tr><td>数据存储在境内</td><td>{YN[t.data_in_china]}</td></tr>
<tr><td>免费版</td><td>{YN[t.free_tier]}</td></tr><tr><td>价格概要</td><td>{t.pricing}<div className="muted">核实日期 {t.pricing_checked} · <a href={t.source_url} target="_blank" rel="nofollow noopener">来源</a></div></td></tr>
</tbody></table></div>
<p className="muted">信息整理自官网，可能随时变化；“未知/待核实”表示尚未确认。发现错误？<Link href="/submit/">告诉我们</Link></p><Cta/></div>}
