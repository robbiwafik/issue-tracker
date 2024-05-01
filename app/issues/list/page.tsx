import { Pagination } from '@/app/components'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'
import IssueActionsToolbar from './IssuesActionsToolbar'
import IssueTable, { columnValues, SearchParams } from './IssueTable'

interface Props {
  searchParams: SearchParams
}

const IssuesPage = async ({ searchParams }: Props ) => {
  // Filtering
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // Sorting
  const orderBy = columnValues.includes(searchParams.orderBy) ? 
      { [searchParams.orderBy]: 'asc' } : undefined

  // Pagination
  const currentPage = parseInt(searchParams.page) || 1
  const pageSize = 7

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize
  })
  const issueCount = await prisma.issue.count({ where: { status }})

  return (
    <Flex direction='column' gap='4'>
      <IssueActionsToolbar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify='end'>
        <Pagination 
            currentPage={currentPage}
            pageSize={pageSize}
            itemCount={issueCount}
        />
      </Flex>
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View list of issues'
}

export default IssuesPage