import authOptions from '@/app/auth/authOption'
import { Button } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const IssueActionsToolbar = async () => {
    const session = await getServerSession(authOptions)

    if (!session?.user)
        return null

    return (
        <div className='mb-5'>
            <Button>
                <Link href='/issues/new'>New Issue</Link>
            </Button>
        </div>
    )
}

export default IssueActionsToolbar