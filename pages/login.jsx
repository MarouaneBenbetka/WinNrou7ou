import React from 'react'
import SignInForm from '@/components/auth/SignInForm'

const login = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-white rounded-sm'>
      					<SignInForm
							closeModal={() => {
								setShowModal(false);
							}}
						/>
    </div>
  )
}

export default login
