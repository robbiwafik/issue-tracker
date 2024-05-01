import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const items: {
        label: string,
        value: number,
        status: Status
    }[] = [
        { label: 'Open Issues', value: open, status: 'OPEN' },
        { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
        { label: 'Closed Issues', value: closed, status: 'CLOSED' }
    ]

    return (
        <Flex gap='4'>
            {items.map(item => (
                <Card key={item.value}>
                    <Flex direction='column' gap='4'>
                        <Link 
                            href={`/issues/list?status=${item.status}`} 
                            className='text-sm font-medium'
                        >
                            {item.label}
                        </Link>
                        <Text size='5'>{item.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary