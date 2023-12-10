
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { signIn } from "@/auth"

export async function LogInForm() {
  return (
    <form action={
     
      async (formData: FormData) => {
       "use server"
      await signIn("credentials", { email: formData.get("email"), password: formData.get("password") })
    }}
      className="mt-8 space-y-6 w-full max-w-md px-4" >
      <input defaultValue="true" name="remember" type="hidden" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <Label htmlFor="email-address">Email address</Label>
          <Input
            autoComplete="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="email-address"
            name="email"
            placeholder="Email address"
            required
            type="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="current-password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="password"
            name="password"
            placeholder="Password"
            required
            type="password"
          />
        </div>
      </div>
      <div>
        <Button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Sign in
        </Button>
      </div>

    </form >
  )
}
