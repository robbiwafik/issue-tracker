import { Skeleton } from '@/app/components'
import { Box, Button } from '@radix-ui/themes'

const LoadingNewIssuePage = () => {
    return (
        <Box className='max-w-xl'>
            <div className='space-y-3'>
                <Skeleton height={'2rem'} />
                <Skeleton height={'20rem'} />
                <Button disabled>Submit New Issue</Button>
            </div>
        </Box>
    )
}

export default LoadingNewIssuePage