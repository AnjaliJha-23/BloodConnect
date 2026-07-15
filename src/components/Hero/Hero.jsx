// import { motion } from "framer-motion";
// import { FaSearch, FaUserPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import HeroImage from "../../assets/Blood-donation.png";

// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.12,
//       duration: 0.6,
//     },
//   }),
// };

// const fadeRight = {
//   hidden: { opacity: 0, x: 40 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7 },
//   },
// };

// const scrollToFindDonor = () => {
//   document
//     .getElementById("find-donor")
//     ?.scrollIntoView({ behavior: "smooth" });
// };

// const Hero = () => {
//   return (
//     <section className="hero">
//       <div className="container hero-inner">
//         <div className="hero-content">
//           <motion.span
//             className="eyebrow"
//             initial="hidden"
//             animate="visible"
//             custom={0}
//             variants={fadeUp}
//           >
//             Donate Blood, Save Lives
//           </motion.span>

//           <motion.h1
//             className="hero-title"
//             initial="hidden"
//             animate="visible"
//             custom={1}
//             variants={fadeUp}
//           >
//             Every Drop
//             <br />
//             <span className="hero-title-accent">Counts</span>
//           </motion.h1>

//           <motion.p
//             className="hero-subtext"
//             initial="hidden"
//             animate="visible"
//             custom={2}
//             variants={fadeUp}
//           >
//             Join thousands of donors helping patients in need.
//             Together, we can create a healthier and safer tomorrow.
//           </motion.p>

//           <motion.div
//             className="hero-actions"
//             initial="hidden"
//             animate="visible"
//             custom={3}
//             variants={fadeUp}
//           >
//             <button className="btn btn-primary" onClick={scrollToFindDonor}>
//               <FaSearch />
//               Find Donor
//             </button>

//             <Link to="/register" className="btn btn-outline">
//               <FaUserPlus />
//               Become a Donor
//             </Link>
//           </motion.div>
//         </div>

//         <motion.div
//           className="hero-image-container"
//           initial="hidden"
//           animate="visible"
//           variants={fadeRight}
//         >
//           <img src={HeroImage} alt="Blood Donation" className="hero-image" />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
import { motion } from "framer-motion";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/Blood-donation.png";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToFindDonor = () => {
    const section = document.getElementById("find-donor");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="container py-5">
      <div className="row align-items-center">

        {/* Left Side */}
        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="d-inline-flex align-items-center px-3 py-2 rounded-pill shadow-sm mb-4"
            style={{
              background: "#fff",
              color: "#dc3545",
              fontWeight: "600",
            }}
          >
            🩸
            <span className="ms-2">
              Donate Blood, Save Lives
            </span>
          </div>

          <h1
            className="fw-bold"
            style={{
              fontSize: "4rem",
              lineHeight: "1.1",
              color: "#1d2b4f",
            }}
          >
            Every Drop
          </h1>

          <h1
            className="fw-bold mb-4"
            style={{
              fontSize: "4rem",
              color: "#dc3545",
            }}
          >
            Counts 🩸
          </h1>

          <p
            className="text-secondary mb-5"
            style={{
              fontSize: "1.15rem",
              lineHeight: "1.8",
            }}
          >
            Join thousands of donors helping patients in need.
            <br />
            Together, we can create a healthier and safer tomorrow.
          </p>

          <div className="d-flex gap-3 flex-wrap">

            <button
              className="btn btn-danger rounded-pill px-4 py-3 fw-semibold"
              onClick={scrollToFindDonor}
            >
              <FaSearch className="me-2" />
              Find Donor
            </button>

            <button
              className="btn btn-outline-dark rounded-pill px-4 py-3 fw-semibold"
              onClick={() => navigate("/register")}
            >
              <FaUserPlus className="me-2" />
              Become a Donor
            </button>

          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="col-lg-6 text-center mt-5 mt-lg-0"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={HeroImage}
            alt="Blood Donation"
            className="img-fluid"
            style={{
              maxHeight: "460px",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;