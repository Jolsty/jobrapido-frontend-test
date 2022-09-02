import classNames from 'classnames'
import PropTypes from 'prop-types'

const ListItem = ({ email, name, body }) => {
  return (
    <li
      className={classNames('list-item bg-white drop-shadow rounded-lg w-full py-4 px-4 sm:px-8')}
    >
      <div className="flex flex-col items-start justify-start">
        <span className="font-bold">{name}</span>
        <span className="pt-2">{body}</span>
        <div className="flex flex-col items-end justify-start text-xs pt-4 w-full">
          <span>written by:</span>
          <span
            title={email}
            className="inline-block max-w-[calc(100%-1rem)] font-bold lowercase ellipsis"
          >
            {email}
          </span>
        </div>
      </div>
    </li>
  )
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default ListItem
