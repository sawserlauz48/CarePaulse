"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import { UserFromValidtion } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "../ui/label"

 
const RegisterForm = ( {user}:{user : User}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFromValidtion>>({
    resolver: zodResolver(UserFromValidtion),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit({name , email, phone}: z.infer<typeof UserFromValidtion>) {
    setIsLoading(true);

    try {
      const userData = {name , email, phone}
      const user = await createUser(userData);
      console.log(user,"user");
      
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
        <h1 className="header">Welcome</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>
{/* NAME */}
            <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="name" label="Full name" placeholder="Jhon Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" />
{/* EMAIL & PHONE */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="JhonDoe@email.com" iconSrc="/assets/icons/email.svg" iconAlt="email" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="phone" label="Phone number" placeholder="(555) 123-4567" iconSrc="/assets/icons/email.svg" iconAlt="email" />
                </div>
{/* BirthDate & Gender */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.DATE_PICKER} name="birthDate" label="Date of Birth" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.SKELETON} name="gender" label="Gender" renderSkeleton={(field)=> (
                        <FormControl>
                            <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                                {GenderOptions.map((option)=>( 
                                <div key={option} className="radio-group">
                                    <RadioGroupItem value={option} id={option} />
                                    <Label className=" cursor-pointer" htmlFor={option}>{option}</Label>
                                </div> ))}
                            </RadioGroup>
                        </FormControl> 
                    )} />
                </div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm