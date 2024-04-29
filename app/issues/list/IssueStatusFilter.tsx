import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'

const IssueStatusFilter = () => {
    const items: { label: string, value?: Status }[] = [
        { label: 'All' },
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' }
    ]

    return (
        <Select.Root>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {items.map(item => (
                    <Select.Item value={item.value || 'all'}>{item.label}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter