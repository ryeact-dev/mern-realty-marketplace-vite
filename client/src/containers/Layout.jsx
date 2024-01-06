import Footer from '@/common/Footer';
import Header from '@/common/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main>
      <Header />
      <section className='mb-10'>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
}
