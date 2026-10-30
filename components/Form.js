'use client';
import {useState,useEffect} from 'react';
import {tools,CATS,REPO} from '../lib';
const F=({id,label,hint,children})=><div className="field"><label className="field__label" htmlFor={id}>{label}{hint&&<span className="field__hint">（{hint}）</span>}</label>{children}</div>;
export default function Form(){
 const [kind,setKind]=useState('new');const [tool,setTool]=useState('');const [copied,setCopied]=useState(false);
 useEffect(()=>{const id=new URLSearchParams(location.search).get('tool');if(tools.some(t=>t.id===id)){setKind('fix');setTool(id)}},[]);
 function body(form){const f=new FormData(form);const t=tools.find(x=>x.id===tool);
  const rows=kind==='fix'?[['工具',t?`${t.name}（${t.id}）`:''],['需要更正的内容',f.get('fix')],['依据/来源',f.get('src')],['身份',f.get('who')],['联系方式',f.get('contact')]]
   :[['工具名称',f.get('name')],['官网',f.get('url')],['分类',f.get('cat')],['介绍',f.get('desc')],['身份',f.get('who')],['联系方式',f.get('contact')]];
  return {title:kind==='fix'?`纠错：${t?.name||''}`:`推荐工具：${f.get('name')}`,text:rows.filter(r=>r[1]).map(([k,v])=>`${k}：${v}`).join('\n')}}
 function github(e){e.preventDefault();const {title,text}=body(e.target);window.open(`${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`,'_blank','noopener')}
 async function copy(e){const form=e.target.form;if(!form.reportValidity())return;const {title,text}=body(form);try{await navigator.clipboard.writeText(`【AI用研工具榜 · ${title}】\n${text}`);setCopied(true);setTimeout(()=>setCopied(false),2500)}catch(err){}}
 return <div className="box">
 <div className="pill-tabs" role="group" aria-label="提交类型">{[['new','推荐新工具'],['fix','纠错 / 补充信息']].map(([k,l])=><button key={k} type="button" className="pill-tabs__tab" aria-pressed={kind===k} onClick={()=>setKind(k)}>{l}</button>)}</div>
 <form onSubmit={github}>
 {kind==='new'?<>
  <F id="f-name" label="工具名称"><input className="input" id="f-name" name="name" required/></F>
  <F id="f-url" label="官网链接"><input className="input" id="f-url" name="url" type="url" required placeholder="https://"/></F>
  <F id="f-cat" label="分类"><select className="input" id="f-cat" name="cat">{[...CATS,'其他'].map(c=><option key={c}>{c}</option>)}</select></F>
  <F id="f-desc" label="一句话介绍" hint="它能帮用研做什么"><textarea className="input" id="f-desc" name="desc" rows="3"/></F>
 </>:<>
  <F id="f-tool" label="哪个工具"><select className="input" id="f-tool" value={tool} onChange={e=>setTool(e.target.value)} required><option value="">请选择</option>{tools.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></F>
  <F id="f-fix" label="需要更正或补充的内容" hint="例如：已支持中文界面、国内可直接访问、价格变了"><textarea className="input" id="f-fix" name="fix" rows="3" required/></F>
  <F id="f-src" label="依据或来源链接" hint="选填"><input className="input" id="f-src" name="src"/></F>
 </>}
 <F id="f-who" label="你的身份"><select className="input" id="f-who" name="who"><option>用户 / 推荐者</option><option>厂商</option></select></F>
 <F id="f-contact" label="联系方式" hint="选填，会公开显示在 GitHub"><input className="input" id="f-contact" name="contact"/></F>
 <div className="form-actions"><button className="pill-button pill-button--primary">在 GitHub 提交</button><button type="button" className="pill-button" onClick={copy}>{copied?'已复制 ✓':'复制内容，发公众号后台'}</button></div>
 <p className="muted" style={{marginTop:10}}>“在 GitHub 提交”会打开预填好的 Issue 页面（需要 GitHub 账号）。没有账号的话，复制内容发到公众号「真知浩见」后台即可。</p>
 </form></div>}
