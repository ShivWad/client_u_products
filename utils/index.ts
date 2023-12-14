'use server'

import { cookies } from "next/headers";

/**
 * Checks if user have an active session
 * @returns boolean
 */
export const checkAuth = async (): Promise<boolean> => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("sesAuth");

        let reqOptions: RequestInit = {
            method: "GET",
            credentials: "include",
            cache: "no-cache",
            redirect: "follow",
        };
        if (token && token?.value) {
            reqOptions.headers = {
                "Cookie": token.value,
                "Content-Type": 'application/json',
            }
        }
        else {
            reqOptions.headers = {
                "Content-Type": 'application/json',
            }
        }


        let res = await fetch(`${process.env.EX_APP_URL}/api/user/checkauth`, reqOptions);
        let data = await res.json();
        if (data?.isSessionActive)
            return true;
        else
            return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const logout = async () => {


    const cookieStore = cookies();
    const token = cookieStore.get("sesAuth");

    let reqOptions: RequestInit = {
        method: "GET",
        credentials: "include",
        cache: "no-cache",
        redirect: "follow",
    };
    if (token && token?.value) {
        reqOptions.headers = {
            "Cookie": token.value,
            "Content-Type": 'application/json',
        }
    }
    else {
        reqOptions.headers = {
            "Content-Type": 'application/json',
        }
    }

    let res = await fetch(`${process.env.EX_APP_URL}/api/user/logout`, reqOptions);
    let responseJson = await res.json();
    console.log(responseJson);
    return responseJson;
};

