
import {  useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    fName : string,
    lName : string,
    email : string,
    password : string,
    confirmPassword : string
}

const Register = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext()
    const {register, watch, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();

    //fetch request called
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message : "Registration Successful", type: "SUCCESS"})
            await queryClient.invalidateQueries("validateToken")
            navigate('/')
        },
        onError: (error: Error) => {
            showToast({message : error.message, type: "ERROR"})
        }
    })

    const onSubmit = handleSubmit((form_data) => {
        mutation.mutate(form_data)
    })

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an account</h2>

      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            First Name
            <input className='border rounded w-full py-1 px-2 font-normal' type='text'
            {...register("fName", {required: "Enter your first name goofball"})}></input>

            {errors.fName && (
                <span className='text-red-500'>{errors.fName.message}</span>
            )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Last Name
            <input className='border rounded w-full py-1 px-2 font-normal' type='text'
            {...register("lName", {required: "Enter your last name goofball"})}></input>

            {errors.lName && (
                <span className='text-red-500'>{errors.lName.message}</span>
            )}
        </label>
      </div>


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


        <label className='text-gray-700 text-sm font-bold flex-1'>
            Confirm Password
            <input className='border rounded w-full py-1 px-2 font-normal' type='password'
            {...register("confirmPassword", {validate: (val) => {
                if(!val){
                    return "This field is required"
                }
                else if(watch("password") !== val){
                    return 'Your passwords dont match :( Maybe there\'s a typo?'
                }
            }})}></input>
            {errors.confirmPassword && (
                <span className='text-red-500'>{errors.confirmPassword.message}</span>
            )}
        </label>

        <span className='flex justify-between items-center'>
         <span className='text-sm'>
            Already registered? <Link className="underline" to="/register">Login here</Link>
          </span>
        <button type="submit" className='border rounded bg-blue-600 text-white p-2 text-xl font-bold hover:bg-blue-500'>Create Account</button>
        </span>
    </form>
  )
}

export default Register
