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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../ui/FileUploader"

 
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
        
{/* Address & Occupation */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="address" label="Address" placeholder="14 Street, Tel Aviv" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="occupation" label="Occupation" placeholder="Software Engieer" />
                </div>
{/* Address & Occupation */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="emergencyContactName" label="Emergency Contact Name" placeholder="Guardian's Name" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="emergencyContactNumber" label="emergency Contact Number" placeholder="(555) 123-4567" iconSrc="/assets/icons/email.svg" iconAlt="email" />
                </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>
{/* Primary Physicin */}
                    <CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name="primaryPhysicin" label="Primary Physicin" placeholder="Select a physician" >
                        {Doctors.map((doctor)=>(<SelectItem key={doctor.name} value={doctor.name}>
                            <div className="flex cursor-pointer items-center gap-2">
                                <Image src={doctor.image} width={32} height={32} alt={doctor.name} className="rounded-full border border-dark-500" />
                                <p>{doctor.name}</p>
                            </div></SelectItem>))}
                    </CustomFormField>
{/* Primary Physicin & Occupation */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="insuranceProvider" label="Insurance Provider" placeholder="Clalit" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name="insurancePolicyNumber" label="Insurance Policy Number" placeholder="ABCD123456" />
                </div>
{/* Allergies & Current Medication */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="allergies" label="Allergies (if any)" placeholder="Pollen, Penuts, Penicillin" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="currentMedication" label="Current Medication (if any)" placeholder="Ibuprofen 200mg, Paracetamol 500mg" />
                </div>
{/* Family Medical History & Past Medical History */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="familyMedicalHistory" label="Family Medical History" placeholder="if any" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name="pastMedicalHistory" label="Past Medical History" placeholder="if any" />
                </div>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identifction and Verification</h2>
            </div>
        </section>
{/* Identifction Type & Identifction Number */}
                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name="identifctionType" label="Identifction Type" placeholder="Select Identifction Type" >
                        {IdentificationTypes.map((type)=>(<SelectItem key={type} value={type} >
                            {type}
                            </SelectItem>))}
                    </CustomFormField>
                    <CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name="identifctionNumber" label="Identifction Number" placeholder="123456789" />
                    <CustomFormField control={form.control} fieldType={FormFieldType.SKELETON} name="identifctionDocument" label="Identifction Document" renderSkeleton={(field)=> (
                        <FormControl>
                            <FileUploader />
                        </FormControl> 
                    )} />
                </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm