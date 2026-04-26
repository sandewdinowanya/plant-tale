'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { signInWithEmail } from '../firebase/auth';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmail(form.email, form.password);
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle Firebase-specific errors
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Failed to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogleSafely = async () => {
    const authModule = await import('../firebase/auth');
    const googleSignIn = (authModule as any).signInWithGoogle;

    if (typeof googleSignIn !== 'function') {
      throw { code: 'auth/google-not-configured' };
    }

    return googleSignIn();
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await signInWithGoogleSafely();
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Google login error:', err);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login cancelled');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup blocked. Please allow popups for this site.');
      } else if (err.code === 'auth/google-not-configured') {
        setError('Google login is not configured yet.');
      } else {
        setError('Failed to login with Google. Please try again.');
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
          <h2 className="text-primary text-[1.8rem] mb-2">Welcome back to Plant Tale!</h2>
          <p className="text-text-light text-base">Let&apos;s take care of your garden together.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg text-base transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Options */}
          <div className="flex justify-between items-center my-2 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
                className="accent-primary"
              />
              <label htmlFor="remember" className="text-text-dark">Remember me</label>
            </div>
            <Link href="/forgot-password" className="text-primary font-medium hover:text-green-dark hover:underline transition-colors duration-300">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white border-none rounded-lg py-3.5 text-base font-semibold cursor-pointer transition-all duration-300 mt-4 hover:bg-green-dark active:translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 text-text-light">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="px-4 text-sm">or login with</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Social */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-300 bg-white font-medium cursor-pointer transition-colors duration-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <FaGoogle /> Google
          </button>
        </div>

        {/* Redirect */}
        <div className="text-center mt-4 text-text-light">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-medium hover:text-green-dark hover:underline transition-colors duration-300">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Quote */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200 text-text-light italic text-sm">
          &quot;The best time to plant a tree was 20 years ago. The second best time is now.&quot;
        </div>
      </div>
    </div>
  );
};

export default Login;