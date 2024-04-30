import { Pagination } from './components'

interface Props {
  searchParams: { page: string }
}

export default function Home({ searchParams }: Props) {
  return (
    <div>
      <Pagination
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
        pageSize={10}
        itemCount={25}
      />
    </div>
  )
}
