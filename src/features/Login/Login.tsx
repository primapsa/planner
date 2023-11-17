import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {userLogin} from "./auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:
            {
                email: '',
                password: '',
                rememberMe: false
            },
        onSubmit: (values) => {
            dispatch<any>(userLogin(values))
            formik.resetForm()
        },
        validate: values => {
            const errors: FormikLoginErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            }
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors
        }
    })
    if (isLoggedIn) {
        navigate('/')
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                        {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal" name='password' value={formik.values.password}
                                   onChange={formik.handleChange}
                        />
                        {formik.errors.password && <div>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                          name='rememberMe' value={formik.values.rememberMe}
                                          onChange={formik.handleChange}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

type FormikLoginErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}