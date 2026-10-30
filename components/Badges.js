// 只展示已确认的信息，“待核实”不上卡片
export default function Badges({t}){return <>
 {t.chinese_support==='yes'&&<span className="badge badge--accent"><span className="badge__dot"/>支持中文</span>}
 {t.chinese_support==='partial'&&<span className="badge badge--accent">部分支持中文</span>}
 {t.china_accessible==='no'&&<span className="badge badge--warn">需海外网络</span>}
 {t.free_tier==='yes'&&<span className="badge badge--good">有免费版</span>}
 {t.free_tier==='partial'&&<span className="badge badge--good">可免费试用</span>}
 {t.free_tier==='no'&&<span className="badge">付费</span>}</>}
