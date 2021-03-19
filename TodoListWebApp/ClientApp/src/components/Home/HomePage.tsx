import React from "react";
import SignUp from '../Registration/Registration'
import SignIn from "../Autorization/SignIn";
import Button from '@material-ui/core/Button';
import {
    Switch,
    Route,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";
import {LOG_OUT} from "../../redux/constants";
import ToDoList from "../TodoList/ToDoList";
import {Auth} from "../Interfaces";
import AdminPage from "../Admin/AdminPage";
import history from "../history";


export default function Home() {
    const dispatch = useDispatch()
    const auth: Auth = useSelector((state: IRootState) => state.auth)
    
    const logOut = () => {
        let token: string = ''
        localStorage.clear()
        dispatch({type: LOG_OUT, token})
        history.push("/")
    }
   
    return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                    <div hidden={!Boolean(auth.token)}>
                        <Button onClick={logOut} variant="outlined" color="primary">
                            Log Out
                        </Button>
                    </div>
                </div>
                <hr/>
                <Switch>
                    <Route exact path="/" component={SignIn}/>
                    <Route exact path="/admin" component={AdminPage}/>
                    <Route exact path="/todoList" component={ToDoList}/>
                    <Route exact path="/signUp" component={SignUp}/>
                </Switch>
            </div>
    );
}

