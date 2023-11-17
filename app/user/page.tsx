import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'
import UserContent from './components/UserContent'

const User = () => {
  return (
    <ProtectedRoute>
        <UserContent />
    </ProtectedRoute>
  )
}

export default User