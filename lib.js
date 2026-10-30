import tools from './data/tools.json';
export { tools };
export const CATS=["访谈转写/分析","AI 主持访谈","合成用户","问卷 AI","研究知识库/仓库","可用性测试 AI"];
export const CAT_SLUG={"访谈转写/分析":"transcribe","AI 主持访谈":"ai-interview","合成用户":"synthetic","问卷 AI":"survey","研究知识库/仓库":"repository","可用性测试 AI":"usability"};
export const REGIONS={cn:'国内产品',intl:'国际产品'};
export const catCount=(c,r)=>tools.filter(t=>t.category===c&&(!r||t.region===r)).length;
export const regionCount=r=>tools.filter(t=>t.region===r).length;
export const YN={yes:"是",partial:"部分",no:"否",unknown:"待核实"};
export const ZH={yes:"支持",partial:"部分支持",no:"不支持",unknown:"待核实"};
// 已确认字段越多越靠前，用于默认排序
export const known=t=>['chinese_support','china_accessible','free_tier'].filter(k=>t[k]!=='unknown').length+(/待核实|未读取|未公开|未核实/.test(t.pricing)?0:1);
export const BASE=process.env.NEXT_PUBLIC_BASE||'';
export const UXHOT='https://huangzhenhao90.github.io/ai-ux-research-hot/';
export const REPO='https://github.com/huangzhenhao90/ai-uxr-tools';
