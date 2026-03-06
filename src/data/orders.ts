export interface Order {
    id: string;
    customerName: string;
    carName: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    date: string; // Booking date
}

export const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        carName: 'Tesla Model S Plaid',
        startDate: '2023-10-15',
        endDate: '2023-10-18',
        totalPrice: 450,
        status: 'Confirmed',
        date: '2023-10-10',
    },
    {
        id: 'ORD-002',
        customerName: 'Alice Smith',
        carName: 'Porsche 911 Carrera',
        startDate: '2023-11-05',
        endDate: '2023-11-07',
        totalPrice: 700,
        status: 'Pending',
        date: '2023-11-01',
    },
    {
        id: 'ORD-003',
        customerName: 'Robert Johnson',
        carName: 'Mercedes-Benz S-Class',
        startDate: '2023-09-20',
        endDate: '2023-09-25',
        totalPrice: 1250,
        status: 'Completed',
        date: '2023-09-15',
    },
    {
        id: 'ORD-004',
        customerName: 'Emily Davis',
        carName: 'BMW i7',
        startDate: '2023-12-01',
        endDate: '2023-12-03',
        totalPrice: 600,
        status: 'Cancelled',
        date: '2023-11-28',
    },
    {
        id: 'ORD-005',
        customerName: 'Michael Wilson',
        carName: 'Audi e-tron GT',
        startDate: '2024-01-10',
        endDate: '2024-01-15',
        totalPrice: 1100,
        status: 'Confirmed',
        date: '2024-01-05',
    },
];
