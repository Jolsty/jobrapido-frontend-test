import classNames from 'classnames'
import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useOutsideAlerter } from '../helpers/hooks.helper'

const OptionsDropdown = ({ options, handleSelectOption, setOptions }) => {
  const optionsContainerRef = useRef(null)

  useOutsideAlerter(optionsContainerRef, () => setOptions([]))

  const hasOptions = !isEmpty(options)
  return (
    <div
      className={classNames('relative w-full opacity-0 transition-opacity', {
        'opacity-100': hasOptions
      })}
    >
      {hasOptions && (
        <ul
          className="absolute z-[2] top-2 bg-white drop-shadow rounded-lg h-[280px] overflow-y-auto w-full overflow-x-hidden"
          ref={optionsContainerRef}
          tabIndex={-1}
        >
          {options.map((option) => (
            <li
              tabIndex={0}
              key={option?.id}
              className="cursor-pointer border-b border-gray-300 transition-colors outline-none focus:bg-gray-200 hover:bg-gray-200 px-4 py-3 text-sm"
              onKeyDown={(e) => {
                if (e?.key === 'Enter') {
                  handleSelectOption(option)
                }
              }}
              onClick={() => handleSelectOption(option)}
            >
              <span
                title={option?.email}
                className="lowercase font-bold text-sm sm:text-base ellipsis inline-block max-w-[calc(100%-1rem)] "
              >
                {option?.email}:
              </span>
              <span className="block font-semibold pt-3">{option?.name}</span>
              <span className="block pt-1 ellipsis max-w-[64ch]">{option?.body}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

OptionsDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.number,
      body: PropTypes.string
    })
  ),
  handleSelectOption: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired
}

OptionsDropdown.defaultProps = {
  options: []
}

export default OptionsDropdown
