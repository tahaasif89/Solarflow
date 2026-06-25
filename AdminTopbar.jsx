'use client';
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';

export default function AdminTopbar({ title, subtitle }) {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." className="input-field pl-10 w-64" />
          </div>
          <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100">
            <HiOutlineBell className="text-xl text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-solar-gold rounded-full" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-solar-gold to-yellow-600 flex items-center justify-center text-navy-950 font-bold text-sm">A</div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}