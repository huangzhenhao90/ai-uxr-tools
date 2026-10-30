'use client';
import {useEffect,useState} from 'react';
import Icon from './Icon';
const OPTS=[['dark','深色','moon'],['system','跟随系统','monitor'],['light','浅色','sun']];
export default function ThemeSwitch({compact}){
 const [t,setT]=useState('system');
 useEffect(()=>{setT(document.documentElement.dataset.theme||'system')},[]);
 function pick(v){setT(v);const r=document.documentElement;if(v==='system')delete r.dataset.theme;else r.dataset.theme=v;try{v==='system'?localStorage.removeItem('theme'):localStorage.setItem('theme',v)}catch(e){}}
 const i=OPTS.findIndex(o=>o[0]===t);
 return <div role="radiogroup" aria-label="外观" className={'theme-switch'+(compact?' theme-switch--compact':'')}>
  <span aria-hidden="true" className="theme-switch__thumb" style={{transform:`translateX(${i*100}%)`}}/>
  {OPTS.map(([v,l,n])=><button key={v} type="button" role="radio" aria-checked={t===v} title={l} className="theme-switch__option" onClick={()=>pick(v)}><Icon n={n} s={14}/><span className="sr-only">{l}</span></button>)}
 </div>}
