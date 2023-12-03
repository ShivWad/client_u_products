import React from 'react'
import LoginComp from './LoginComp';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/utils';

const page = async () => {
    let isAuthenticated = await checkAuth();
    console.log("isAuthenticated>>", isAuthenticated);
    if (isAuthenticated) {
        redirect("/");
    }
    return (
        <div className='login-container'>
            <div className="card">
                    <h1>Login Page</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button className="cus-button" >Login</button>
                    <p><input className="check" type="checkbox" />Remember me<a className="forget" href="#">Forgot account?</a></p>
                    <h5>create account?<a href="/signin"> Create</a></h5>
            </div>
        </div>
    )
}

export default page