'use client'
import React, { useState } from 'react'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { TLoginInput, TResObj } from '@/types';
import { valiateInputs } from '@/utils/clientUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const LoginComp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [processing, setProcessing] = useState(false);
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
        try {
            setProcessing(true);
            let inputs: TLoginInput = {
                email: email,
                password: password
            }
            let resObj: TResObj = valiateInputs({ validateInput: inputs, action: "SignUp" });

            if (resObj.status === "FAILED") {
                setErrorText(resObj.message);
                return 0;
            }
            else
                setErrorText("");

            let userPayload = JSON.stringify(inputs);
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
            let responseJson: TResObj = await res.json();
            console.log(responseJson);

            if (res.ok) {
                setErrorText("");
                redirectToPrev();
            }
            else {
                setErrorText(responseJson.message);
            }

        } catch (error: any) {
            if (error?.message)
                console.log(">>>>", error?.message);
        }
    };

    return (
        <>
            <div className='login-container'>
                {errorText && <h3>{errorText}</h3>}
                <div className={`card ${errorText?.length ? "error" : ""}`}>
                    <h3>Please enter the required fields</h3>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className={`cus-button ${processing ? 'processing' : ""}`} onClick={async () => {
                        await handleLogin();
                        setProcessing(false);
                    }} > {processing ? <FontAwesomeIcon className='spinner' icon={faSpinner} /> : "Log In!"}</button>
                    <h5>New user?<a href="/signin"> Create an account</a></h5>
                </div>
            </div>

        </>
    )
}

export default LoginComp