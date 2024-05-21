/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from '~/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, getProfileFromLS, setAccessTokentoLS, setProfileToLS } from './auth'
import { User } from '~/types/user.type'
class Http {
  instance: AxiosInstance
  private accessToken: string
  private profile: User
  constructor(contenttype: string = 'application/json') {
    this.accessToken = getAccessTokenFromLS()
    this.profile = getProfileFromLS()
    this.instance = axios.create({
      baseURL: 'http://34.93.61.167/',
      timeout: 10000000,
      headers: {
        'Content-Type': contenttype
      }
    })
    // http://fall2324w20g6.int3306.freeddns.org/
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/e/v1/login' || url === '/e/v1/register') {
          this.accessToken = response.data.data.token
          this.profile = response.data.data.user
          setAccessTokentoLS('Bearer ' + this.accessToken)
          setProfileToLS(this.profile)
        } else if (url === '/logout') {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data
          toast.error(message)
        }
        // if (error.response?.status !== HttpStatusCode.Unauthorized) {
        //   clearLS()
        // }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
export { Http }
