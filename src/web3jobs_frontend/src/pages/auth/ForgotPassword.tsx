import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    // Simulate password reset email
    console.log('Reset password for:', data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-secondary-light p-8 rounded-lg">
        <div>
          <Link to="/login" className="flex items-center gap-2 text-primary hover:text-primary-dark">
            <ArrowLeft className="w-5 h-5" />
            Back to login
          </Link>
          <h2 className="mt-6 text-center text-3xl font-display font-bold text-primary">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="bg-accent-green/10 text-accent-green p-4 rounded-lg">
              Check your email for password reset instructions.
            </div>
            <p className="text-gray-400">
              Didn't receive the email?{' '}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:text-primary-dark"
              >
                Try again
              </button>
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-accent-red">{errors.email.message}</p>
              )}
            </div>

            <button type="submit" className="w-full btn-primary">
              Send Reset Instructions
            </button>
          </form>
        )}
      </div>
    </div>
  );
};