import React from 'react'
import { Box, Button, Container, Grid } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import { ControlTextField } from '../Components/ControlFields'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import UserForm from '../Components/Admin/UserForm';


const useStyles = makeStyles({
    buttonsBox: {
        textAlign: 'right'
    },
    cancelButton: {
        margin: "12px"
    },
    saveButton: {
        margin: "12px"
    }
});

function RegisterUser(props) {

    const classes = useStyles()
    const methods = useForm()
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister
    const onSubmit = (data) => {
        dispatch(register(data))
    }

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
