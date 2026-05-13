export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-zinc-400">
          We sent a verification link to your email address. 
          Please click it to activate your account.
        </p>
        <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
          <p className="text-xs text-teal-500">
            Once verified, you'll be automatically redirected to the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}