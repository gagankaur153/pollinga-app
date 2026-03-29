import { Navigate } from "react-router";

import React from 'react'

const Protectedroute = ({children}) => {
    const isauth = localStorage.getItem("login")
    if(!isauth){
        return <Navigate to={'/login'}/>
    }
    return children;
  
}

export default Protectedroute