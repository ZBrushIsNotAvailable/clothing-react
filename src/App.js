import React from 'react';
import {Switch, Route} from "react-router-dom";

import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
// import {onSnapshot} from "firebase/firebase-firestore";
import {onSnapshot} from "firebase/firestore";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // trusty, если юзер залогинен
            currentUser: null
        }
    }

    unsubscribeFromAuth = null


    componentDidMount() {
        // пока компонента App замаунтенна, эта subscription открыта
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                // срабатывает, когда меняется документ в бд.
                // в данном случае работать не будет, так как мы не меняем документ с пользователем,
                // но по любому вернёт snapshot (документ), что нам и нужно
                onSnapshot(userRef,snapshot => {
                    console.log(snapshot)
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                })
            } else {
                this.setState({currentUser: userAuth})
            }
            // await createUserProfileDocument(userAuth);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/shop' component={ShopPage}/>
                    <Route path='/signin' component={SignInAndSignUpPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
