import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../../components/Hero/Hero'
import Statistics from '../../components/Statistics/Statistics'
import SearchSection from '../../components/SearchSection/SearchSection'
import BloodGroups from '../../components/BloodGroups/BloodGroups'
import Features from '../../components/Features/Features'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import EmergencySection from '../../components/EmergencySection/EmergencySection'
import Testimonials from '../../components/Testimonials/Testimonials'

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const scrollToCenter = (id) => {
  const element = document.getElementById(id);

  if (!element) return;

  const navbarHeight = 90; // Adjust if your navbar height is different

  const elementTop =
    element.getBoundingClientRect().top + window.pageYOffset;

  const offset =
    elementTop -
    (window.innerHeight / 2 - element.offsetHeight / 2) -
    navbarHeight / 2;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
};

  useEffect(() => {
  const target = location.state?.scrollTo;

  if (target) {
    setTimeout(() => {
      scrollToCenter(target);
    }, 100);

    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }
}, [location, navigate]);

  return (
    <>
      <Hero />
      <Statistics />
      <SearchSection />
      <BloodGroups />
      <Features />
      <HowItWorks />
      <EmergencySection />
      <Testimonials />
    </>
  )
}

export default Home
