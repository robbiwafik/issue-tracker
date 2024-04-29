'use client'

import { Issue, User } from '@prisma/client'
import { Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
    issue: Issue
}

const AssigneeSelect = ({ issue }: Props) => {
    const { data: users, error, isLoading } = useUsers()
    const router = useRouter()

    if (isLoading)
        return <Skeleton height='32px' />

    if (error)
        return null

    const unassignedSelectValue = 'unassigned'
    const handleValueChange = (userId: string) => {
        axios.patch(
            `/api/issues/${issue.id}`, 
            {assignedToUserId: userId === unassignedSelectValue ? null : userId}
        )
        .catch(() => toast.error('Changes could not be saved'))

        router.refresh()
    }
 
    return (
        <>
            <Select.Root 
                defaultValue={issue.assignedToUserId || unassignedSelectValue}
                onValueChange={handleValueChange}
            >
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={unassignedSelectValue}>Unassigned</Select.Item>
                        {users?.map(user => (
                            <Select.Item 
                                key={user.id}
                                value={user.id}
                            >
                                {user.email}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3
})

export default AssigneeSelect