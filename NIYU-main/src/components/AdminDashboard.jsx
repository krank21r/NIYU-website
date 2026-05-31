import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_PASSWORD = 'niyu2024'

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatTime(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function formatItems(items) {
  if (!items || !items.length) return '-'
  return items.map(i => `${i.name} (${i.size}) x${i.qty}`).join(', ')
}

function StatusBadge({ status }) {
  const colors = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status || 'pending'}
    </span>
  )
}

function StatusSelect({ status, orderId, onUpdate }) {
  const [updating, setUpdating] = useState(false)
  const colors = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    delivered: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  }

  const handleChange = async (newStatus) => {
    if (newStatus === status) return
    setUpdating(true)
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
    if (error) {
      console.error('[NIYU Admin] Update failed:', error)
      alert('Failed to update status: ' + error.message)
    } else {
      onUpdate(orderId, newStatus)
    }
    setUpdating(false)
  }

  return (
    <select
      value={status || 'pending'}
      onChange={(e) => handleChange(e.target.value)}
      disabled={updating}
      className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer focus:outline-none ${colors[status] || 'bg-gray-100 text-gray-600 border-gray-200'} ${updating ? 'opacity-50' : ''}`}
    >
      <option value="pending">pending</option>
      <option value="confirmed">confirmed</option>
      <option value="delivered">delivered</option>
      <option value="cancelled">cancelled</option>
    </select>
  )
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('niyu-admin') === 'true')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('niyu-admin', 'true')
      setAuthenticated(true)
    } else {
      setError('Wrong password')
    }
  }

  useEffect(() => {
    if (!authenticated) return

    async function fetchOrders() {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        console.error('[NIYU Admin] Fetch error:', error)
        setFetchError(error.message)
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [authenticated])

  // Password gate
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl text-ink mb-1">NIYU Admin</h1>
            <p className="text-sm text-ink-subtle font-body">Enter password to view orders</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-ink font-body text-sm focus:outline-none focus:border-gold/50"
            />
            {error && <p className="text-red-500 text-xs font-body">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-ink text-ivory rounded-lg font-body text-sm tracking-wide hover:bg-ink/90 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Orders dashboard
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-gold/10 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-ink">NIYU Orders</h1>
            <p className="text-xs text-ink-subtle font-body">{orders.length} total orders</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('niyu-admin'); setAuthenticated(false) }}
            className="text-xs text-ink-subtle hover:text-ink font-body transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        )}

        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm font-body font-medium">Failed to load orders</p>
            <p className="text-red-500 text-xs font-body mt-1">{fetchError}</p>
            <p className="text-red-500 text-xs font-body mt-2">
              Make sure the Supabase "orders" table allows read access (check RLS policies in your Supabase dashboard).
            </p>
          </div>
        )}

        {!loading && !fetchError && orders.length === 0 && (
          <div className="text-center py-20">
            <p className="text-ink-subtle font-body text-sm">No orders yet</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">ORDER</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">DATE</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">CUSTOMER</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">PHONE</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">ADDRESS</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">ITEMS</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">UTR</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide text-right">TOTAL</th>
                    <th className="pb-3 text-xs font-body font-medium text-ink-subtle tracking-wide">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id || order.orderId} className="border-b border-gold/5 hover:bg-gold/[0.02] transition-colors">
                      <td className="py-3 text-xs font-body text-ink font-medium">{order.orderId || order.id}</td>
                      <td className="py-3">
                        <div className="text-xs font-body text-ink">{formatDate(order.created_at || order.createdAt)}</div>
                        <div className="text-xs font-body text-ink-subtle">{formatTime(order.created_at || order.createdAt)}</div>
                      </td>
                      <td className="py-3 text-xs font-body text-ink">{order.customer_name}</td>
                      <td className="py-3 text-xs font-body text-ink-subtle">{order.phone}</td>
                      <td className="py-3 text-xs font-body text-ink-subtle max-w-[200px] truncate" title={`${order.address || ''}, ${order.pincode || ''}`}>{order.address}, {order.pincode}</td>
                      <td className="py-3 text-xs font-body text-ink max-w-xs truncate" title={formatItems(order.items)}>
                        {formatItems(order.items)}
                      </td>
                      <td className="py-3 text-xs font-body text-ink-subtle font-mono">{order.transaction_ref || '-'}</td>
                      <td className="py-3 text-xs font-body text-ink text-right font-medium">₹{order.subtotal?.toLocaleString('en-IN')}</td>
                      <td className="py-3"><StatusSelect status={order.status} orderId={order.id} onUpdate={handleStatusUpdate} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {orders.map((order) => (
                <div key={order.id || order.orderId} className="bg-white rounded-lg border border-gold/10 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-body font-medium text-ink">{order.orderId || order.id}</p>
                      <p className="text-xs font-body text-ink-subtle">{formatDate(order.created_at || order.createdAt)} {formatTime(order.created_at || order.createdAt)}</p>
                    </div>
                    <StatusSelect status={order.status} orderId={order.id} onUpdate={handleStatusUpdate} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-body text-ink">{order.customer_name} — {order.phone}</p>
                    <p className="text-xs font-body text-ink-subtle">{formatItems(order.items)}</p>
                    {order.transaction_ref && <p className="text-xs font-body text-ink-subtle font-mono">UTR: {order.transaction_ref}</p>}
                    <p className="text-xs font-body text-ink font-medium">₹{order.subtotal?.toLocaleString('en-IN')}</p>
                  </div>
                  {order.address && (
                    <p className="text-xs font-body text-ink-subtle mt-2 pt-2 border-t border-gold/5">{order.address}, {order.pincode}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
