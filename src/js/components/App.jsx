import { useState, useEffect } from 'react'
import List from './List'
import SearchInput from './SearchInput'

import '../../styles/index.css'
import { fetchComments } from '../helpers/api.helper'

const App = () => {
  const [data, setData] = useState({
    pagedData: [],
    pageCount: 0,
    total: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initial data fetch
    ;(async () => {
      setLoading(true)

      const data = await fetchComments({
        query: '',
        paginated: true
      })
      setData(data)
      setLoading(false)
    })()
  }, [])

  const handleSearch = async (q) => {
    if (loading) {
      return
    }

    setLoading(true)

    const data = await fetchComments({
      query: q,
      paginated: true
    })
    setData(data)
    setLoading(false)
  }

  const clearSearch = async () => {
    setLoading(true)

    const data = await fetchComments({
      query: '',
      paginated: true
    })
    setData(data)
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-[100vh] w-full">
      <div className="w-full max-w-[1280px] flex flex-col justify-start items-center pt-24 h-100">
        <SearchInput onSearch={handleSearch} clearSearch={clearSearch} />
        <List data={data} loading={loading} />
      </div>
    </div>
  )
}

export default App
