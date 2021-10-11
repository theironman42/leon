import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import UserForm from '../Components/Admin/UserForm';


function RegisterUser(props) {

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo } = userRegister
    const onSubmit = (data) => {
        dispatch(register(data))
    }

    console.log("register: ", userInfo)

    useEffect(() => {
        if (userInfo) {
            props.history.push('/profile')
        }
        return () => {
            
        }
    }, [userInfo, props.history])

    return (
        <>
            <Container>
                <h1>Register User</h1>
                <UserForm onSubmit={onSubmit} onCancel={()=>props.history.push('/')} />
            </Container>
        </>
    )
}

export default RegisterUser
