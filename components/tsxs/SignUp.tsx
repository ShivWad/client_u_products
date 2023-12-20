'use client'
import React, { useState } from 'react'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { TLoginInput, TAuthObj } from '@/types';
import { valiateInputs } from '@/utils/clientUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faSpinner } from '@fortawesome/free-solid-svg-icons';
import LoaderButton from './LoaderButton';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const [processing, setProcessing] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            setProcessing(true);
            let inputs: TLoginInput = {
                name: name,
                email: email,
                password: password
            }

            let resObj: TAuthObj = valiateInputs({ validateInput: inputs, action: "SignUp" });

            if (resObj.status === "FAILED") {
                setErrorText(resObj.message);
                return;
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

            let res = await fetch("/api/user/signup", requestOptions);
            let responseJson: TAuthObj = await res.json();

            if (res.ok) {
                router.replace("/login");
            }
            else {
                if (responseJson.dbCode === 11000)
                    setErrorText(responseJson.message);
            }
        } catch (error: any) {
            setErrorText("Some internal error occured, please try again later!");
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
                    <input className='global-text-input' type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    <input className='global-text-input' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className='global-text-input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <LoaderButton handleClick={handleSignIn} displayText='Sign Up!'/>
                    <h5>Have an account?<a href="/login"> Login</a></h5>
                </div>
            </div>

        </>
    )
}

export default SignUp