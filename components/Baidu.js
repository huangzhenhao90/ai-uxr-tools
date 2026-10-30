'use client';
import {useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
export default function Baidu(){
  const path=usePathname();
  const first=useRef(true);
  useEffect(()=>{
    if(first.current){first.current=false;return;}
    const p=location.pathname+location.search;
    window._hmt=window._hmt||[];
    window._hmt.push(['_trackPageview',p]);
  },[path]);
  return null;
}
