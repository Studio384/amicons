import { Outlet } from 'react-router';

import ScrollToTop from '../components/ScrollToTop';
import Footer from './LayoutElements/Footer';
import Navbar from './LayoutElements/Navbar';

export default function Layout() {
  return (
    <div className="-mt-22.5">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
