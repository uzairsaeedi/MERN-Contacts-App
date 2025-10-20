import React, { useState } from 'react'
import api from '../api/axiosConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/users/register', { username, email, password })
      toast.success('Registered successfully! Please login.')
      navigate('/login')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f0f4ff 0%, #e5e7ff 50%, #f8faff 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(25px)',
          borderRadius: '20px',
          boxShadow: '0 8px 25px rgba(79, 70, 229, 0.2)',
          width: '90%',
          maxWidth: '420px',
          padding: '50px 35px',
          border: '1px solid rgba(99,102,241,0.1)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = '0 8px 40px rgba(79,70,229,0.4)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = '0 8px 25px rgba(79,70,229,0.2)')
        }
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 4px 25px rgba(99,102,241,0.4)',
            }}
          >
            <UserPlus size={30} color="white" />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e1b4b' }}>
            Create Account ✨
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280' }}>
            Join us and get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', color: '#374151' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                color: '#111827',
                fontSize: '15px',
                outline: 'none',
                transition: '0.3s',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #6366f1'
                e.target.style.backgroundColor = 'white'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid #d1d5db'
                e.target.style.backgroundColor = '#f9fafb'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', color: '#374151' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                color: '#111827',
                fontSize: '15px',
                outline: 'none',
                transition: '0.3s',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #6366f1'
                e.target.style.backgroundColor = 'white'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid #d1d5db'
                e.target.style.backgroundColor = '#f9fafb'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ fontSize: '14px', color: '#374151' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                backgroundColor: '#f9fafb',
                color: '#111827',
                fontSize: '15px',
                outline: 'none',
                transition: '0.3s',
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid #6366f1'
                e.target.style.backgroundColor = 'white'
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid #d1d5db'
                e.target.style.backgroundColor = '#f9fafb'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,0.5)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow =
                '0 6px 25px rgba(147,51,234,0.7)')
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow =
                '0 4px 20px rgba(99,102,241,0.5)')
            }
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p
            style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{
                color: '#6366f1',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
