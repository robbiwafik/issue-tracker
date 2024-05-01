import IssueSummary from './IssueSummary'

export default function Home() {
  return (
    <IssueSummary open={30} inProgress={20} closed={25} />
  )
}
