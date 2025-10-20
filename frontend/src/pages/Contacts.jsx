import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import ContactForm from '../components/ContactForm'
import { useAuth } from '../context/useAuth'
import { PlusCircle, Edit3, Trash2, Users } from 'lucide-react'

export default function Contacts() {
  const { api } = useAuth()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/contacts/getAll')
      setContacts(res.data)
    } catch (err) {
      setError('Failed to load contacts')
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const onSaved = (contact, isNew) => {
    if (isNew) setContacts((c) => [contact, ...c])
    else setContacts((c) => c.map((x) => (x._id === contact._id ? contact : x)))
    setOpen(false)
  }

  const del = async (id) => {
    if (!window.confirm('Confirm delete?')) return
    try {
      await api.delete(`/api/contacts/delete/${id}`)
      setContacts((c) => c.filter((x) => x._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f0f4ff 0%, #e8ebff 50%, #f8faff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: '#1e1b4b',
        }}
      >
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
          <Users size={32} color="white" />
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: '700' }}>My Contacts</h2>
        <p style={{ color: '#6b7280' }}>Manage your personal and business connections</p>
      </div>

      <button
        onClick={() => {
          setEditing(null)
          setOpen(true)
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          fontWeight: '600',
          fontSize: '15px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(99,102,241,0.5)',
          transition: 'all 0.3s ease',
          marginBottom: '25px',
        }}
        onMouseOver={(e) =>
          (e.target.style.boxShadow = '0 6px 20px rgba(147,51,234,0.7)')
        }
        onMouseOut={(e) =>
          (e.target.style.boxShadow = '0 4px 15px rgba(99,102,241,0.5)')
        }
      >
        <PlusCircle size={20} style={{ marginRight: 5 }} /> Add Contact
      </button>

      {loading && (
        <div style={{ color: '#4f46e5', fontWeight: '500' }}>Loading contacts...</div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 320px))',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '900px',
        }}
      >

        {contacts.map((c) => (
          <div
            key={c._id}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(15px)',
              borderRadius: '16px',
              boxShadow: '0 6px 20px rgba(99,102,241,0.15)',
              padding: '20px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(99,102,241,0.1)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.3)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.15)')
            }
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div style={{ fontWeight: '600', fontSize: '18px', color: '#1e1b4b' }}>
                  {c.name}
                </div>
                <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
                  {c.email} • {c.phone}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => {
                    setEditing(c)
                    setOpen(true)
                  }}
                  style={{
                    backgroundColor: '#eef2ff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    color: '#4f46e5',
                    fontWeight: '500',
                    transition: '0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#e0e7ff')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#eef2ff')}
                >
                  <Edit3 size={15} /> Edit
                </button>

                <button
                  onClick={() => del(c._id)}
                  style={{
                    backgroundColor: '#fee2e2',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    color: '#dc2626',
                    fontWeight: '500',
                    transition: '0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#fecaca')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#fee2e2')}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ContactForm
          initial={editing}
          onCancel={() => setOpen(false)}
          onSaved={onSaved}
          api={api}
        />
      </Modal>
    </div>
  )
}
