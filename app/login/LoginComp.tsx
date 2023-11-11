'use client'

import React, { useState } from 'react'
const LoginComp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        console.log(responseJson);
    };

    const test = async () => {
        let res = await fetch("/api/user/all");


        let responseJson = await res.json();
        console.log(responseJson);
    };



    const logout = async () => {
        let res = await fetch("/api/user/logout");


        let responseJson = await res.json();
        console.log(responseJson);
    };

    return (
        <div>
            <h1>Login</h1>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>Login</button>
            <button onClick={() => test()}>TEST</button>
            <button onClick={() => logout()}>LOGOUT</button>

        </div>
    )
}

export default LoginComp