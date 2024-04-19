import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Card, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

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
        <Grid 
            columns={{ initial: '1', md: '2' }} 
            gap={{ initial: '2', md: '5'}}
        >
            <Box>
                <Heading>{issue.title}</Heading>
                <div className='space-x-3 my-4'>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </div>
                <Card className='prose' my='6'>
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    Edit Issue
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage