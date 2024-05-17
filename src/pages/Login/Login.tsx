import { useQuery } from '@tanstack/react-query'
// import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { login } from '~/apis/auth.api'
import { AppConxtext } from '~/contexts/app.context'
// import { ErrorResponse } from '~/types/utils.type'
// import { getRules } from '~/utils/rules'
// import { isAxiosUnprocessableEntity } from '~/utils/utils'
import { useContext } from 'react'
// import Button from '~/components/Button'
import useFirstDayOfMonth from '~/hooks/useFirstDayOfMonth'
import useLastDayOfMonth from '~/hooks/useLastDayOfMonth'
import path from '~/constants/path'
import { Button } from 'antd'
// interface FormData {
//   email: string
//   password: string
// }
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppConxtext)
  const navigate = useNavigate()
  const startDate = useFirstDayOfMonth()
  const endDate = useLastDayOfMonth()
  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   setError,
  //   formState: { errors }
  // } = useForm<FormData>()
  // const rules = getRules(getValues)
  // const loginMutation = useMutation({
  //   mutationFn: () => login()
  // })
  // const loginMutation = useMutation(() => login());

  const { data } = useQuery({
    queryKey: ['salary'],
    queryFn: () => login()
  })
  if (data) {
    setIsAuthenticated(true)
    setProfile(data.data.data.user)
    navigate({
      pathname: path.home,
      search: createSearchParams({
        fromDate: startDate,
        toDate: endDate
      }).toString()
    })
  }

  // const onClick = () => {
  //   // const requestData = null;{
  //       onSuccess: (data) => {
  //       setIsAuthenticated(true)
  //       setProfile(data.data.data.user)
  //       navigate({
  //         pathname: path.home,
  //         search: createSearchParams({
  //           fromDate: startDate,
  //           toDate: endDate
  //         }).toString()
  //       })
  //     },
  //     onError: (error) => {
  //       console.log(error)
  //       if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
  //         const formError = error.response?.data.data
  //         if (formError?.email) {
  //           setError('email', {
  //             message: formError.email,
  //             type: 'server'
  //           })
  //         }
  //       }
  //     }
  //   }
  // }
  return (
    <div>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-slate-900 min-h-screen'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <img className='w-8 h-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/1290/1290874.png ' alt='logo' />
          Procast
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
              Welcome to our website
            </h1>
            <div className='flex  justify-center align=center'>
              <Button
                type='primary'
                href='http://localhost:8081/e/v1/login-third-party'
                target='blank'
                className='w-3/4 h-auto text-lg
'
              >
                Sign In
              </Button>
            </div>

            {/* <form className='space-y-4 md:space-y-6' onSubmit={onSubmit} noValidate autoComplete='off'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Tài khoản của bạn
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='youremail@gmail.com'
                  {...register('email', rules.email)}
                />
                <div className='mt-0 text-red-600 text-xs p-2'>{errors.email?.message}</div>
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Mật khẩu
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='Your password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  autoComplete='on'
                  {...register('password', rules.password)}
                  required
                />
                <div className='mt-0 text-red-600 text-xs p-2'>{errors.password?.message}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-900 dark:text-white'>
                      Duy trì đăng nhập
                    </label>
                  </div>
                </div>
                <Link
                  to={path.forgotPassword}
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-900 dark:text-white'
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center'
                isLoading={loginMutation.isLoading}
                disabled={loginMutation.isLoading}
              >
                Đăng nhập
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Chưa có tài khoản?{' '}
                <Link className='font-medium text-primary-600 hover:underline dark:text-primary-500' to='/register'>
                  Tạo tài khoản
                </Link>
              </p>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  )
}
