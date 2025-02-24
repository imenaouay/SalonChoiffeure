import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaScissors, FaClock, FaStar } from 'react-icons/fa6';

const SERVICES = [
  {
    id: 1,
    name: 'Haircut & Styling',
    price: '$60',
    duration: '60 min',
    image: 'https://i.ytimg.com/vi/vwkcj0kq5T8/hqdefault.jpg',
    description: 'Expert haircut and styling tailored to your preferences.',
  },
  {
    id: 2,
    name: 'Color Treatment',
    price: '$120',
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&auto=format&fit=crop&q=80',
    description: 'Professional color services using premium products.',
  },
  {
    id: 3,
    name: 'Hair Treatment',
    price: '$80',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=800&auto=format&fit=crop&q=80',
    description: 'Revitalizing treatments for healthy, beautiful hair.',
  },
];

const FEATURES = [
  {
    icon: <FaScissors className="w-6 h-6" />,
    title: 'Expert Stylists',
    description: 'Our team of professional stylists brings years of experience.',
  },
  {
    icon: <FaClock className="w-6 h-6" />,
    title: 'Flexible Hours',
    description: 'Open 7 days a week with convenient booking options.',
  },
  {
    icon: <FaStar className="w-6 h-6" />,
    title: 'Premium Service',
    description: 'Luxury experience with attention to detail.',
  },
];

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[90vh] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&auto=format&fit=crop&q=80"
            alt="Salon hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience the Art of Hair Styling
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Transform your look with our expert stylists and premium services.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-all transform hover:scale-105"
            >
              Book Your Appointment
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-xl text-gray-600">Experience the difference with our premium services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600">Premium hair care services for every style</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-semibold text-lg">
                      {service.price}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <FaClock className="w-4 h-4" />
                      {service.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-purple-600 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Book your appointment today and experience the difference
          </p>
          <Link
            to="/book"
            className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105"
          >
            Book Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}