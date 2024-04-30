import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'

const Pagination = () => {
  return (
    <Flex align='center' gap='4'>
        <Text size='2'>Page 2 of 10</Text>
        <Flex gap='2'>
            <Button variant='soft' disabled>
                <DoubleArrowLeftIcon />
            </Button>
            <Button variant='soft'>
                <ChevronLeftIcon />
            </Button>
            <Button variant='soft'>
                <ChevronRightIcon />
            </Button>
            <Button variant='soft'>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    </Flex>
  )
}

export default Pagination