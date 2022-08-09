import React, { useState, useEffect } from 'react'
import icon from "../assets/icon.png"
import { Link, Redirect, useLocation } from 'wouter';
import Modal, { ModalPortal } from './modal';
import Loading from './loading';
import useAuth from '../hook/useAuth';

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [_, setLocation] = useLocation()
    const [errorEmail, setErrorEmail] = useState(null);
    
    const { error, isLoading, ok, setErrorStatus, setOkStatus, signUp } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        signUp({ email, password })
            .then((res) => {
                setTimeout(() => {
                    setOkStatus()
                    setLocation("/sign-in")
                }, 3000)
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

        <div className='py-6 background-image-primary'>

            <img src={icon} alt="icon" className='image mb-2 mx-auto' style={{ width: "50px", height: "auto" }} />

            <h4 className='title has-text-centered has-text-white is-size-2 has-text-weight-light'>
                Sign up to Super
            </h4>

            <form onSubmit={handleSubmit} className="is-flex mx-auto is-flex-direction-column p-5 has-background-light" style={{ maxWidth: "320px", borderRadius: "8px" }}>
                <input
                    className="input my-2"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    title="Invalid email address"
                    onBlur={({ target }) => {
                        if (target.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g) || target.value.length === 0)
                            return setErrorEmail(null)
                        return setErrorEmail("Invalid email address")
                    }
                    }
                    required
                />

                {errorEmail &&
                    <div className='py-2 px-4 my-2 has-text-danger error-label-message active'>
                        {errorEmail}
                    </div>
                }
                <input
                    className="input my-2"
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    required
                />

                {error.error &&
                    <div className='py-2 px-4 my-2 has-text-danger error-label-message active'>
                        {error?.message}
                    </div>
                }

                <button className='my-2 button is-info is-outlined' disabled={isLoading} >Sign up</button>

            </form>

            {isLoading &&
                <ModalPortal rounded>

                    <div className='is-size-4 has-text-centered'>
                        <Loading />
                    </div>

                </ModalPortal>

            }

            {ok &&
                <Modal rounded>

                    <div className='is-size-4 has-text-centered'>
                        <h2>User has been created successfully!</h2>
                    </div>

                </Modal>
            }

            <div className='my-5 p-5 mx-auto has-background-light ' style={{ maxWidth: "320px", borderRadius: "8px" }}>

                <p className='has-text-centered'>
                    Do you have an account?  <Link href="/sign-in">Log in.</Link>
                </p>
            </div>


        </div>
    )
}
