import React from "react";
import SignUp from '../Registration/Registration'
import SignIn from "../Autorization/SignIn";
import {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ToDoList from "../TodoList/ToDoList";
import {useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";


export default function Home() {

    const [isPressed, setPressed] = useState(false)
    const pressButton = (isPres: boolean) => {
        setPressed(!isPres)
    }

    const authenticated = useSelector((state: IRootState) => state.auth.token)
    console.log(authenticated)

    return (
        <Router>
            <div>

                    <ul>
                        <li>
                            <Link to="/">SignUp</Link>
                        </li>
                        <li>
                            <Link to="/signIn">SignIn</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>


                <hr/>

                <Switch>
                    <Route exact path="/">
                          <SignUp pressButton={pressButton} isPres={isPressed}/>
                        
                    </Route>
                        
                    <Route path="/todo-list">
                        <ToDoList/>
                    </Route>

                    <Route path="/signIn">
                        {authenticated !== '' ? <ToDoList/> : <SignIn/>}  
                        
                    </Route>


                    <Route path="/about">
                        <About/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}
