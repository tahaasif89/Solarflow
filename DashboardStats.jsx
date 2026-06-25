'use client';
import { motion } from 'framer-motion';
import { HiOutlineCurrencyRupee, HiOutlineShoppingCart, HiOutlineCube, HiOutlineExclamation } from 'react-icons/hi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatPKR } from '@/lib/utils';

const monthlyData = [
  { month: 'Jan', sales: 2850000 }, { month: 'Feb', sales: 3200000 },
  { month: 'Mar', sales: 3560000 }, { month: 'Apr', sales: 2980000 },
  { month: 'May', sales: 4120000 }, { month: 'Jun', sales: 3890000 },
  { month: 'Jul', sales: 4560000 }, { month: 'Aug', sales: 4230000 },
  { month: 'Sep', sales: 4890000 }, { month: 'Oct', sales: 5210000 },
  { month: 'Nov', sales: 5870000 }, { month: 'Dec', sales: 6240000 },
];

const recentOrders = [
  { id: 'SF-2401-0042', customer: 'Ahmed Khan', total: 185000, status: 'delivered', date: '2024-12-10' },
  { id: 'SF-2401-0041', customer: 'Fatima Ali', total: 64000, status: 'shipped', date: '2024-12-11' },
  { id: 'SF-2401-0040', customer: 'Bilal Hussain', total: 1250000, status: 'processing', date: '2024-12-12' },
  { id: 'SF-2401-0039', customer: 'Aisha Malik', total: 245000, status: 'pending', date: '2024-12-12' },
];

const statusColors = {
  delivered: 'bg-green-100 text-green-700', shipped: 'bg-blue-100 text-blue-700',
  processing: 'bg-yellow-100 text-yellow-700', pending: 'bg-orange-100 text-orange-700',
};

export default function DashboardContent() {
  const stats = [
    { title: 'Total Revenue', value: formatPKR(51620000), change: '+12.5%', icon: HiOutlineCurrencyRupee, color: 'bg-green-50 text-green-600' },
    { title: 'Total Orders', value: '342', change: '+8.2%', icon: HiOutlineShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { title: 'Active Products', value: '48', change: '52 total', icon: HiOutlineCube, color: 'bg-purple-50 text-purple-600' },
    { title: 'Low Stock', value: '3', change: 'Action needed', icon: HiOutlineExclamation, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-2xl" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-heading font-bold text-gray-800 mb-2">Monthly Revenue (PKR)</h3>
        <p className="text-sm text-gray-400 mb-6">Sales performance over 12 months</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v) => formatPKR(v)} contentStyle={{ background: '#0a1030', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="sales" stroke="#FFD700" strokeWidth={2.5} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-lg font-heading font-bold text-gray-800">Recent Orders</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-semibold text-solar-gold-dark">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{formatPKR(order.total)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

function HiOutlineCurrencyRupee(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} className={`w-6 h-6 ${props.className || ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-6h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>;
}