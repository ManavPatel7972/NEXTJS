import React from 'react'
import styles from "./page.module.css"
import "./page.css"

function page() {
  return (
    <>
        <div>
            About page
        </div>
        <div className={styles.main}>
            Main content
        </div>
    </>
  )
}

export default page
