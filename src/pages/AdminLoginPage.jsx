import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/siteData';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();
    const adminEmail = (WHATSAPP_CONFIG.ADMIN_EMAIL || 'admin@galaxymarble.com').toLowerCase();

    // Allows username: "admin" or email: "admin@galaxymarble.com"
    // Allows password: "12345" or "admin123"
    const isValidUser = cleanUser === 'admin' || cleanUser === adminEmail;
    const isValidPass = cleanPass === '12345' || cleanPass === 'admin123' || cleanPass === 'admin@123';

    if (isValidUser && isValidPass) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('gm_admin_auth', 'true');
        localStorage.setItem('gm_admin_email', cleanUser);
        navigate('/admin');
      }, 400);
    } else {
      setError('Invalid Admin username or password. (Username: admin | Password: 12345)');
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
              Sign in with your admin credentials to manage products and categories.
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
              <label htmlFor="admin-username">Admin Username</label>
              <div className="admin-input-wrap-white">
                <User size={16} className="admin-icon-white" />
                <input 
                  id="admin-username"
                  type="text" 
                  required
                  placeholder="Enter username (e.g. admin)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoCapitalize="none"
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
                  placeholder="Enter password (e.g. 12345)"
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
