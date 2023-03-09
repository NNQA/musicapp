import React from 'react'
import Head from 'next/head'
import inconheader from '../static/inconheader.svg'

function Header() {
    return (
        <div>
            <Head>
                <title>Music App</title>
                <meta property="og:title" name ="description" content="Music App" key="title" />

            </Head>
        </div>
    )
}

export default Header