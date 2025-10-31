import Login from '@/components/authentication/Login'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!!session) {
    redirect("/");
  }
  return (
    <Login />
  )
}

export default page