import './App.css';
import About from './components/About';
import Benefits from './components/Benefits';
import Features from './components/Features';
import Invest from './components/Invest';
import Dashboard from './components/Dashboard';
import CustomScripts from './custom';
import Pricing from './components/Pricing';
import Testimonial from './components/Testimonial';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Cta from './components/Cta';
import Header from './components/Header';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import Page404 from './components/404';
import MatrixDetail from './components/MatrixDetail';

import Partners from './components/Partners';
import { ContractProvider } from './contexts/ContractContext';


import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true, element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard/x4/:level/:cycle/:userId', element: <MatrixDetail />
      },
      {
        path: '/dashboard', element: <Home />
      },
      
      {
        path: '*', element: <Page404 />
      }
    ]
  }
]);


function Home() {
  return (
    <div className="App">
        <CustomScripts />
        <Preloader/>
        <Header />
        <HeroSection />
        <Partners />
        <Invest />
        <Dashboard />
        <About />
        <Benefits />
        <Features />
        <Pricing />
        <Testimonial />
        <Faq />
        <Cta />
        <Footer />
    </div>
  )
}

function App() {
  return (
    <ContractProvider>
      <RouterProvider router={router} />
    </ContractProvider>
  );
}

export default App;
