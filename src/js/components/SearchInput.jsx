import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { GoSearch } from 'react-icons/go'
import { fetchComments } from '../helpers/api.helper'
import OptionsDropdown from './OptionsDropdown'

// There are other, better, solutions such as Twitter's typeahead but this is custom-made.

const debouncedWait = 150

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])

  const inputRef = useRef(null)

  /**
   * Note: I allow pressing "Search" without an inputValue,
   * that way people can go back to the original, unfiltered listing
   */

  const searchDisabled = inputValue.length > 0 && inputValue.length < 3

  const debouncedSearchRef = useRef(
    debounce(async (value) => {
      setLoading(true)
      const data = await fetchComments({ query: value, page: 1, limit: 20 })
      setOptions(data)
      setLoading(false)
    }, debouncedWait)
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => debouncedSearchRef.current.cancel() // clean up the debounced function once this component is unmounted (it will never happen in this app, but still...)
  }, [debouncedSearchRef])

  const handleChange = async ({ target: { value } }) => {
    setInputValue(value)

    if (value.length < 3) {
      setOptions([])
      return
    }

    debouncedSearchRef.current(value)
  }

  const handleSelectOption = (option) => {
    setInputValue(option?.email)
    setOptions([])
    inputRef.current.focus()
  }

  const handleSearch = async () => {
    if (searchDisabled) {
      return
    }

    setOptions([])

    if (onSearch && typeof onSearch === 'function') {
      onSearch(inputValue)
    }
  }

  return (
    <div className="flex flex-col w-full items-center max-w-[650px] px-8">
      <div className="group relative w-full flex flex-row justify-center items-center">
        <label htmlFor="search" className="absolute z-[1] left-0 pl-4">
          <span className="sr-only">Search</span>
          <GoSearch className="cursor-text" />
        </label>
        <input
          ref={inputRef}
          type="search"
          id="search"
          autoFocus
          placeholder="Search..."
          className="outline-offset-0 outline-indigo-500 p-4 pl-12 w-full rounded-lg drop-shadow group-hover:drop-shadow-xl font-semibold text-sm cursor-text pr-[calc(100%-calc(100%-128px))]"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e?.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <div className="flex flex-row justify-end items-center right-4 z-[1] absolute">
          {loading && (
            <div className="mr-4">
              <CgSpinner className="animate-spin" />
            </div>
          )}
          <button
            disabled={searchDisabled}
            onClick={handleSearch}
            className="disabled:opacity-30 disabled:cursor-not-allowed bg-indigo-500/75 [&:not(:disabled)]:hover:bg-indigo-500/100 transition-opacity transition-colors py-1.5 px-3 font-medium drop-shadow text-sm rounded-lg text-white "
          >
            Search
          </button>
        </div>
      </div>
      <OptionsDropdown
        options={options}
        setOptions={setOptions}
        handleSelectOption={handleSelectOption}
      />
    </div>
  )
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchInput
