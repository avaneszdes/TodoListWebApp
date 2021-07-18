import React from "react";
import SignUp from '../Registration/Registration'
import SignIn from "../Autorization/SignIn";
import {
    Switch,
    Route,
} from "react-router-dom";
import ToDoList from "../TodoList/ToDoList";
import AdminPage from "../Admin/AdminPage";
import EmailConfirmation from "../EmailConfirmation/EmailConfirmation";


export default function Home() {

    return (
        <div>
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route exact path="/admin" component={AdminPage}/>
                <Route exact path="/todoList" component={ToDoList}/>
                <Route exact path="/signUp" component={SignUp}/>
                <Route path="/ConfirmationPassword" component={EmailConfirmation}/>
            </Switch>
        </div>
    );
}

