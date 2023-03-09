import Image from 'next/image'
import { Inter } from 'next/font/google'
import Sildebar from '@/components/Sildebar';
import Header from '@/components/Header';
import Head from 'next/head';
import img from "../static/music-note.png"

export const metadata = {
  title: 'Next.js',
};

export default function Home() {
  return (
    <div>
      <Sildebar />
    </div>
  );
}
