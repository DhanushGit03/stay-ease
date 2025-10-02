import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type LoginFormData = {
    email : string,
    password : string
}

const Login = () => {
    const { showToast } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation();
    const queryClient = useQueryClient();
    const { register, formState: {errors}, handleSubmit } = useForm<LoginFormData>();


    const mutation = useMutation(apiClient.login, {
      onSuccess: async () => {
        showToast({message: "Successfully logged in", type: "SUCCESS"})
        await queryClient.invalidateQueries("validateToken")
        navigate(location.state?.from?.path || "/")
      },
      onError: (error : Error) => {
        showToast({message: error.message, type: "ERROR"})
      }
    })


    const onSubmit = handleSubmit((data) => {
      mutation.mutate(data)
    })
  return (
    <div>
      <form className='flex flex-col gap-5' onSubmit={onSubmit}>
        <h2 className='text-3xl font-bold'>
            Login
        </h2>

        <label className='text-gray-700 text-sm font-bold flex-1'>
            Email
            <input className='border rounded w-full py-1 px-2 font-normal' type='email'
            {...register("email", {required: "Enter your email silly"})}></input>
            {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
            )}
        </label>


        <label className='text-gray-700 text-sm font-bold flex-1'>
            Password
            <input className='border rounded w-full py-1 px-2 font-normal' type='password'
            {...register("password", {required: "Enter your password silly", minLength: {value: 6, message: "Password should be more than 6 characters"}})}></input>
            {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
            )}
        </label>

        <span className='flex items-center justify-between'>
          <span className='text-sm'>
            Not registered? <Link className="underline" to="/register">Create an account here</Link>
          </span>
        <button type="submit" className='border rounded bg-blue-600 text-white p-2 text-xl font-bold hover:bg-blue-500'>Login</button>
        </span>

      </form>
    </div>
  )
}

export default Login
