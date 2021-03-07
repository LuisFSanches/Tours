import axios from 'axios'
export const api = axios.create({
  baseURL: 'https://course-api.com/react-tours-project'
})