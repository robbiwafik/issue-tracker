import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'

export default function Home() {
  return (
    <IssueChart open={30} inProgress={20} closed={25} />
  )
}
