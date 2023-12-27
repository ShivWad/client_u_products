'use server'

import { TAuthObj, TProduct, TResponseObject } from "@/types";
import { cookies } from "next/headers";

/**
 * Checks if user have an active session
 * @returns boolean
 */
export const checkAuth = async (): Promise<TAuthObj> => {
    let returnObj: TAuthObj = {
        status: "FAILED",
        message: "",
        user: {
            isAuthenticated: false
        }
    };

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
        if (data?.isSessionActive) {
            returnObj.message = "User Authenticated";
            returnObj.status = "SUCCESS";
            returnObj.user = data.userObj;
            return returnObj;
        }
        else {
            return returnObj;
        }
    } catch (error) {
        console.log(error);
        return returnObj;
    }
}


export const logout = async () => {
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

        let res = await fetch(`${process.env.EX_APP_URL}/api/user/logout`, reqOptions);

        let responseJson = await res.json();
        if (res.ok)
            return true;
    } catch (error) {
        return false;
    }
    return false;
};


export const Sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));





export const ListProduct = async (formdata: FormData): Promise<TResponseObject> => {
    let responseObj: TResponseObject = {
        status: "FAILED",
        message: ""
    }
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("sesAuth");

        console.log("Server>>", formdata);

        let reqOptions: RequestInit = {
            method: "POST",
            credentials: "include",
            cache: "no-cache",
            redirect: "follow",
            body: formdata

        };
        if (token && token?.value) {
            reqOptions.headers = {
                "Cookie": token.value,
                // "Content-Type": "form-data"
            }
        }
        else {
            // reqOptions.headers = {
            //     "Content-Type": "form-data",
            // }
        }

        let res = await fetch(`${process.env.EX_APP_URL}/api/product/create`, reqOptions);

        console.log(">>>", res.status);
        let response: TProduct = await res.json();

        if (res.status === 200) {
            console.log('inside if')
            responseObj.status = "SUCCESS"
            responseObj.res = response;
            return responseObj
        }
        else {
            console.log('inside else')

            responseObj.res = response
        }
    } catch (error: any) {
        console.log(error);
        responseObj.message = error.message;
        return responseObj
    }
    console.log('inside end')
    return responseObj
}

export const MarkAsSold = async (product_Id: string): Promise<TResponseObject> => {
    let responseObj: TResponseObject = {
        status: "FAILED",
        message: ""
    }
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("sesAuth");


        let user = await checkAuth();
        console.log(user);

        if (user.status === "SUCCESS") {
            let body = {
                product_Id: product_Id,
                ownerId: user.user?._id
            }
            let reqOptions: RequestInit = {
                method: "PUT",
                credentials: "include",
                cache: "no-cache",
                redirect: "follow",
                body: JSON.stringify(body)
            };
            if (token && token?.value) {
                reqOptions.headers = {
                    "Cookie": token.value,
                    "Content-Type": "application/json"
                }
            }
            else {
                reqOptions.headers = {
                    "Content-Type": "application/json",
                }
            }

            let res = await fetch(`${process.env.EX_APP_URL}/api/product/mark`, reqOptions);

            console.log(">>>", res.status);

            if (res.status === 200) {
                let response: TProduct = await res.json();
                console.log('inside if')
                responseObj.status = "SUCCESS"
                responseObj.res = response;
                return responseObj
            }
            else {
                console.log('inside else')
                let response: any = await res.json();
                responseObj = response;
                responseObj.status = "FAILED";
            }
        }

    } catch (error: any) {
        console.log(error);
        responseObj.message = error.message;
        responseObj.status = "FAILED";
        return responseObj
    }
    console.log('inside end')
    return responseObj
}