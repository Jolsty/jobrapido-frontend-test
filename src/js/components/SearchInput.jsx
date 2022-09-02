import { useState, useRef, useEffect } from 'react'
import { GoSearch } from 'react-icons/go'
import { ImSpinner2 } from 'react-icons/im'
import { fetchComments } from '../helpers/api.helper'
import debounce from 'lodash.debounce'
import isEmpty from 'lodash.isempty'
import classNames from 'classnames'

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const debouncedSearchRef = useRef(
    debounce(async (value) => {
      setLoading(true)
      const data = await fetchComments(value)
      setLoading(false)
      setOptions(data)
    }, 300)
  )

  const handleChange = async ({ target: { value } }) => {
    setInputValue(value)

    if (value.length < 3) {
      setOptions([])
      return
    }

    debouncedSearchRef.current(value)
  }

  const handleSelectOption = (option) => {
    setInputValue(option?.name)
    setOptions([option])
    inputRef.current.focus()
  }

  const handleSearch = async () => {
    const result = await fetchComments(inputValue)
  }

  const hasOptions = !isEmpty(options)

  return (
    <div className="flex flex-col w-full items-center max-w-[650px]">
      <div className="group relative w-full  flex flex-row justify-center items-center hover:">
        <label htmlFor="search" className="absolute z-[1] left-0 pl-4">
          <span className="sr-only">Search</span>
          <GoSearch className="cursor-text" />
        </label>
        <input
          ref={inputRef}
          type="search"
          id="search"
          placeholder="Search comments..."
          className="outline-offset-0 outline-indigo-500 p-4 pl-12 w-full rounded-lg drop-shadow group-hover:drop-shadow-xl font-semibold text-sm cursor-text"
          value={inputValue}
          onChange={handleChange}
        />
        <div className="flex flex-row justify-end items-center right-4 z-[1] absolute">
          {loading && (
            <div className="mr-4">
              <ImSpinner2 className="animate-spin" />
            </div>
          )}
          <button
            disabled={inputValue.length < 3}
            onClick={handleSearch}
            className="disabled:opacity-30 disabled:cursor-not-allowed bg-indigo-500/75 [&:not(:disabled)]:hover:bg-indigo-500/100 transition-opacity transition-colors py-1.5 px-3 font-medium drop-shadow text-sm rounded-lg text-white "
          >
            Search
          </button>
        </div>
      </div>
      <div
        className={classNames('relative w-full opacity-0 transition-opacity', {
          'opacity-100': hasOptions
        })}
      >
        {hasOptions && (
          <ul className="absolute z-[2] top-2 bg-white drop-shadow rounded-lg h-[250px] overflow-y-auto w-full">
            {options.map((option) => (
              <li
                key={option?.id}
                className="cursor-pointer transition-colors hover:bg-gray-200 px-4 py-3 text-sm"
                onClick={() => handleSelectOption(option)}
              >
                <span className="font-bold">{option?.name}</span>{' '}
                <span className="lowercase font-bold">({option?.email})</span>
                <span> said:</span>
                <span className="block pt-1 whitespace-nowrap overflow-x-clip text-ellipsis max-w-[64ch]">
                  {option?.body}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

SearchInput.propTypes = {}

export default SearchInput
