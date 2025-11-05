'use client';

import Navigation from "@/components/Navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data - replace with real photos later
const mockPhotos = [
  { id: 1, src: "https://via.placeholder.com/400x300/7aa2f7/1a1b26", alt: "Photo 1", tags: ["landscape", "nature"] },
  { id: 2, src: "https://via.placeholder.com/400x400/bb9af7/1a1b26", alt: "Photo 2", tags: ["portrait", "people"] },
  { id: 3, src: "https://via.placeholder.com/400x250/73daca/1a1b26", alt: "Photo 3", tags: ["landscape", "travel"] },
  { id: 4, src: "https://via.placeholder.com/400x350/9ece6a/1a1b26", alt: "Photo 4", tags: ["nature", "macro"] },
  { id: 5, src: "https://via.placeholder.com/400x300/e0af68/1a1b26", alt: "Photo 5", tags: ["portrait", "street"] },
  { id: 6, src: "https://via.placeholder.com/400x450/ff9e64/1a1b26", alt: "Photo 6", tags: ["travel", "architecture"] },
];

const allTags = ["all", "landscape", "nature", "portrait", "people", "travel", "macro", "street", "architecture"];

export default function Photos() {
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const filteredPhotos = selectedTag === "all" 
    ? mockPhotos 
    : mockPhotos.filter(photo => photo.tags.includes(selectedTag));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Photo Gallery
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              A collection of moments captured through my lens. Filter by tags to explore different categories.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-accent text-background'
                    : 'bg-secondary text-foreground hover:bg-tertiary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-lg bg-secondary hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setSelectedPhoto(photo.id)}
                >
                  <div className="aspect-w-4 aspect-h-3 bg-tertiary">
                    <div className="w-full h-64 bg-tertiary flex items-center justify-center">
                      <div className="text-center text-muted">
                        <div className="w-12 h-12 mx-auto mb-2 opacity-50">
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                          </svg>
                        </div>
                        <p className="text-sm">Photo {photo.id}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </motion.div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">No photos found for the selected tag.</p>
            </div>
          )}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-accent text-2xl"
            >
              ✕
            </button>
            <div className="bg-secondary rounded-lg p-2">
              <div className="w-full h-96 bg-tertiary flex items-center justify-center rounded">
                <div className="text-center text-muted">
                  <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                  <p>Full-size Photo {selectedPhoto}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}