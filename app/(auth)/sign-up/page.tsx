import Signup from '@/components/authentication/Signup'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  console.log("sign up page")
 const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!!session) {
    redirect("/");
  }

  return (
      <Signup />
  )
}

export default page