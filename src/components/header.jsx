import { auth } from 'firebaseui'
import React, { useState } from 'react'
import { Link } from 'wouter'
import icon from "../assets/icon.png"
import useAuth from '../hook/useAuth'


export default function Header() {
    const [toggleMenu, setToggleMenu] = useState(false);

    const { logOutService, auth } = useAuth()

    return (
        <div className="navbar " role="navigation" aria-label="main navigation"  >
            <div className="navbar-brand">

                <Link className="navbar-item title-app is-size-3" to="/">
                    <img src={icon} alt="icon" className='images mx-2 my-2' />
                    Super<span className='has-text-info'>App</span>
                </Link>



                <a
                    role="button"
                    className={`navbar-burger burger ${toggleMenu ? "is-active" : ""}`}
                    aria-label="menu"
                    style={{ height: "auto" }}
                    onClick={() => setToggleMenu(!toggleMenu)}
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>

            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${toggleMenu ? "is-active" : ""}`} >
                <div className="navbar-end" >
                    <div className={`navbar-item `} >
                        <div className={`buttons is-flex option-header`}
                            style={{ gap: "16px" }}
                            
                        >
                            {!auth.token ?
                                <>

                                    <Link
                                        className="button is-secondary " to='/sign-up'
                                        onClick={() => {

                                            setToggleMenu(false)
                                        }}
                                    >
                                        Sign up
                                    </Link>


                                    <Link
                                        className="button is-light" to="/sign-in"
                                        onClick={() => {

                                            setToggleMenu(false)
                                        }}
                                    >
                                        Log in
                                    </Link>


                                </>
                                :
                                <>
                                    <Link
                                        className='button is-info'
                                        to='/favorites'

                                        onClick={() => {

                                            setToggleMenu(false)
                                        }}
                                    >
                                        Favorite
                                    </Link>
                                    <Link
                                        className="button is-danger"
                                        onClick={() => {
                                            logOutService()
                                            setToggleMenu(false)
                                        }}

                                        to="/logout"
                                    >
                                        Log out
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
