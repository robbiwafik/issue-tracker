'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
    issueId: number
}

const DeleteIssueButton = ({ issueId }: Props) => {
    const router = useRouter()
    const [ error, setError ] = useState(false)

    const handleDelete = async () => {
        try {
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh()
        }
        catch (error) {
            setError(true)
        }
    }
    
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red'>
                        <TrashIcon />
                        Delete Issue
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure? This action can't be undone.</AlertDialog.Description>
                    <Flex mt='3' gap='3' justify='end'>
                        <AlertDialog.Cancel>
                            <Button variant='soft'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button onClick={handleDelete} color='red'>Delete issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
                    <Button 
                        mt='3' 
                        onClick={() => setError(false)}
                        variant='soft'
                    >
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton