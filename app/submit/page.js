import Link from 'next/link';
import Form from '../../components/Form';
export const metadata={title:'提交工具 · AI用研工具榜'};
export default function P(){return <><h1 style={{marginTop:24}}>提交工具</h1><p>推荐一个 AI 用研工具，或纠正已有信息。厂商希望快速上榜，请见 <Link href="/sponsor/">合作/赞助</Link>。</p><Form/></>}
