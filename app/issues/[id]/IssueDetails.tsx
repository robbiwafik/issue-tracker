import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

interface Props {
    issue: Issue
}

const IssueDetails = ({ issue }: Props) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <div className='space-x-3 my-4'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </div>
            <Card className='prose max-w-full' my='6'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )    
}

export default IssueDetails