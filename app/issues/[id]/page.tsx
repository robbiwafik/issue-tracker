import authOptions from '@/app/auth/authOption'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import AssigneeSelect from './AssigneeSelect'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => (
    prisma.issue.findUnique({
        where: { id: issueId }
    })
))

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

    const issue = await fetchUser(parseInt(params.id))

    if (!issue)
        notFound()

    return (
        <Grid 
            columns={{ initial: '1', sm: '5' }} 
            gap={{ initial: '2', md: '5'}}
        >
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session?.user && 
            <Flex direction='column' gap='2'>
                <AssigneeSelect issue={issue} />
                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
            </Flex>
            }
        </Grid>
    )
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))

    return ({
        title: issue?.title,
        description: 'Details of an issue ' + issue?.id
    })
}

export default IssueDetailPage