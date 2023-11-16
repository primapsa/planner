import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {AppDispatchType, AppRootStateType} from './store'
import {RequestStatusType, setCurrentAuthStatus} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {userLogout} from "../features/Login/auth-reducer";
import {getAppInitialized, getAuthLogin, getState} from "../selectors/selectors";


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(getState)
    const isLoggedId = useSelector<AppRootStateType, boolean>(getAuthLogin)
    const isInitialized = useSelector<AppRootStateType, boolean>(getAppInitialized)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch<AppDispatchType>(setCurrentAuthStatus())
    }, [])
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const logoutHandler = () => {
        dispatch<AppDispatchType>(userLogout())
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedId && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<TodolistsList/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='*' element={<Navigate to='/404'/>}/>
                        <Route path='/404' element={<h1>404 NOT FOUND</h1>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    )
}

export default App
