import { Table } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActionsToolbar from './IssuesActionsToolbar'

const LoadingIssuesPage = () => {
    const rows = [1, 2, 3, 4, 5]

    return (
        <div>
            <IssueActionsToolbar />
            <Table.Root variant='surface'>
                <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {rows.map(row => (
                    <Table.Row key={row}>
                        <Table.Cell>
                            <Skeleton />
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>
                            <Skeleton />
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>
                            <Skeleton />
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default LoadingIssuesPage