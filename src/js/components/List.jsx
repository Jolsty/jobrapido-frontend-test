import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import CustomPagination from './CustomPagination'
import ListItem from './ListItem'

const List = ({ data, loading }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { pagedData, total, pageCount } = data

  if (!loading && total === 0) {
    return null
  }

  const currentPageData = pagedData[currentPage - 1] // array indexing starts from 0 while pagination starts from 1

  return (
    <div className="w-[100vw] flex flex-col items-center justify-start mt-8 pt-8 border-t-2 border-gray-300">
      {loading ? (
        <CgSpinner className="animate-spin" size={32} />
      ) : (
        !isEmpty(currentPageData) && (
          <div className="w-full max-w-[650px] flex flex-col items-start justify-start px-8">
            <CustomPagination
              className="mb-4"
              page={currentPage}
              setPage={setCurrentPage}
              pageCount={pageCount}
            />
            <ul className="w-full">
              {currentPageData.map((cmt) => (
                <ListItem key={cmt.id} {...cmt} />
              ))}
            </ul>
            <CustomPagination
              className="mt-4"
              page={currentPage}
              setPage={setCurrentPage}
              pageCount={pageCount}
            />
          </div>
        )
      )}
    </div>
  )
}

List.propTypes = {
  data: PropTypes.shape({
    pagedData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
    pageCount: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  loading: PropTypes.bool
}

List.defaultProps = {
  loading: false
}

export default List
