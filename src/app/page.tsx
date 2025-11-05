'use client';

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-3xl">
          {/* Hero Section */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent via-accent-purple to-accent-teal bg-clip-text text-transparent">
              Vegard
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto">
              Developer, photographer, and keyboard enthusiast
            </p>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-accent/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://res.cloudinary.com/duov6aybt/image/upload/v1762342711/4784324-6HBJwEVMTODAVhN0_tx4otx.jpg" 
              alt="Not Vegard"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Navigation hints */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="px-3 py-1 bg-secondary text-accent rounded-full hover:bg-tertiary transition-colors cursor-default">
              📸 Photos
            </span>
            <span className="px-3 py-1 bg-secondary text-accent-purple rounded-full hover:bg-tertiary transition-colors cursor-default">
              ⌨️ Keyboards
            </span>
            <span className="px-3 py-1 bg-secondary text-accent-teal rounded-full hover:bg-tertiary transition-colors cursor-default">
              👨‍💻 About
            </span>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
