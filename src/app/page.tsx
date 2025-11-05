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

          {/* Placeholder for future image */}
          <motion.div 
            className="w-48 h-48 mx-auto bg-secondary border-2 border-dashed border-tertiary rounded-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center text-muted">
              <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
              </div>
              <p className="text-sm">Photo placeholder</p>
            </div>
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
