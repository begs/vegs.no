'use client';

import Navigation from "@/components/Navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: number;
  src: string;
  alt: string;
  tags: string[];
  width?: number;
  height?: number;
  publicId?: string;
  folder?: string;
}

const allTags = ["all", "landscape", "nature", "portrait", "people", "travel", "macro", "street", "architecture"];

export default function Photos() {
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableTags, setAvailableTags] = useState<string[]>(["all"]);

    // Fetch photos from Cloudinary API
  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);
        const response = await fetch('/api/photos');
        const data = await response.json();
        
        if (data.photos) {
          setPhotos(data.photos);
          
          // Extract unique folder names and sort alphabetically
          const folders = new Set<string>();
          data.photos.forEach((photo: Photo) => {
            if (photo.tags && photo.tags.length > 0) {
              folders.add(photo.tags[0]); // Each photo has one folder name
            }
          });
          
          // Build filter list: "all" first, then sorted folder names
          const sortedTags = ['all', ...Array.from(folders).sort()];
          setAvailableTags(sortedTags);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  const filteredPhotos = selectedTag === "all" 
    ? photos 
    : photos.filter(photo => photo.tags.includes(selectedTag));

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Find current photo index
      const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto);
      
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        // Next photo
        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
        setSelectedPhoto(filteredPhotos[nextIndex].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        // Previous photo
        const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
        setSelectedPhoto(filteredPhotos[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  const handleNextPhoto = useCallback(() => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex].id);
  }, [selectedPhoto, filteredPhotos]);

  const handlePrevPhoto = useCallback(() => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto);
    const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    setSelectedPhoto(filteredPhotos[prevIndex].id);
  }, [selectedPhoto, filteredPhotos]);

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
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedTag === tag
                      ? 'bg-accent text-background'
                      : 'bg-secondary text-foreground hover:bg-tertiary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {!loading && (
              <p className="text-center text-sm text-muted">
                Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
                {selectedTag !== 'all' && ` tagged with "${selectedTag}"`}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
              <p className="mt-4 text-muted">Loading photos...</p>
            </div>
          )}

          {/* Photo Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index < 6 ? index * 0.05 : 0 }}
                className="group relative overflow-hidden rounded-lg bg-secondary hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedPhoto(photo.id)}
              >
                  <div className="w-full h-64 bg-tertiary relative">
                    <img 
                      src={photo.src} 
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
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
          </motion.div>

          {!loading && filteredPhotos.length === 0 && (
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
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-accent text-3xl font-bold z-10 w-10 h-10 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
            
            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
              aria-label="Previous photo"
            >
              ‹
            </button>
            
            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
              aria-label="Next photo"
            >
              ›
            </button>
            
            {/* Image - no animation wrapper, instant swap */}
            <img 
              key={selectedPhoto}
              src={photos.find((p: Photo) => p.id === selectedPhoto)?.src}
              alt={photos.find((p: Photo) => p.id === selectedPhoto)?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
