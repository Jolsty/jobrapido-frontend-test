import axios from 'axios'

export const fetchComments = async (query) => {
  const { data } = await axios(
    `https://jsonplaceholder.typicode.com/comments?q=${query}&_page=1&_limit=20`
  )
  return data || []
}
