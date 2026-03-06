'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { orders, Order } from '@/data/orders';
import { LogOut, Search, Filter, Gem, TrendingUp, Users, Car, IndianRupee } from 'lucide-react';

const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    Confirmed: { bg: 'rgba(52,211,153,0.12)', color: '#34d399' },
    Pending: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
    Completed: { bg: 'rgba(96,165,250,0.12)', color: '#60a5fa' },
    Cancelled: { bg: 'rgba(239,68,68,0.12)', color: '#f87171' },
};

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('admin_token='));
        if (!token) router.push('/admin/login');
        else setIsAuthenticated(true);
    }, [router]);

    const handleLogout = () => {
        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    };

    const filteredOrders: Order[] = orders.filter(order => {
        const matchesSearch =
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
    const confirmedCount = orders.filter(o => o.status === 'Confirmed').length;

    const stats = [
        { icon: IndianRupee, label: 'Total Revenue', value: formatINR(totalRevenue) },
        { icon: Car, label: 'Total Bookings', value: orders.length.toString() },
        { icon: Users, label: 'Confirmed', value: confirmedCount.toString() },
        { icon: TrendingUp, label: 'Completion Rate', value: `${Math.round((orders.filter(o => o.status === 'Completed').length / orders.length) * 100)}%` },
    ];

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            {/* Topbar */}
            <header
                className="sticky top-0 z-40 border-b backdrop-blur-xl"
                style={{
                    background: 'rgba(10,10,15,0.85)',
                    borderColor: 'rgba(255,255,255,0.06)',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--primary-gradient)' }}
                        >
                            <Gem className="h-4 w-4" style={{ color: '#0a0a0f' }} />
                        </div>
                        <div>
                            <span className="font-bold text-white text-sm">Carvelle Admin</span>
                            <span className="hidden sm:inline text-xs ml-2" style={{ color: 'rgba(240,237,232,0.35)' }}>
                                Dashboard
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm hidden sm:block" style={{ color: 'rgba(240,237,232,0.4)' }}>
                            Welcome, Admin
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                            style={{
                                background: 'rgba(239,68,68,0.08)',
                                border: '1px solid rgba(239,68,68,0.2)',
                                color: '#f87171',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)';
                            }}
                        >
                            <LogOut className="h-4 w-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Page title */}
                <div className="mb-10">
                    <p className="section-label mb-1">Carvelle Management</p>
                    <h1 className="text-3xl font-extrabold text-white">Booking Dashboard</h1>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {stats.map(({ icon: Icon, label, value }) => (
                        <div
                            key={label}
                            className="p-5 rounded-2xl"
                            style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                                style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                            >
                                <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                            </div>
                            <div className="text-2xl font-extrabold text-white mb-1">{value}</div>
                            <div className="text-xs" style={{ color: 'rgba(240,237,232,0.4)' }}>{label}</div>
                        </div>
                    ))}
                </div>

                {/* Orders table */}
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    {/* Table header / controls */}
                    <div
                        className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <div>
                            <h2 className="text-lg font-bold text-white">Order History</h2>
                            <p className="text-sm" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                {filteredOrders.length} booking{filteredOrders.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 sm:flex-initial">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(240,237,232,0.3)' }} />
                                <input
                                    type="text"
                                    placeholder="Search orders…"
                                    className="pl-9 pr-4 py-2.5 rounded-xl text-sm w-full sm:w-52 outline-none transition-all"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'var(--foreground)',
                                    }}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                                />
                            </div>
                            {/* Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" style={{ color: 'rgba(240,237,232,0.3)' }} />
                                <select
                                    className="pl-9 pr-4 py-2.5 rounded-xl text-sm appearance-none outline-none cursor-pointer transition-all"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'rgba(240,237,232,0.7)',
                                    }}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map(s => (
                                        <option key={s} value={s} style={{ background: '#111118' }}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    {['Order ID', 'Customer', 'Vehicle', 'Dates', 'Total', 'Status'].map(h => (
                                        <th
                                            key={h}
                                            className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                            style={{ color: 'rgba(240,237,232,0.4)' }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, idx) => (
                                    <tr
                                        key={order.id}
                                        className="transition-colors"
                                        style={{
                                            borderBottom: idx < filteredOrders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.025)';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                                        }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono" style={{ color: 'var(--primary)' }}>
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                            {order.customerName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'rgba(240,237,232,0.7)' }}>
                                            {order.carName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'rgba(240,237,232,0.55)' }}>
                                            <div>{order.startDate}</div>
                                            <div className="text-xs" style={{ color: 'rgba(240,237,232,0.35)' }}>
                                                to {order.endDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                                            {formatINR(order.totalPrice)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                                style={STATUS_COLORS[order.status] ?? { bg: 'rgba(255,255,255,0.08)', color: 'rgba(240,237,232,0.6)' }}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredOrders.length === 0 && (
                            <div className="py-16 text-center">
                                <p className="text-4xl mb-3">📋</p>
                                <p className="font-semibold text-white mb-1">No orders found</p>
                                <p className="text-sm" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                    Try adjusting your search or filter.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
