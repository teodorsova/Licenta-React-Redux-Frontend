import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/users/thunks'

const Logout = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    useEffect(()=> {
        dispatch(logOut())
        var route="/"
        navigate(route)
    }, [dispatch, navigate])
  return (
    <></>
  )
}

export default Logout