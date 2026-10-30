import Link from 'next/link';import Home from '../components/Home';import {tools,CATS} from '../lib';
export default function P(){const recent=[...tools].sort((a,b)=>b.added.localeCompare(a.added)).slice(0,6);return <>
<section className="hero"><span className="eyebrow">真知浩见出品 · {tools.length} 个工具 · {CATS.length} 类</span><h1>中文用研人的 AI 工具榜</h1><p>收录访谈转写、AI 主持访谈、合成用户、问卷、研究仓库、可用性测试与通用大模型等 AI 用研工具，标注中文支持、国内可用性、免费版与价格来源。</p></section>
<div className="box"><b>本周新工具</b> <span className="muted">（首批收录 · 2026-10-30）</span><div style={{marginTop:6}}>{recent.map(t=><Link key={t.id} className="tag b" href={`/tools/${t.id}/`}>{t.name}</Link>)}</div></div>
<Home/></>}
