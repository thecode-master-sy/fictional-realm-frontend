import { CloudIcon } from "@/components/ui/cloud-icon";
import { GoogleIcon } from "@/components/ui/google-icon";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background relative flex flex-col lg:flex-row">
      {/* Header - Desktop Logo */}
      <h2 className="font-sans text-xl font-bold absolute top-[20px] left-[20px]">
        Fictopia
      </h2>
      {/* Left Column - Form */}
      <section className="w-full flex flex-col space-y-[32px] items-center  min-h-screen justify-center">
        <div className="space-y-2">
          <h1 className="text-[32px] font-bold text-foreground -tracking-[1px] text-center">
            Login to your account
          </h1>
          <p className="text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="max-w-[450px] w-full ">
          <form className="w-full  space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-base">
                Email
              </Label>
              <Input placeholder="m@example.com" name="email" />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base font-medium">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm transition underline text-muted-foreground hover:text-foreground"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                className=""
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              size="lg"
              className="bg-accent-green w-full text-foreground cursor-pointer border border-black/20 text-base hover:bg-[#87c88d]"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="w-full max-w-md my-6 relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F5F1E8] px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Third Party Login */}
          <div className="w-full max-w-md">
            <Button
              size="lg"
              className="w-full border border-black/20 text-base  bg-white cursor-pointer text-foreground hover:bg-white/80"
            >
              {/* Google Icon Component */}
              Continue with google
            </Button>
          </div>

          {/* Footer */}
          <p className="w-full max-w-md text-center mt-4 text-muted-foreground">
            Already have an account?{" "}
            <a href="#" className="font-medium text-foreground hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </section>
      <div className="w-full hidden relative bg-accent-green lg:flex items-center justify-center overflow-hidden">
        <h2 className="text-center text-h2 font-medium -tracking-[2px] max-w-[16ch]">
          The library of stories I bet you’ll read twice.
        </h2>

        <CloudIcon className="absolute top-14 left-9 w-17.5" />
        <CloudIcon className="absolute top-[180px] left-[240px] w-[90px]" />
        <CloudIcon className="absolute top-[70px] left-160.5 w-22.5" />

        <CloudIcon className="absolute top-[130px] left-108.5 w-12" />

        <CloudIcon className="absolute top-75 left-150 w-17.5" />

        <CloudIcon className="absolute top-104.5 left-51 w-17.5" />

        <CloudIcon className="absolute top-160 left-9 w-22.5" />

        <CloudIcon className="absolute top-140 left-75 w-17.5" />

        <CloudIcon className="absolute top-135.5 left-140.5 w-17.5" />
      </div>
    </div>
  );
}
