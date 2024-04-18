import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound()

    return (
        <div className='space-y-3'>
            <Heading>{issue.title}</Heading>
            <div className='space-x-3'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </div>
            <Card>
                <p>{issue.description}</p>
            </Card>
        </div>
    )
}

export default IssueDetailPage