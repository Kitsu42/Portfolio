import { Outlet, ScrollRestoration } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#070B14', color: '#E2E8F0' }}>
      <ScrollRestoration />
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
