import { Select } from '@radix-ui/themes'

const AssigneeSelect = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value='1'>Robbi Wafik</Select.Item>
                    <Select.Item value='2'>Michelle Lie</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect