import { TLoginInput, TAuthObj } from "@/types";

/**
 * 
 * @param  validateInput, action 
 * @returns 
 */
export const valiateInputs = ({ validateInput, action }: { validateInput: TLoginInput, action: "Login" | "SignUp" }): TAuthObj => {
    let { name, email, password } = validateInput;
    let resObj: TAuthObj = {
        status: "SUCCESS",
        message: "Validated succesfully",

    };

    if (name != null && name.trim().length < 1) {
        resObj = {
            status: "FAILED",
            message: "Invalid name received",
        };
        console.log(resObj);
        return resObj;
    }


    let nameRegEx = /^[a-zA-z ]*$/
    let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (action === "SignUp") {
        if (name === "" || email === "" || password === "") {
            resObj = {
                status: "FAILED",
                message: "Missing information",
            };
            return resObj;
        } else if (!nameRegEx.test(name ?? "")) {
            resObj = {
                status: "FAILED",
                message: "Invalid name received",
            };
            return resObj;
        } else if (!emailRegEx.test(email)) {
            resObj = {
                status: "FAILED",
                message: "Invalid email received",

            };
            return resObj;
        }
        else if (password.length < 7) {
            resObj = {
                status: "FAILED",
                message: "Password should contain more than 6 characters."
            }
            return resObj;
        }
    }
    else {
        email = email.trim();
        if (email === "" || password === "") {
            resObj = {
                status: "FAILED",
                message: "Missing information",
            };
            return resObj;
        }
    }
    return resObj;
}

