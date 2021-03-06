import React from 'react'

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state

        if (password !== confirmPassword) {
            alert("passwords don't match")
            return
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            console.log(user.email)
            await createUserProfileDocument(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (e) {
            console.error('Error creating user', e.message)
        }
    }

    handleChange = e => {
        const {value, name} = e.target;
        this.setState({[name]: value})
        // console.log(this.state)
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state

        return (
            <div className='sign-up'>
                <h2 className='title'> I do not have an account </h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        value={displayName}
                        handleChange={this.handleChange}
                        label='Name'
                        required
                    />
                    <FormInput
                        name='email'
                        type='email'
                        value={email}
                        handleChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        name='password'
                        type='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='Confirm password'
                        required
                    />
                    <CustomButton type='submit'> SIGN UP </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;