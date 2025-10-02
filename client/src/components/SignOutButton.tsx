import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'

const SignOutButton = () => {
  const queryClient = useQueryClient()
  const {showToast} = useAppContext()

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({"message": "Signed out", "type": "SUCCESS"})
    },
    onError: (error : Error) => {
      showToast({"message": error.message, "type": "ERROR"})
    }
  })

  const handleClick = () => {
    const confirm = window.confirm("Are you sure you want to sign out?")
    if(!confirm){
      return
    }
    mutation.mutate()
  }
  return (
    <div>
      <button onClick= {handleClick} className='bg-blue-600 hover:bg-gray-100 py-2 px-3 bg-white font-bold'>Sign Out</button>
    </div>
  )
}

export default SignOutButton

