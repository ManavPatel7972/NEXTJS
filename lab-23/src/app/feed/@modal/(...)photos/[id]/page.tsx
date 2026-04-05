import Link from 'next/link'
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
            Photos: {id}
        </h1>
        <p>
            Opened as modal
        </p>

        <Link href="/feed">Close</Link>
    </div>
  )
}

export default page
