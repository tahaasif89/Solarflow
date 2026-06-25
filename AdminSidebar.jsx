'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BsSun } from 'react-icons/bs';
import {
  HiOutlineHome, HiOutlineCube, HiOutlineTag, HiOutlineShoppingCart,
  HiOutlineChartBar, HiOutlineCog, HiOutlineLogout,
  HiOutlineChevronLeft, HiOutlineChevronRight,
} from 'react-icons/hi';

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { name: 'Dashboard', path: '/admin', icon: HiOutlineHome },
    { name: 'Products', path: '/admin/products', icon: HiOutlineCube },
    { name: 'Categories', path: '/admin/categories', icon: HiOutlineTag },
    { name: 'Orders', path: '/admin/orders', icon: HiOutlineShoppingCart },
    { name: 'Analytics', path: '/admin/analytics', icon: HiOutlineChartBar },
    { name: 'Settings', path: '/admin/settings', icon: HiOutlineCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sf-admin');
    router.push('/admin/login');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-full bg-navy-950 text-white z-50 flex flex-col shadow-2xl"
    >
      <div className="p-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solar-gold to-yellow-600 flex items-center justify-center flex-shrink-0">
          <BsSun className="text-navy-950 text-xl" />
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-heading text-lg font-bold whitespace-nowrap">
            Solar<span className="text-solar-gold">Flow</span>
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto admin-scroll">
        {!collapsed && <p className="text-[10px] uppercase tracking-wider text-gray-600 font-semibold px-3 mb-3">Menu</p>}
        {items.map((item) => (
          <Link key={item.path} href={item.path}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all relative group ${
              pathname === item.path ? 'bg-solar-gold/20 text-solar-gold' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}>
            <item.icon className="text-xl flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
            {collapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-navy-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                {item.name}
              </div>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-2">
        <button onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all w-full">
          {collapsed ? <HiOutlineChevronRight className="text-xl" /> : <><HiOutlineChevronLeft className="text-xl" /><span>Collapse</span></>}
        </button>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all w-full">
          <HiOutlineLogout className="text-xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}