
/**
 * Checks if user have an active session
 * @returns boolean
 */
export const checkAuth = async (): Promise<boolean> => {
    try {
        let res = await fetch("http://localhost:3000/api/user/checkauth");
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

