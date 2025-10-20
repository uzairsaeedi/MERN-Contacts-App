import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Contacts from './pages/Contacts'
import AuthProvider from './context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-100">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={2000} />
        </main>
      </div>
    </AuthProvider>
  )
}