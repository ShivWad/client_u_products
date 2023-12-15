'use client'
import React, { useState } from 'react'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const LoginComp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();

    const redirectToPrev = () => {
        let redirectParam = searchParams.get("prev");
        if (redirectParam) {
            router.back();
            return;
        }
        else {
            router.replace("/");
            return;
        }
    }

    const handleLogin = async () => {

        let userPayload = JSON.stringify({
            email: email,
            password: password,
        })

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: userPayload,
            redirect: 'follow',
            credentials: "same-origin"
        };

        let res = await fetch("/api/user/login", requestOptions);
        let responseJson = await res.json();

        if (res.ok) {
            redirectToPrev();
            return;
        }
        else {

        }
    };

    return (
        <>
            <div className='login-container'>
                <div className="card">
                    <h3>Please enter the required fields</h3>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className="cus-button" onClick={() => handleLogin()} >Login</button>
                    <h5>create account?<a href="/signin"> Create</a></h5>
                </div>
            </div>

        </>
    )
}

export default LoginComp