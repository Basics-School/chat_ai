import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { LogInForm } from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col gap-6 items-center justify-center py-10">

      <LogInForm/>
      <LoginButton />
    </div>
  )
}
