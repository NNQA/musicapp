import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import FormMain from './Form'
import StartUi from './StartUi/StartUi'
import A from './A'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <StartUi />
  )
}
