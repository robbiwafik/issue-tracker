import { Skeleton } from '@/app/components'
import { Box, Card } from '@radix-ui/themes'

const LoadingIssueDetailPage = () => {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <div className='space-x-3 my-4'>
                <Skeleton width='5rem' inline />
                <Skeleton width='8rem' inline />
            </div>
            <Card className='prose' my='6'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssueDetailPage