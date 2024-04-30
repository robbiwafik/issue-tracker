import { IssueStatusBadge, Link, Pagination } from '@/app/components'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import { TriangleUpIcon } from '@radix-ui/react-icons'
import { Flex, Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import IssueActionsToolbar from './IssuesActionsToolbar'

interface Props {
  searchParams: { 
    status: Status, 
    orderBy: keyof Issue,
    page: string
  }
}

const IssuesPage = async ({ searchParams }: Props ) => {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string
  }[] = [
    {label: 'Title', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created At', value: 'createdAt', className: 'hidden md:table-cell'}
  ]
  const orderBy = columns
    .map(column => column.value)
    .includes(searchParams.orderBy) ? 
      { [searchParams.orderBy]: 'asc' } : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 7

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where: { status }})

  return (
    <div>
      <IssueActionsToolbar />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell className={column.className} key={column.value}>
                <NextLink href={{ query: { ...searchParams, orderBy: column.value } }}>
                    {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <TriangleUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                  </Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Flex mt='4' justify='end'>
        <Pagination 
          currentPage={page}
          pageSize={pageSize}
          itemCount={issueCount}
        />
      </Flex>
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage