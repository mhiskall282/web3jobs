// import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../lib/store';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['freelancer', 'client']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    // Simulate registration
    login({
      id: '1',
      name: data.name,
      email: data.email,
      role: data.role,
    });
    navigate(data.role === 'freelancer' ? '/freelancer-dashboard' : '/client-dashboard');
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-secondary-light p-8 rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-display font-bold text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-accent-red">{errors.name.message}</p>
              )}
            </div>

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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-accent-red">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="mt-1 block w-full px-3 py-2 bg-secondary border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-accent-red">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex cursor-pointer">
                  <input
                    type="radio"
                    value="freelancer"
                    {...register('role')}
                    className="sr-only"
                  />
                  <div className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-gray-600 rounded-lg hover:border-primary transition-colors">
                    <span className="text-sm font-medium">Work as Freelancer</span>
                  </div>
                </label>
                <label className="relative flex cursor-pointer">
                  <input
                    type="radio"
                    value="client"
                    {...register('role')}
                    className="sr-only"
                  />
                  <div className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-gray-600 rounded-lg hover:border-primary transition-colors">
                    <span className="text-sm font-medium">Hire Talent</span>
                  </div>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-accent-red">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div>
            <button type="submit" className="w-full btn-primary">
              Create Account
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary-dark">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary-dark">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};