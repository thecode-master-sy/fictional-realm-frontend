import { CloudIcon } from "@/components/ui/cloud-icon";
import Image from "next/image";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background relative flex flex-col lg:flex-row">
      {/* Header - Desktop Logo */}
      <h2 className="font-sans text-xl font-bold absolute top-[20px] left-[20px]">
        Fictopia
      </h2>
      {/* Left Column - Form */}

      <section className="w-full flex flex-col space-y-8 items-center  min-h-screen justify-center">
         {children}
      </section>

      <div className="w-full hidden relative bg-accent-green lg:flex items-center justify-center overflow-hidden">
        <h2 className="text-center text-h2 font-medium -tracking-[2px] max-w-[16ch]">
          The library of stories I bet you’ll read twice.
        </h2>

        <CloudIcon className="absolute top-[7%] left-[4.5%] w-17.5" />
        <CloudIcon className="absolute top-[22.5%] left-[30%] w-[90px]" />
        <CloudIcon className="absolute top-[8.75%] left-[80.25%] w-22.5" />


        <CloudIcon className="absolute top-[37.5%] left-[75%] w-17.5" />

        <CloudIcon className="absolute top-[80%] left-[4.5%] w-22.5" />

        <CloudIcon className="absolute top-[70%] left-[37.5%] w-17.5" />

        <CloudIcon className="absolute top-[67.75%] left-[70.25%] w-17.5" />
      </div>
    </div>
  )
}
