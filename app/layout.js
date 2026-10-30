import './globals.css';import Link from 'next/link';import {BASE} from '../lib';import Baidu from '../components/Baidu';import Nav from '../components/Nav';import ThemeSwitch from '../components/ThemeSwitch';
const DESC='中文用研人的 AI 用户研究工具目录：每个工具都有介绍和用研场景，标注中文支持、国内可用性、免费版与价格来源。真知浩见出品。';
export const metadata={title:'AI用研工具榜 · 中文用研人的 AI 工具榜',description:DESC,openGraph:{title:'AI用研工具榜 · 中文用研人的 AI 工具榜',description:DESC,type:'website',locale:'zh_CN',siteName:'AI用研工具榜'}};
export const viewport={width:'device-width',initialScale:1,themeColor:[{media:'(prefers-color-scheme: light)',color:'#faf9f6'},{media:'(prefers-color-scheme: dark)',color:'#13191c'}]};
const Mark=({s=28})=><svg width={s} height={s} viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="9" fill="#176b75"/><path d="M8 23l5-14h2l5 14M10 18h8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24.5" cy="9" r="3.2" fill="#f2b84b"/></svg>;
const Byline=({sm})=><span className={'byline'+(sm?' byline--sm':'')}><img src={`${BASE}/brand/maker-96.png`} width="96" height="96" alt=""/>真知浩见出品</span>;
const HM=`var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?83c75a4bd0be4caa753d999c2313e715";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`;
// 首帧前应用已保存的主题，避免闪烁
const THEME=`try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;
export default function L({children}){return <html lang="zh-CN" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:THEME}}/><script dangerouslySetInnerHTML={{__html:HM}}/></head><body>
<div className="shell">
<aside className="sidebar"><Link className="sidebar__brand" href="/" aria-label="AI用研工具榜 首页"><span className="wordmark"><Mark s={30}/><span><b>AI用研</b><span>工具榜</span></span></span></Link>
<span className="sidebar__byline"><Byline/></span><Nav/><div className="sidebar__foot"><ThemeSwitch/></div></aside>
<div className="shell__main">
<header className="phonebar"><div className="phonebar__top"><Link className="phonebar__brand" href="/" aria-label="AI用研工具榜 首页"><span className="wordmark wordmark--small"><Mark s={26}/><span><b>AI用研</b><span>工具榜</span></span></span><Byline sm/></Link><ThemeSwitch compact/></div><Nav phone/></header>
<main className="main">{children}</main>
<footer className="site-footer"><span>© 2026 AI用研工具榜 · 真知浩见出品</span></footer>
</div></div><Baidu/></body></html>}
