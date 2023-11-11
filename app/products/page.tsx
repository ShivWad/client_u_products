import React from 'react'

type USER = {
    "_id": string,
    "name": string,
    "email": string,
    "password": string,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": number
}

const handleGetAllUser = async (): Promise<USER> => {
    let res = await fetch("http://localhost:3000/api/user/all");
    let responseJson = await res.json();
    return responseJson;
}

const page = async () => {

    let users = await handleGetAllUser();
    return (
        <div>
            <h1>{users.email}</h1>
            <h1>{users.name}</h1>
            <h1>{users._id}</h1>
        </div>
    )
}

export default page