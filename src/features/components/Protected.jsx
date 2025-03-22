import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({children}) {
    const user = localStorage.getItem("userId");


    if(user){
        return children
    }
    else{
        return <Navigate to="/signup"></Navigate>
    }
  
}

export default Protected