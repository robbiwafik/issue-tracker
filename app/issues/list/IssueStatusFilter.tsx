'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const items: { label: string, value?: Status }[] = [
        { label: 'All'},
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Closed', value: 'CLOSED' }
    ]

    const handleValueChange = (status: string) => {
        const params = new URLSearchParams()
        if (status !== 'all')
            params.append('status', status)

        const orderBy = searchParams.get('orderBy')
        if (orderBy)
            params.append('orderBy', orderBy)
        
        const query = params.size ? '?' + params.toString() : ''
        router.push('/issues/list' + query)
    }

    return (
        <Select.Root 
            defaultValue={searchParams.get('status') || undefined}
            onValueChange={handleValueChange}
        >
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {items.map(item => (
                    <Select.Item 
                        key={item.value || ''} 
                        value={item.value || 'all'}>
                        {item.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter