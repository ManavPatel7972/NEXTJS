import React from 'react'

async function page(
    {params}:
    {
        params: Promise<{id: number}>
    }
) {

    const {id}=await params
    return (
      <div>
        <h1>
            {id}
        </h1>
        <p>
            Full page url
        </p>
      </div>
    )
}

export default page
