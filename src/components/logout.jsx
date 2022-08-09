import React from 'react';
import { Link } from 'wouter';
import user from "../assets/user.png"

const Logout = () => {
    return (
        <div className='is-flex is-flex-direction-column has-background-white py-6 card my-5 mx-4'>
            <img src={user} alt="user-icon"  className='card-image  image is-128x128 mx-auto my-2'/>
            <h1 className='is-size-2 my-3 has-text-centered is-text-light'>
                You have successfully logged out!
            </h1>
            <Link to="/" className='mt-6 button is-info' style={{width:"fit-content" ,margin:"auto"}}>Back to home</Link>
        </div>
    );
}

export default Logout;
