import './globals.css';import Link from 'next/link';import {BASE,UXHOT} from '../lib';import Baidu from '../components/Baidu';
export const metadata={title:'AI用研工具榜 · 中文用研人的 AI 工具榜',description:'中文用研人的 AI 用户研究工具目录：标注中文支持、国内可用性、免费版与价格来源。真知浩见出品。'};
export const viewport={width:'device-width',initialScale:1,themeColor:'#faf9f6'};
const Mark=()=><svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#176b75"/><path d="M8 23l5-14h2l5 14M10 18h8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24.5" cy="9" r="3.2" fill="#f2b84b"/></svg>;
const HM=`var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?83c75a4bd0be4caa753d999c2313e715";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`;
export default function L({children}){return <html lang="zh-CN"><head><script dangerouslySetInnerHTML={{__html:HM}}/></head><body>
<header className="top"><div className="wrap top__in"><Link className="logo" href="/"><Mark/><span><b>AI用研</b>工具榜</span></Link>
<nav><Link href="/">工具</Link><Link href="/submit/">提交工具</Link><Link href="/sponsor/">合作</Link><Link href="/about/">关于</Link><a className="sister" href={UXHOT}>UXHOT 热点 ↗</a></nav></div></header>
<main className="wrap">{children}</main>
<footer className="wrap foot"><span className="byline"><img src={`${BASE}/brand/maker-96.png`} width="20" height="20" alt=""/>真知浩见出品</span>
<p>姊妹站：<a href={UXHOT}>UXHOT · AI 用研热点</a>（每日 AI 用研动态）</p>
<p>工具信息由人工整理自各官网，价格以官网为准；标注“未知/待核实”的字段尚未确认。收录、纠错与合作请在公众号「真知浩见」后台留言。</p><p>© 2026 AI用研工具榜 · 主理人 真浩</p></footer><Baidu/></body></html>}
