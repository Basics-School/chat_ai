import { Button } from "@/components/ui/button";

import { Github } from "lucide-react";
import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'



const SigninForm = ({
  searchParams,
}: {
  searchParams: { message: string }
}) => {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
console.log(error);

    if (error) {
      return redirect(`/auth/signin?message=${error.message}`)
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/auth/signin?message=Could not authenticate user')
    }

    return redirect('/auth/signin?message=Check email to continue sign in process')
  }

  return (
    <div className="flex items-center w-full h-full px-8">
      {/* Main Container */}
      <div className="w-full ">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold">signin</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Welcome to the{" "}
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              makr.AI
            </span>{" "}
            Please signin with your Github account.
          </p>
        </div>

        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
            Sign In
          </button>
          <button
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          >
            Sign Up
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>






        <form action=""> <Button
          className="flex items-center w-full gap-2 mt-6"
        >
          auth/signin with Github <Github size="16" />
        </Button></form>

      </div>
    </div>
  );
};

export default SigninForm;