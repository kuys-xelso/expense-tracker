export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md">
        {/* You can add a shared logo or branding here for both login and signup */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
        </div>
        
        {/* This will render either the login or signup page */}
        {children}
      </div>
    </div>
  );
}
