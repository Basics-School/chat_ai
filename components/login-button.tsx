import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub } from '@/components/ui/icons'
import { signIn } from '@/auth'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButton({
  text = 'Login with GitHub',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  return (
    <form action={async () => {
      "use server"
      await signIn('github')
    }} >
      <Button
        variant="outline"
        className={cn(className)}
        {...props}
      >

        <IconGitHub className="mr-2" />

        {text}
      </Button></form>
  )
}
