import React from 'react'
import { api } from '~/utils/api'


const Users = () => {
    const users = api.user.getUsers.useQuery()
    const setAdmin = api.user.setAdmin.useMutation()

  return (
    <div className='flex flex-col space-y-5'>
        <p>Email   Id   Full Name Bookmarked Role</p>
        {users.data && users.data.map((user,index) => {
            return <div key={index} className='flex space-x-5' onClick={() => setAdmin.mutate({userId: user.id})}>
                <p>{user.email}</p>
                <p>{user.id}</p>
                <p>{user.fullName}</p>
                <p>{user.bookmarked}</p>
                <p>{user.role}</p>
            </div>
        })}

    </div>
  )
}

export default Users