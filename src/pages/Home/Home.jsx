import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Hero from '../../components/Hero/Hero'; 
import Statistics from '../../components/Statistics/Statistics';
import SearchSection from '../../components/SearchSection/SearchSection';
import EmergencySection from '../../components/EmergencySection/EmergencySection'; 
import Features from '../../components/Features/Features'; 

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          // FIX: Look at which section was clicked and apply the perfect scrolling position
          if (targetId === 'emergency-request') {
            // Centers the emergency banner vertically on your screen ("thoda upar")
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            // Keeps the Find Donor card perfectly aligned right at the top layout boundary
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
      
      {/* Added a scroll clearance buffer so the navbar doesn't clip the card when block: "start" runs */}
      <div id="find-donor" style={{ scrollMarginTop: '120px', margin: '3rem 0' }}>
        <SearchSection />
      </div>
      
      <div id="emergency-request" style={{ margin: '3rem 0' }}>
        <EmergencySection />
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <Features />
      </div>

      {/* Keeps a scroll buffer area at the bottom layout boundary so the center block can execute */}
      <div style={{ paddingBottom: '12vh' }}></div>
    </div>
  );
}
