'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    currentPage: number
    pageSize: number
    itemCount: number
}

const Pagination = ({ currentPage, pageSize, itemCount }: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())

        router.push('?' + params.toString())        
    }

    const pageCount = Math.ceil(itemCount / pageSize)

    if (pageCount === 1) return null

    return (
        <Flex align='center' gap='4'>
            <Text size='2'>{`Page ${currentPage} of ${pageCount}`}</Text>
            <Flex gap='2'>
                <Button 
                    disabled={currentPage === 1}
                    onClick={() => changePage(1)}
                    variant='soft' 
                >
                    <DoubleArrowLeftIcon />
                </Button>
                <Button 
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                    variant='soft' 
                >
                    <ChevronLeftIcon />
                </Button>
                <Button 
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(currentPage + 1)}
                    variant='soft' 
                >
                    <ChevronRightIcon />
                </Button>
                <Button 
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(pageSize)}
                    variant='soft' 
                >
                    <DoubleArrowRightIcon />
                </Button>
            </Flex>
        </Flex>
    )
}

export default Pagination