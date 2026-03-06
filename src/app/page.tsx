import Link from "next/link";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import { cars } from "@/data/cars";
import { ArrowRight, MapPin, Calendar, Car as CarIcon, ShieldCheck, Star, Zap } from "lucide-react";

export default function Home() {
  const featuredCars = cars.slice(0, 3);

  const steps = [
    {
      icon: MapPin,
      number: "01",
      title: "Choose Location",
      desc: "Select your pick-up city or airport from our growing network of premium locations.",
    },
    {
      icon: Calendar,
      number: "02",
      title: "Pick Your Dates",
      desc: "Choose your rental period — whether it's a weekend escape or a month-long journey.",
    },
    {
      icon: CarIcon,
      number: "03",
      title: "Drive & Enjoy",
      desc: "Confirm your booking instantly and get behind the wheel of your dream car.",
    },
  ];

  const stats = [
    { icon: CarIcon, value: "200+", label: "Luxury Vehicles" },
    { icon: Star, value: "4.9 ★", label: "Average Rating" },
    { icon: ShieldCheck, value: "100%", label: "Verified Owners" },
    { icon: Zap, value: "24/7", label: "Support" },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--background)' }}>
      <Hero />

      {/* ===== Stats Bar ===== */}
      <section
        className="py-10 border-y"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'var(--surface)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4 justify-center md:justify-start">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs" style={{ color: 'rgba(240,237,232,0.45)' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Cars ===== */}
      <section className="py-24" style={{ background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="section-label">Hand-Picked Selection</p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Featured Vehicles
              </h2>
              <p className="text-lg max-w-xl" style={{ color: 'rgba(240,237,232,0.5)' }}>
                Discover our curated collection of extraordinary machines, each verified and ready to drive.
              </p>
            </div>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors whitespace-nowrap"
              style={{ color: 'var(--primary)' }}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/cars">
              <button
                className="btn-amber inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold amber-glow"
              >
                Explore Entire Fleet <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section id="how-it-works" className="py-24" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <p className="section-label">Simple & Fast</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              How It Works
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(240,237,232,0.5)' }}>
              Renting a luxury car has never been this effortless. Three steps to your extraordinary drive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="hover-step group relative p-8 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Number */}
                <div
                  className="text-7xl font-black mb-6 select-none"
                  style={{ color: 'rgba(201,169,110,0.08)', lineHeight: 1 }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                >
                  <step.icon className="w-7 h-7" style={{ color: 'var(--primary)' }} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.5)' }}>
                  {step.desc}
                </p>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-16 -right-4 w-8 h-px"
                    style={{ background: 'linear-gradient(to right, rgba(201,169,110,0.3), transparent)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(201,169,110,0.04) 100%)',
              border: '1px solid rgba(201,169,110,0.2)',
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10 space-y-6">
              <p className="section-label">Ready to Drive?</p>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white">
                Your Dream Car<br />
                <span style={{ color: 'var(--primary)' }}>Awaits You.</span>
              </h2>
              <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(240,237,232,0.55)' }}>
                Join thousands of satisfied drivers who've experienced the thrill of driving the world's finest vehicles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/cars">
                  <button className="btn-amber px-10 py-4 rounded-full text-base font-semibold amber-glow">
                    Browse Fleet
                  </button>
                </Link>
                <Link href="/register">
                  <button
                    className="px-10 py-4 rounded-full text-base font-semibold border transition-all duration-300 hover:bg-white/5"
                    style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(240,237,232,0.75)' }}
                  >
                    Create Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
