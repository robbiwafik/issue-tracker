'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const IssueStatusFilter = () => {
    const router = useRouter()
    const items: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' }
    ]

    const handleValueChange = (value: string) => {
        const query = value === 'all' ? '' : `?status=${value}`
        router.push('/issues/list' + query)
    }

    return (
        <Select.Root onValueChange={handleValueChange}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {items.map(item => (
                    <Select.Item key={item.value} value={item.value || 'all'}>{item.label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter