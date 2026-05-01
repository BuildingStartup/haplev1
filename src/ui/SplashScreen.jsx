import { motion } from "framer-motion";

export default function SplashScreen() {
  const brandName = "Haple";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2 } }} // Smooth 1.2s fade out
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white text-primary px-6"
    >
      {/* LOGO */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <img className="w-22 lg:w-30" src="../logo.svg" alt="logo" />
      </motion.div>
      
    </motion.div>
  );
}
