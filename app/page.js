import Home from '../components/Home';import {tools,CATS} from '../lib';
export default function P(){return <>
<header className="page-head"><div className="page-head--row"><h1>中文用研人的 AI 工具榜</h1><span className="page-head__aside num">共 {tools.length} 个 · {CATS.length} 类</span></div>
<p className="page-head__desc">访谈转写、AI 主持访谈、合成用户、问卷、研究仓库、可用性测试与通用大模型。每个工具附介绍与用研场景，标注中文支持、国内可用性、免费版与价格来源。</p></header>
<Home/></>}
