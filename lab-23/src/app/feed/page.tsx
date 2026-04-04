"use client"
import { Linden_Hill } from 'next/font/google'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function page() {

  return (
    <div>
      <h1>Feed</h1>

      <Link href="/photos/1">Open 1st photo</Link>
      <br/>
      <Link href="/photos/2">Open 2nd photo</Link>
    </div>
  )
}

export default page
