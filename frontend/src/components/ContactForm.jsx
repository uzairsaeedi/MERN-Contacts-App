import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UserPlus, UserCheck } from 'lucide-react'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
})

export default function ContactForm({ initial = null, onCancel, onSaved, api }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initial || { name: '', email: '', phone: '' },
  })

  const onSubmit = async (data) => {
    try {
      if (initial) {
        const res = await api.put(`/api/contacts/update/${initial._id}`, data)
        onSaved(res.data, false)
      } else {
        const res = await api.post('/api/contacts/createContact', data)
        onSaved(res.data, true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8ebff 50%, #f8faff 100%)',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(99,102,241,0.15)',
        padding: '30px 25px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: "'Poppins', sans-serif",
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#1e1b4b',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            boxShadow: '0 4px 25px rgba(99,102,241,0.3)',
          }}
        >
          {initial ? (
            <UserCheck size={28} color="white" />
          ) : (
            <UserPlus size={28} color="white" />
          )}
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>
          {initial ? 'Update Contact' : 'Add New Contact'}
        </h2>
        <p style={{ color: '#6b7280' }}>
          {initial
            ? 'Edit contact details below'
            : 'Fill out the details to create a contact'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <input
            {...register('name')}
            placeholder="Full Name"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(99,102,241,0.2)',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(99,102,241,0.05)',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
            {errors.name?.message}
          </p>
        </div>

        <div>
          <input
            {...register('email')}
            placeholder="Email Address"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(99,102,241,0.2)',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(99,102,241,0.05)',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
            {errors.email?.message}
          </p>
        </div>

        <div>
          <input
            {...register('phone')}
            placeholder="Phone Number"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(99,102,241,0.2)',
              backgroundColor: 'white',
              boxShadow: '0 2px 8px rgba(99,102,241,0.05)',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
            {errors.phone?.message}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: '#eef2ff',
              color: '#4f46e5',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#e0e7ff')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#eef2ff')}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
              color: 'white',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) =>
              (e.target.style.boxShadow = '0 6px 18px rgba(147,51,234,0.6)')
            }
            onMouseOut={(e) =>
              (e.target.style.boxShadow = '0 4px 12px rgba(99,102,241,0.4)')
            }
          >
            {isSubmitting
              ? 'Saving...'
              : initial
              ? 'Update Contact'
              : 'Create Contact'}
          </button>
        </div>
      </form>
    </div>
  )
}
