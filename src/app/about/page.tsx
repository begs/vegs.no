'use client';

import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div 
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-secondary border-2 border-dashed border-tertiary rounded-full flex items-center justify-center">
              <div className="text-center text-muted">
                <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <p className="text-xs">Profile photo</p>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                About Me
              </h1>
              <p className="text-xl text-muted max-w-2xl mx-auto">
                🌊
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-secondary rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Hello! 👋
              </h2>
              
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                    Hi!
                </p>
              </div>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
                  "Python", "Git", "Docker", "AWS", "PostgreSQL"
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-tertiary text-sm rounded-full text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Interests & Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Photography", "Mechanical Keyboards", "Travel", "Design", 
                  "Open Source", "Coffee", "Hiking", "Technology"
                ].map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-accent/20 text-sm rounded-full text-accent"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              Let's Connect
            </h3>
            
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/begs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-secondary hover:bg-tertiary rounded-lg transition-colors text-foreground hover:text-accent"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              
              <a
                href="mailto:vegv@proton.me"
                className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-accent-purple rounded-lg transition-colors text-background"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </motion.div>
        </div>
      </main>
    </div>
  );
}
