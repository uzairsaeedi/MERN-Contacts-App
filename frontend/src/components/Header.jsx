import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut, FiUserPlus, FiLogIn, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/useAuth'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
    const { token, logout, user } = useAuth()
    const [open, setOpen] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(99,102,241,0.15)',
                boxShadow: '0 6px 20px rgba(99,102,241,0.1)',
                padding: '14px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <Link
                to="/"
                style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                }}
            >
                Contacts App
            </Link>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                {token ? (
                    <div
                        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    >
                        <div
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onClick={() => setOpen(!open)}
                            style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '20px',
                                cursor: 'pointer',
                                boxShadow: '0 4px 10px rgba(99,102,241,0.4)',
                                transition: 'all 0.3s ease',
                                marginRight: 50
                            }}
                        >
                            <FiUser />
                        </div>

                        <AnimatePresence>
                            {hovered && !open && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        top: '50px',
                                        right: '0',
                                        transform: 'translateX(-20%)',
                                        background: '#4f46e5',
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        whiteSpace: 'nowrap',
                                        boxShadow: '0 3px 10px rgba(99,102,241,0.4)',
                                        zIndex: 9999,
                                    }}
                                >
                                    {user?.username || 'User'}
                                </motion.div>
                            )}
                        </AnimatePresence>


                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    transition={{ duration: 0.25 }}
                                    style={{
                                        position: 'absolute',
                                        top: '60px',
                                        right: 0,
                                        background: 'white',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 30px rgba(99,102,241,0.15)',
                                        width: '220px',
                                        overflow: 'hidden',
                                        zIndex: 100,
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    <div
                                        style={{
                                            background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
                                            padding: '14px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                color: '#4f46e5',
                                            }}
                                        >
                                            {user?.username}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#6b7280' }}>
                                            {user?.email}
                                        </div>
                                    </div>

                                    <button
                                        onClick={logout}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#ef4444',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            fontWeight: '600',
                                            padding: '10px 0',
                                            cursor: 'pointer',
                                            borderTop: '1px solid #f3f4f6',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.background = '#fef2f2')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = 'transparent')
                                        }
                                    >
                                        <FiLogOut size={18} /> Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <></>
                )}
            </nav>
        </header>
    )
}
