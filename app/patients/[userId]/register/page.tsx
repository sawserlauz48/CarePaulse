import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({ params : { userId }}: SearchParamProps) => {

  const user = await getUser(userId)

  return (
    <div className=" flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg" width={1000} height={1000} alt="patient" className=" mb-12 h-10 w-fit"/>
          <RegisterForm user={user} />
          <div className=" text-14-regular mt-20 flex justify-between">
            <p className=" justify-items-end text-gray-500 xl:text-left">
              © 2024 CarePualse
            </p>
            <Link href="/?admin=ture" className="text-green-500">
            Admin
            </Link>
          </div>
        </div>
      </section>
      <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="patient" className="side-img max-w-[390px]"/>
    </div>
  )
}

export default Register