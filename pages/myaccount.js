import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const MyAccount = () => {
    const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  return (
    <div>
      <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8"></h1>
      <div className="mt-8">
      <div class=" text-center sm:pr-30 sm:py-1 items-center">
          <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-center">Name</h2>
            <p className="text-gray-600 text-center">Email: example@example.com</p>
          </div>
          
        </div>
        
      </div>
      
    </div>

  )
}

export default MyAccount