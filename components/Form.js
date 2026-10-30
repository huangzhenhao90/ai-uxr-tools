'use client';
import {useState} from 'react';
export default function Form(){const [txt,setTxt]=useState('');
 function go(e){e.preventDefault();const f=new FormData(e.target);setTxt(['【AI用研工具榜 · 提交工具】',...[...f.entries()].map(([k,v])=>`${k}：${v}`)].join('\n'))}
 return <div className="box"><p style={{background:'var(--amber-soft)',color:'var(--amber-ink)',padding:10,borderRadius:8,fontSize:14}}>⚠️ 提交通道建设中：本表单暂不会自动发送。点击“生成”后复制内容，发到公众号「真知浩见」后台即可。</p>
 <form onSubmit={go}><label>工具名称*</label><input name="工具名称" required/><label>官网链接*</label><input name="官网" type="url" required/>
 <label>分类</label><select name="分类">{["访谈转写/分析","AI 主持访谈","合成用户","问卷 AI","研究知识库/仓库","可用性测试 AI","通用大模型/Agent","其他"].map(c=><option key={c}>{c}</option>)}</select>
 <label>一句话介绍</label><textarea name="介绍" rows="3"/><label>你的身份</label><select name="身份"><option>用户/推荐者</option><option>厂商</option></select><label>联系方式（选填）</label><input name="联系方式"/>
 <button className="btn">生成提交内容</button></form>
 {txt&&<><textarea readOnly rows="8" value={txt} style={{marginTop:12,width:'100%'}}/><button className="btn" onClick={()=>navigator.clipboard?.writeText(txt)}>复制</button></>}</div>}
