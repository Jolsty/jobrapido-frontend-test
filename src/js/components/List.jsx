import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'

const List = ({ data }) => {
  if (isEmpty(data)) {
    return null
  }

  return <div>List</div>
}

List.propTypes = {}

export default List
