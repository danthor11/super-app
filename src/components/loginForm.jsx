import React, { useState } from 'react'
import icon from "../assets/icon.png"
import { Link, useLocation } from 'wouter';
import Loading from './loading';
import Modal from './modal';
import useAuth from '../hook/useAuth';

export default function LoginForm({background=true}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [_, setLocation] = useLocation()
    const { error, isLoading, logInUser, setOkStatus, setErrorStatus } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        logInUser({ email, password })
            .then(() => {
                setTimeout(() => {

                    setOkStatus()
                    setLocation("/")
                }, 1000)
            })
            .catch(err => {
                setTimeout(() => {
                    setErrorStatus()
                }, 4000)
            })

        setEmail("")
        setPassword("")

    }

    return (

        <div className={`${background && "background-image-secondary py-6"} `}>
            <div className="login-form px-1">
                <img src={icon} alt="icon" className='image mb-2 mx-auto' style={{ width: "50px", height: "auto" }} />

                <h4 className='title has-text-centered has-text-white is-size-2 has-text-weight-light'>
                    Sign in to Super
                </h4>

                <form onSubmit={handleSubmit} className="is-flex mx-auto is-flex-direction-column py-5 px-5 has-background-light" style={{ maxWidth: "320px", borderRadius: "8px" }}>
                    <input
                        className="input my-2"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        title="Invalid email address"
                        required
                    />
                    <input
                        className="input my-2"
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        required
                    />

                    {error.error &&
                        <div className='py-2 px-4 my-2 has-text-danger error-label-message active '>
                            {error?.message}
                        </div>
                    }

                    <button className='button is-info ' disabled={isLoading}>Sign in</button>
                </form>
                {isLoading &&
                    <Modal rounded>

                        <div className='is-size-4 has-text-centered'>
                            <Loading />
                        </div>

                    </Modal>

                }

                <div className='my-5 p-5 mx-auto has-background-light ' style={{ maxWidth: "320px", borderRadius: "8px" }}>

                    <p className='has-text-centered'>
                        New to Super?  <Link to="/sign-up">Create an account. </Link>
                    </p>
                </div>
            </div>

        </div>
    )
}
