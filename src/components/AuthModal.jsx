import React, { useState } from 'react';
import { X, Lock, Phone, User, AlertCircle, CheckCircle2, LogIn, UserPlus } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, showToast } = useStore();
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  // Form states - minimal fields only: Name, Phone, Password
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setPhone('');
    setPassword('');
    setFullName('');
    setError('');
    setSuccessMsg('');
  };

  const handleClose = () => {
    resetForm();
    setIsAuthModalOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!phone.trim() || !password.trim()) {
      setError('Please enter your phone number and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(phone, password);
      showToast(`Welcome back, ${user.full_name || 'User'}!`);
      handleClose();
    } catch (err) {
      setError(err.message || 'Invalid phone number or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setError('Please enter your name.');
      return;
    }
    const cleanPhone = phone.trim().replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        fullName: fullName.trim(),
        phone: cleanPhone,
        password: password
      });
      showToast(`Account created! Welcome, ${user.full_name}!`);
      handleClose();
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={handleClose}>
      <div 
        className="auth-modal-card-white" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          className="auth-modal-close-simple" 
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Brand & Tabs */}
        <div className="auth-white-header">
          <div className="auth-brand-pill">GALAXY MARBLE</div>
          <h2 className="auth-white-title">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="auth-white-sub">
            {tab === 'login' 
              ? 'Enter your phone number and password to continue.' 
              : 'Register once with your phone number to enquire and save products.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-white-tabs">
          <button 
            type="button"
            className={`auth-white-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-white-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setError(''); }}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-white-alert error">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="auth-white-alert success">
            <CheckCircle2 size={15} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form: ONLY PHONE & PASSWORD */}
        {tab === 'login' ? (
          <form className="auth-white-form" onSubmit={handleLoginSubmit}>
            <div className="auth-white-field">
              <label htmlFor="login-phone">Phone Number</label>
              <div className="auth-white-input-wrap">
                <Phone size={16} className="auth-white-icon" />
                <input 
                  id="login-phone"
                  type="tel"
                  placeholder="e.g. 9057206605"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className="auth-white-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-white-input-wrap">
                <Lock size={16} className="auth-white-icon" />
                <input 
                  id="login-password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-auth-white-submit"
              disabled={loading}
            >
              <LogIn size={18} />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>

            <div className="auth-white-footer">
              <span>New to Galaxy Marble?</span>
              <button 
                type="button" 
                className="auth-white-link"
                onClick={() => { setTab('register'); setError(''); }}
              >
                Register
              </button>
            </div>
          </form>
        ) : (
          /* Register Form: ONLY NAME, PHONE & PASSWORD */
          <form className="auth-white-form" onSubmit={handleRegisterSubmit}>
            <div className="auth-white-field">
              <label htmlFor="reg-name">Full Name</label>
              <div className="auth-white-input-wrap">
                <User size={16} className="auth-white-icon" />
                <input 
                  id="reg-name"
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-white-field">
              <label htmlFor="reg-phone">Phone Number</label>
              <div className="auth-white-input-wrap">
                <Phone size={16} className="auth-white-icon" />
                <input 
                  id="reg-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <div className="auth-white-field">
              <label htmlFor="reg-password">Password</label>
              <div className="auth-white-input-wrap">
                <Lock size={16} className="auth-white-icon" />
                <input 
                  id="reg-password"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-auth-white-submit"
              disabled={loading}
            >
              <UserPlus size={18} />
              <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            </button>

            <div className="auth-white-footer">
              <span>Already have an account?</span>
              <button 
                type="button" 
                className="auth-white-link"
                onClick={() => { setTab('login'); setError(''); }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
