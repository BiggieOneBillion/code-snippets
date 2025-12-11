import SignInForm from '@/components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 sm:-left-48 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 sm:-right-48 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 w-full">
        <SignInForm />
      </div>
    </div>
  );
}
