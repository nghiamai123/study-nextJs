'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function ButtonRedirect() {
const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  
  return (
    <button onClick={handleClick}>Go to Login page</button>
  )
}
