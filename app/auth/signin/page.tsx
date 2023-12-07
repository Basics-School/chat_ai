import Image from "next/image";
import Link from "next/link";
import SignInForm from "@/components/forms/signin-form";

const SigninPage = ({ searchParams }: {
  searchParams: { message: string }
}) => {
  return (
    <div className="grid w-full h-[100vh] grid-cols-1 md:grid-cols-3">
      <SignInForm searchParams={searchParams} />
      {/* Gradient */}
      <div className="relative hidden w-full overflow-hidden md:col-span-2 rounded-l-2xl md:block">
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-white/10 backdrop-blur-lg" />
        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <div>
           
            <div className="mt-4">
              <div className="text-2xl font-medium text-foreground">
               A chat ai to make learning and working easy
              </div>
              <div className="max-w-xl text-sm text-foreground">
                as playfull as possible
                <span className="font-medium text-foreground">
                works with huggingface api 
                </span>{" "}
                In order to use this procut, you must get your HHuggingface API key
                from their{" "}
                <Link
                  className="underline underline-offset-4"
                  href="https://huggingface.com"
                >
                  website
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
        <Image
          priority
          sizes="50vw"
          className="z-0"
          alt="gradient"
          fill
          src="/login-gradient.jpg"
        />
      </div>
    </div>
  );
};

export default SigninPage;