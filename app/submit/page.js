import Link from 'next/link';
import Form from '../../components/Form';
export const metadata={title:'提交 / 纠错 · AI用研工具榜'};
export default function P(){return <div className="reading"><header className="page-head"><h1>提交 / 纠错</h1><p className="page-head__desc">推荐一个 AI 用研工具，或者帮我们补全“待核实”的信息。厂商希望快速上榜，请见 <Link className="text-link" href="/sponsor/">合作</Link>。</p></header><Form/></div>}
