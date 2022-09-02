import Pagination from '@mui/material/Pagination'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const CustomPagination = ({ className, pageCount, setPage, page }) => {
  return (
    <div className={classNames('w-full flex flex-col items-center justify-start', className)}>
      <Pagination
        variant="string"
        color="primary"
        size="small"
        count={pageCount}
        page={page}
        shape="circular"
        onChange={(_, value) => {
          /**
           * Note: this UX can be debated,
           * but I don't see any point to staying on the bottom of the page when there's data from a new page
           */
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setPage(value)
        }}
      />
    </div>
  )
}

CustomPagination.propTypes = {
  className: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
}

CustomPagination.defaultProps = {
  className: ''
}

export default CustomPagination
