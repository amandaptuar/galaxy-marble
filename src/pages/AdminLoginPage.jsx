import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/siteData';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const adminEmail = (WHATSAPP_CONFIG.ADMIN_EMAIL || 'admin@galaxymarble.com').toLowerCase();
    
    if (email.trim().toLowerCase() === adminEmail && (password === 'admin123' || password === 'admin@123')) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('gm_admin_auth', 'true');
        localStorage.setItem('gm_admin_email', email.trim());
        navigate('/admin');
      }, 500);
    } else {
      setError('Invalid Admin email or password. Please try again.');
    }
  };

  return (
    <div className="admin-login-page-wrap-white">
      <div className="container admin-login-container">
        {/* Return to website */}
        <Link to="/" className="admin-back-link-white">
          <ArrowLeft size={16} />
          <span>Return to Website</span>
        </Link>

        <div className="admin-auth-card-white">
          <div className="admin-card-header-white">
            <div className="admin-brand-icon-white">
              <ShieldCheck size={28} className="text-gold" />
            </div>
            <span className="admin-sub-tag-white">ADMIN PORTAL</span>
            <h1 className="admin-title-white">Admin Sign In</h1>
            <p className="admin-desc-white">
              Sign in with administrative email & password to manage products and customer queries.
            </p>
          </div>

          {error && (
            <div className="admin-alert-white error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form-white">
            <div className="admin-field-white">
              <label htmlFor="admin-email">Admin Email</label>
              <div className="admin-input-wrap-white">
                <Mail size={16} className="admin-icon-white" />
                <input 
                  id="admin-email"
                  type="email"
                  required
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="admin-field-white">
              <label htmlFor="admin-pass">Password</label>
              <div className="admin-input-wrap-white">
                <Lock size={16} className="admin-icon-white" />
                <input 
                  id="admin-pass"
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-admin-white-submit"
              disabled={loading}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In To Admin'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
