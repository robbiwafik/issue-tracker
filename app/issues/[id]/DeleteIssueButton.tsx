import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const DeleteIssueButton = () => {
    return (
        <Button color='red'>
            <TrashIcon />
            Delete Issue
        </Button>
    )
}

export default DeleteIssueButton