'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaUser, FaGoogle } from 'react-icons/fa';
import { signUpWithEmail } from '../firebase/auth';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const validateForm = (): boolean => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await signUpWithEmail(form.email, form.password, form.name);
      
      // Redirect to dashboard after successful signup
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      
      // Handle Firebase-specific errors
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');

    try {
      const authModule = await import('../firebase/auth');
      const googleSignupFn = ('signInWithGoogle' in authModule ? authModule['signInWithGoogle'] : null) as
        | (() => Promise<unknown>)
        | null;

      if (typeof googleSignupFn !== 'function') {
        setError('Google sign-up is not configured yet.');
        return;
      }

      await googleSignupFn();
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Google signup error:', err);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-up cancelled');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else {
        setError('Failed to sign up with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-[80vh] py-8 px-4 bg-ivory"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%233d9970' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C%2Fsvg%3E")`,
      }}
    >
      <div className="bg-white rounded-xl shadow-md w-full max-w-[480px] px-8 py-10 relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <Image src="/assets/logo.png" alt="logo" width={70} height={70} className="mx-auto mb-4" />
          <h2 className="text-primary text-[1.8rem] mb-2">Join Plant Tale!</h2>
          <p className="text-text-light text-base">Start your green journey today.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSignup}>
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="flex items-center gap-2 font-medium text-text-dark">
              <FaUser className="text-primary" /> Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="flex items-center gap-2 font-medium text-text-dark">
              <FaEnvelope className="text-primary" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="flex items-center gap-2 font-medium text-text-dark">
              <FaLock className="text-primary" /> Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="flex items-center gap-2 font-medium text-text-dark">
              <FaLock className="text-primary" /> Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white border-none rounded-lg py-3.5 text-base font-semibold cursor-pointer transition-all duration-300 mt-4 hover:bg-green-dark active:translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 text-text-light">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="px-4 text-sm">or sign up with</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Social */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-300 bg-white font-medium cursor-pointer transition-colors duration-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <FaGoogle /> Google
          </button>
        </div>

        {/* Redirect */}
        <div className="text-center mt-4 text-text-light">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:text-green-dark hover:underline transition-colors duration-300">
              Login
            </Link>
          </p>
        </div>

        {/* Quote */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200 text-text-light italic text-sm">
          &quot;A garden is a friend you can visit any time.&quot;
        </div>
      </div>
    </div>
  );
};

export default Signup;