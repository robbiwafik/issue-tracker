import { Box, Button } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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