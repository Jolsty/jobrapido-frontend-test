import isEmpty from 'lodash.isempty'
import { useState } from 'react'
import '../../styles/index.css'
import List from './List'
import SearchInput from './SearchInput'

const App = () => {
  const [results, setResults] = useState({ fetched: false, loading: false, data: [] })

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] w-full px-4">
      <SearchInput />
      <List data={results.data} />
    </div>
  )
}

export default App
