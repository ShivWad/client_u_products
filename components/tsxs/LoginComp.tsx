'use client'
import React, { useState } from 'react'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { TLoginInput, TAuthObj, TUser } from '@/types';
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


    const redirectToPrev = (user?: TUser) => {
        let redirectParam = searchParams.get("prev");
        if (redirectParam) {
            if (redirectParam.includes("acc") && user) {
                console.log(`/${redirectParam}/${user._id}`);
                router.push(`/${redirectParam}/${user._id}`);
            }
            else router.push(`/${redirectParam}`);
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
            let resObj: TAuthObj = valiateInputs({ validateInput: inputs, action: "SignUp" });

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
            let responseJson: TAuthObj = await res.json();
            console.log(res);
            if (res.ok) {
                console.log(responseJson);
                // if (responseJson.user) {
                //     let authUser = responseJson.user;
                //     if (authUser) {
                //         // authUser.isAuthenticated = true;
                //         // dispatch(loginDetails(responseJson.user))
                //     }
                // }
                setErrorText("");
                redirectToPrev(responseJson.user);
            }
            else {
                console.log(responseJson);
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
                    <input className='global-text-input' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className='global-text-input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button className={`global-button ${processing ? 'processing' : ""}`} onClick={async () => {
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