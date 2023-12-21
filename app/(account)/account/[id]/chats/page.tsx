import React from 'react'

const page = async ({ params }: { params: any }) => {
    let { id } = params;
    return (
        <div>{id}</div>
    )
}

export default page