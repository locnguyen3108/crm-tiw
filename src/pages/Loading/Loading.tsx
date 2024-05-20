import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from '~/constants/path'
import { AppConxtext } from '~/contexts/app.context'
import useFirstDayOfMonth from '~/hooks/useFirstDayOfMonth'
import useLastDayOfMonth from '~/hooks/useLastDayOfMonth'
import useQueryParams from '~/hooks/useQueryParams'
import http from '~/utils/http'

export default function Loading() {
  const { setIsAuthenticated, setProfile } = useContext(AppConxtext)
  const queryParams = useQueryParams()
  const navigate = useNavigate()
  const startDate = useFirstDayOfMonth()
  const endDate = useLastDayOfMonth()
  const postCallback = async (params: URLSearchParams) => {
    const response = await http.post('/e/v1/callback', null, {
      params
    })
    return response.data
  }
  const usePostCallback = (onSuccess: (data: any) => void, onError: (error: any) => void) => {
    return useMutation(postCallback, {
      onSuccess,
      onError
    })
  }
  const onSuccess = (data: any) => {
    console.log(data)
    setIsAuthenticated(true)
    setProfile(data.data.data.user)
    toast.success('Create new user successful')
    navigate({
      pathname: path.home,
      search: createSearchParams({
        fromDate: startDate,
        toDate: endDate
      }).toString()
    })
  }
  const onError = (error: any) => {
    console.error('Error:', error)
    // Handle error (e.g., show an error message)
    console.log("Load error")
  }
  const mutation = usePostCallback(onSuccess, onError)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')

    if (code) {
      mutation.mutate(queryParams)
    }
  }, [])
  console.log(queryParams)

  return <div>Loading...</div>
}
