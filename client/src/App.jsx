import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import { FloatingDock } from './components/FloatingDock';
import { House, Shirt, BookOpen, Phone } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import Verify from './pages/Verify';

const Items = [
  { title: 'Home', icon: <House />, href: '/' },
  { title: 'Collection', icon: <Shirt />, href: '/collection' },
  { title: 'About', icon: <BookOpen />, href: '/about' },
  { title: 'Contact', icon: <Phone />, href: '/contact' },
];

const App = () => {
  const location = useLocation();
  const hideNavFooterPages = ['/login'];
  const containerClasses = hideNavFooterPages.includes(location.pathname)
    ? ''
    : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]';

  return (
    <div className={containerClasses}>
      <ToastContainer />
      {!hideNavFooterPages.includes(location.pathname) && <Navbar />}
      {!hideNavFooterPages.includes(location.pathname) && <SearchBar />}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      {!hideNavFooterPages.includes(location.pathname) && <FloatingDockWrapper items={Items} />}
      {!hideNavFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

// FloatingDockWrapper ensures the FloatingDock stays sticky at the bottom
const FloatingDockWrapper = ({ items }) => {
  return (
    <div className="fixed md:hidden bottom-2 left-0 right-0 z-50 bg-transparent dark:bg-neutral-900 w-auto">
      <div className='flex items-center justify-center w-full bg-transparent'>
        <FloatingDock items={items} className="w-auto max-w-[500px] translate-y-20 bg-transparent" />
      </div>
    </div>
  );
};

export default App;
