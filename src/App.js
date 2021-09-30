import React from 'react';
import './App.css';
import HomePage from "./pages/homepage.component";
import {Switch, Route} from "react-router-dom";

function App() {

    const HatsPage = (props) => (
        <div>
            {console.log(props)}
            <h1>HATS PAGE</h1>
        </div>
    )

    return (
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop/hats' component={HatsPage}/>
            </Switch>
        </div>
    );
}

export default App;
