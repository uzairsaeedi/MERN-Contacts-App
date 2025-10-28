import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import api from '../api/axiosConfig'
import { useAuth } from '../context/useAuth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()

    const handle = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/api/users/login', { email, password })
            const token = res.data.accessToken
            const expiryMs = Date.now() + 30 * 60 * 1000
            const userRes = await api.get('/api/users/current', {
                headers: { Authorization: `Bearer ${token}` },
            })
            const user = userRes.data
            auth.login(token, expiryMs, user)
            toast.success('Logged in successfully!')
            console.log('Navigating to home...')
            navigate('/')

        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Poppins', sans-serif",
                color: '#111827',
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(18px)',
                    borderRadius: '20px',
                    boxShadow: '0 6px 30px rgba(0, 0, 0, 0.15)',
                    width: '90%',
                    maxWidth: '420px',
                    padding: '45px 35px',
                    border: '1px solid rgba(255,255,255,0.4)',
                    transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '0 6px 35px rgba(79,70,229,0.25)')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.15)')
                }
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div
                        style={{
                            background:
                                'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            width: '65px',
                            height: '65px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 15px',
                            boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
                        }}
                    >
                        <LogIn size={28} color="white" />
                    </div>
                    <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1e293b' }}>
                        Welcome Back 👋
                    </h2>
                    {/* <p style={{ fontSize: '15px', color: '#475569' }}>
                        Sign in to continue
                    </p> */}
                </div>

                <form onSubmit={handle}>
                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                        <label style={{ fontSize: '14px', color: '#334155' }}>Email</label>
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
                                paddingRight: '42px', // keeps structure same as password input
                                borderRadius: '12px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: '#111827',
                                outline: 'none',
                                fontSize: '15px',
                                transition: '0.3s',
                                boxSizing: 'border-box', // ensures padding doesn’t break width
                            }}
                            onFocus={(e) => {
                                e.target.style.border = '1px solid #6366f1'
                                e.target.style.backgroundColor = '#fff'
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1px solid #cbd5e1'
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.9)'
                            }}
                        />
                    </div>


                    <div style={{ marginBottom: '25px', position: 'relative' }}>
                        <label style={{ fontSize: '14px', color: '#374151' }}>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                            style={{
                                width: '100%',
                                marginTop: '8px',
                                padding: '12px 14px',
                                paddingRight: '42px', // keeps space for icon
                                borderRadius: '12px',
                                border: '1px solid #cbd5e1',
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                color: '#111827',
                                outline: 'none',
                                fontSize: '15px',
                                transition: '0.3s',
                                boxSizing: 'border-box', // ensures width includes padding
                            }}
                            onFocus={(e) => {
                                e.target.style.border = '1px solid #6366f1'
                                e.target.style.backgroundColor = '#fff'
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1px solid #cbd5e1'
                                e.target.style.backgroundColor = 'rgba(255,255,255,0.9)'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '38px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280',
                            }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px 0',
                            borderRadius: '12px',
                            border: 'none',
                            background:
                                'linear-gradient(90deg, #6366f1, #8b5cf6)',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 18px rgba(99,102,241,0.4)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) =>
                        (e.target.style.boxShadow =
                            '0 6px 25px rgba(99,102,241,0.5)')
                        }
                        onMouseOut={(e) =>
                        (e.target.style.boxShadow =
                            '0 4px 18px rgba(99,102,241,0.4)')
                        }
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            fontSize: '14px',
                            color: '#475569',
                        }}
                    >
                        Don’t have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            style={{
                                color: '#6366f1',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                        >
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}
