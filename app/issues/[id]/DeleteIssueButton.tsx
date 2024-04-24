import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteIssueButton = () => {
    return (
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
                        <Button color='red'>Delete issue</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton