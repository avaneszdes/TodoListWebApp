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


export default function Home() {
    
    const [isPressed, setPressed] = useState(false)
    const pressButton = (isPres: boolean) => {
        setPressed(!isPres)
    }
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

                <hr />

                <Switch>
                    <Route exact path="/">
                        <SignUp pressButton={pressButton} isPres={isPressed}/>
                    </Route>
                        <Route path="/signIn">
                            <SignIn />
                        </Route>
                    <Route path="/about">
                        <About />
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
