import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Hero from '../../components/Hero/Hero'; 
import Statistics from '../../components/Statistics/Statistics';
import SearchSection from '../../components/SearchSection/SearchSection';
import EmergencySection from '../../components/EmergencySection/EmergencySection'; 
import Features from '../../components/Features/Features'; 
import BloodRequests from "../../components/BloodRequests/BloodRequests";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          if (targetId === 'emergency-request') {
            
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div style={{ backgroundColor: '#fff5f5', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <Hero />
      
      <div style={{ padding: '2rem 0', margin: '2.5rem 0' }}>
        <Statistics />
      </div>
      
      
      <div id="find-donor" style={{ scrollMarginTop: '120px', margin: '3rem 0' }}>
        <SearchSection />
      </div>
      
      <div id="emergency-request" style={{ margin: '3rem 0' }}>
        <EmergencySection />
      </div>

    
      <div style={{ margin: '3rem 0' }}>
        <BloodRequests />
      </div>

      <div style={{ marginTop: '3rem' }}>
        <Features />
      </div>

      
      <div style={{ paddingBottom: '12vh' }}></div>
    </div>
  );
}
