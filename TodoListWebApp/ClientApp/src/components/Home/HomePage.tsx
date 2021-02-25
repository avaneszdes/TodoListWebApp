import React from "react";
import SignUp from '../Registration/Registration'
import SignIn from "../Autorization/SignIn";
import Button from '@material-ui/core/Button';
import {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";
import {LOG_OUT} from "../../redux/constants";
import jwt_decode, {JwtPayload} from 'jwt-decode'
import AdminPage from "../Admin/AdminPage";
import {User} from "../Interfaces";
import ToDoList from "../TodoList/ToDoList";

export default function Home() {


    const [isPressed, setPressed] = useState(false)
    const dispatch = useDispatch()
    const pressButton = (isPres: boolean) => {
        setPressed(!isPres)
    }

    const rootToken: string = useSelector((state: IRootState) => state.auth.token)
    const authenticated = rootToken === null || rootToken === undefined ? false : true
    let role: string = ""
    if (authenticated) {
        role = Object.values(jwt_decode<JwtPayload>(rootToken))[0]
        const userProfile = Object.values(JSON.parse(role[1]))
        console.log(userProfile[4])
    }

    const logOut = () => {
        let token: string = ''
        localStorage.clear()
        dispatch({type: LOG_OUT, token})
    }


    return (
        <Router>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>

                    <div hidden={true}>
                        <Link to="/">SignUp</Link>
                    </div>
                    
                    {/*<div>*/}
                    {/*    <Link to="/admin">Admin</Link>*/}
                    {/*</div>*/}

                    <div hidden={true}>
                        <Link to="/signIn">SignIn</Link>
                    </div>

                    <div>
                        <Link to="/todoList">TodoList</Link>
                    </div>

                    <div hidden={!authenticated}>
                        <Button onClick={logOut} variant="outlined" color="primary">
                            Log Out
                        </Button>
                    </div>
                </div>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        <SignUp pressButton={pressButton} isPres={isPressed}/>
                    </Route>
                    
                    {/*<Route exact path="/admin">*/}
                    {/*    <AdminPage/>*/}
                    {/*</Route>*/}
                    <Route exact path="/todoList">
                        {/*{authenticated ? <ToDoList/> : <Redirect from="/todoList" to="/signIn"/>}*/}
                        <ToDoList/>
                    </Route>
                    <Route path="/signIn">
                        {/*{authenticated === false ? <SignIn/> : <Redirect from="/signIn" to="/todoList"/>}*/}
                        <SignIn/>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}

