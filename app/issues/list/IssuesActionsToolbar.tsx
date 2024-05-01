import authOptions from '@/app/auth/authOption'
import { Button, Flex } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActionsToolbar = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user)
        return null

    return (
        <Flex justify='between'>
            <IssueStatusFilter />
            <Button>
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </Flex>
    )
}

export default IssueActionsToolbar