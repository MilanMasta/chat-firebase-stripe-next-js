import LoadingSpinner from '@/components/LoadingSpinner'
import React from 'react'

export default function Loading(){
  return (
    <div className='flex items-center p-10 justify-center'>
        <LoadingSpinner />
    </div>
  )
}
