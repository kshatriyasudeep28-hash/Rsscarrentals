export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    image: string;
    transmission: 'Automatic' | 'Manual';
    seats: number;
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    features: string[];
}
