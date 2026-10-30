'use client';
import {useState,useMemo} from 'react';
import Link from 'next/link';import {tools,CATS,ZH} from '../lib';
export default function Home(){
 const [q,setQ]=useState('');const [cat,setCat]=useState('');const [zh,setZh]=useState('');const [cn,setCn]=useState('');const [free,setFree]=useState(false);
 const list=useMemo(()=>tools.filter(t=>(!cat||t.category===cat)&&(!zh||t.chinese_support===zh)&&(!cn||t.china_accessible===cn)&&(!free||t.free_tier==='yes')&&(!q||(t.name+t.description+t.summary+t.category).toLowerCase().includes(q.toLowerCase()))),[q,cat,zh,cn,free]);
 return <>
 <div className="chips">{['',...CATS].map(c=><button key={c} className={'chip'+(cat===c?' on':'')} onClick={()=>setCat(c)}>{c||'全部'}</button>)}</div>
 <div className="bar"><input placeholder="搜索工具名或用途，如：转写、访谈、问卷" value={q} onChange={e=>setQ(e.target.value)}/>
 <select value={zh} onChange={e=>setZh(e.target.value)}><option value="">中文支持：不限</option><option value="yes">支持中文</option><option value="partial">部分支持</option></select>
 <select value={cn} onChange={e=>setCn(e.target.value)}><option value="">国内可用：不限</option><option value="yes">国内可用</option><option value="no">国内不可直接用</option></select>
 <label className="chip" style={{display:'flex',alignItems:'center',gap:4}}><input type="checkbox" checked={free} onChange={e=>setFree(e.target.checked)}/>有免费版</label></div>
 <p className="muted">共 {list.length} 个工具</p>
 <div className="grid">{list.map(t=><Link key={t.id} className="card" href={`/tools/${t.id}/`}><h3>{t.name}</h3><p className="sub">{t.summary}</p><span className="tag b">{t.category}</span>
 <span className="tag">中文：{ZH[t.chinese_support]}</span>{t.china_accessible==='yes'&&<span className="tag g">国内可用</span>}{t.free_tier==='yes'&&<span className="tag g">有免费版</span>}</Link>)}</div></>}
