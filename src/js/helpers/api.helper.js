import axios from 'axios'
import { PER_PAGE } from './constants.helper'

export const fetchComments = async ({ query = '', page, limit, paginated = false }) => {
  const url = `https://jsonplaceholder.typicode.com/comments?q=${query}`
  let result

  if (page && limit) {
    url.concat(`&_page=${page}&_limit=${limit}`)
  }

  try {
    const { data } = await axios.get(url)
    if (paginated) {
      /**
       * Note: the back-end doesn't return metadata for pagination
       * (we can't know how many pages there are and when it ends)
       * so we are forced to load all elements at once and perform the pagination client-side
       */

      const pagedData = data.reduce((acc, item, i) => {
        const pageIndex = Math.floor(i / PER_PAGE)
        const page = acc[pageIndex]

        if (!page) {
          acc[pageIndex] = []
        }

        acc[pageIndex].push(item)

        return acc
      }, [])
      result = {
        pagedData,
        total: data.length,
        pageCount: pagedData.length
      }
    } else {
      result = data
    }
  } catch (e) {
    console.error(e)
  }

  return result || []
}
