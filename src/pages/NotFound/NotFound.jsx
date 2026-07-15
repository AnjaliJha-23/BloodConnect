import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaTint } from 'react-icons/fa'
import './NotFound.css'

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaTint className="not-found-icon" />
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">This page seems to have run out of blood.</h2>
          <p className="not-found-subtext">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Link to="/" className="btn btn-primary">
            <FaHome /> Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound
