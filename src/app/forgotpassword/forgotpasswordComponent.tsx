'use client'
import React, { useState } from 'react';
import axios from 'axios';
export function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const verifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log('email:', email);
      const response = await axios.get(`${apiUrl}/api/auth/email-verification/${email}`);
      if (response.status === 200) {
        setIsValidEmail(true);
      }
    } catch (error) {
      console.error('Email verification failed:', error);
      setErrorMessage('User not found. Please try again.');
    }
  };

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${apiUrl}/api/auth/reset-password`, {
        email,
        newPassword,
      });
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      setErrorMessage('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Forgot your password?</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {success && <p className="text-green-500">Password reset successful. Please login.</p>}
      <form onSubmit={isValidEmail ? resetPassword : verifyEmail} className="w-full max-w-sm">
        {!isValidEmail && (
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
                id="inline-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}
        {isValidEmail && (
          <>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-new-password">
                  New Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
                  id="inline-new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-verify-password">
                  Verify Password
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
                  id="inline-verify-password"
                  type="password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>
            </div>
          </>
        )}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {isValidEmail ? 'Submit New Password' : 'Reset Password'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
