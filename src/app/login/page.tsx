import { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Login | Afridi Tasks',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg border">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome to Afridi Tasks</h1>
          <p className="text-muted-foreground mt-2">Log in to manage your tasks, designed by IB Afridi.</p>
        </div>
        <LoginForm />
        <div className="text-center text-sm text-muted-foreground mt-4">
          <p>Dummy Email: ib.afridi@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}
