import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import { Flex, Grid } from '@radix-ui/themes'
import LatestIssues from './LatestIssues'
import prisma from '@/prisma/client'

export default async function Home() {
  const openIssueCount = await prisma.issue.count({ where: {status: 'OPEN'}})
  const inProgressIssueCount = await prisma.issue.count({ where: {status: 'IN_PROGRESS'}})
  const closedIssueCount = await prisma.issue.count({ where: {status: 'CLOSED'}})

  return (
    <Grid columns='2' gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary 
          open={openIssueCount} 
          inProgress={inProgressIssueCount} 
          closed={closedIssueCount} 
        />
        <IssueChart 
          open={openIssueCount} 
          inProgress={inProgressIssueCount} 
          closed={closedIssueCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
