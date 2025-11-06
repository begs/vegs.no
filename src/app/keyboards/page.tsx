'use client';

import Navigation from "@/components/Navigation";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

// Mock keyboard data - replace with real data later
const mockKeyboards = [
  {
    id: 1,
    name: "Elise",
    category: "Alice",
    switches: "Crinks (Cream + Ink frankenswitches)",
    keycaps: "keyreative ABS blanks",
    case: "Aluminum",
    plate: "POM",
    description: "A prototype of an Alice-inspired keyboard by Mekanisk/Snurrebassen.",
    image: "https://via.placeholder.com/400x250/7aa2f7/1a1b26?text=Elise",
    tags: ["Alice", "mx"]
  },
  {
    id: 2,
    name: "UTD 360C",
    category: "TKL",
    switches: "JWK Pewters",
    keycaps: "Cherry PBT Dyesub",
    case: "Aluminum",
    plate: "POM",
    description: "A clone of the classic OTD 360C.",
    image: "https://via.placeholder.com/400x250/7aa2f7/1a1b26?text=UTD+360C",
    tags: ["TKL", "mx"]
  },
  {
    id: 3,
    name: "HHKB Pro 1",
    category: "60%",
    switches: "Topre 45g",
    keycaps: "PBT Dyesub",
    case: "ABS",
    plate: "Integrated",
    description: "The original HHKB Pro, manufactured in 2005.",
    image: "https://via.placeholder.com/400x250/7aa2f7/1a1b26",
    tags: ["topre", "60%"]
  },
  {
    id: 4,
    name: "Unikorn SE/EE",
    category: "60%",
    switches: "Cherry MX Brown",
    keycaps: "GMK WoB",
    case: "Aluminum",
    plate: "Aluminum",
    description: "Tray mount 60% with gummy o-ring, made by TGR & Singa. Built with Cherry MX Browns from 1997.",
    image: "https://via.placeholder.com/400x250/9ece6a/1a1b26",
    tags: ["mx", "60%"]
  },
  {
    id: 5,
    name: "Haus",
    category: "65%",
    switches: "Cherry MX Black",
    keycaps: "-",
    case: "Aluminum",
    plate: "Aluminum",
    description: "TGR 910-style 65% with top- or o-ring mount options. By Hands Engineering.",
    image: "https://via.placeholder.com/400x250/9ece6a/1a1b26",
    tags: ["mx", "65%"]
  },
  {
    id: 6,
    name: "HHKB Pro Hybrid Type-S (Black)",
    category: "60%",
    switches: "Topre 45g",
    keycaps: "PBT Dyesub",
    case: "ABS",
    plate: "Integrated",
    description: "HHKB Hybrid from 2020-07. Daily driver!",
    image: "https://via.placeholder.com/400x250/bb9af7/1a1b26",
    tags: ["topre", "60%"]
  },
  {
    id: 7,
    name: "HHKB Pro Hybrid Type-S (Beige)",
    category: "60%",
    switches: "Topre 45g",
    keycaps: "PBT Dyesub",
    case: "ABS",
    plate: "Integrated",
    description: "HHKB Hybrid from 2020-02, with domes from a 2017 HHKB BT. Daily driver number two!",
    image: "https://via.placeholder.com/400x250/bb9af7/1a1b26",
    tags: ["topre", "60%"]
  },
  {
    id: 8,
    name: "Spyder",
    category: "TKL",
    switches: "N/A",
    keycaps: "N/A",
    case: "Aluminum",
    plate: "Aluminum",
    description: "Classic TKL by Plywrks.",
    image: "https://via.placeholder.com/400x250/bb9af7/1a1b26",
    tags: ["TKL", "mx"]
  },
];

const categories = ["all", "60%", "65%", "TKL", "Alice"];
const switchTypes = ["all", "topre", "mx"];

export default function Keyboards() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSwitchType, setSelectedSwitchType] = useState("all");
  const [selectedKeyboard, setSelectedKeyboard] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [keyboardImages, setKeyboardImages] = useState<Record<string, any[]>>({});
  const [loadingImages, setLoadingImages] = useState(true);

  // Fetch keyboard images from Cloudinary
  useEffect(() => {
    async function fetchKeyboardImages() {
      try {
        setLoadingImages(true);
        const response = await fetch('/api/keyboards');
        const data = await response.json();
        
        if (data.keyboards) {
          setKeyboardImages(data.keyboards);
        }
      } catch (error) {
        console.error('Error fetching keyboard images:', error);
      } finally {
        setLoadingImages(false);
      }
    }

    fetchKeyboardImages();
  }, []);

  const filteredKeyboards = mockKeyboards.filter(keyboard => {
    const categoryMatch = selectedCategory === "all" || keyboard.category === selectedCategory;
    const switchMatch = selectedSwitchType === "all" || 
      keyboard.tags.some(tag => tag.includes(selectedSwitchType));
    return categoryMatch && switchMatch;
  });

  const selectedKeyboardData = selectedKeyboard 
    ? mockKeyboards.find(kb => kb.id === selectedKeyboard)
    : null;

  // Get images for the selected keyboard
  const selectedKeyboardImages = selectedKeyboardData 
    ? keyboardImages[selectedKeyboardData.name] || []
    : [];

  // Reset image index when keyboard changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedKeyboard]);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (!selectedKeyboard || selectedKeyboardImages.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedKeyboard(null);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentImageIndex((prev) => (prev + 1) % selectedKeyboardImages.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentImageIndex((prev) => 
          prev === 0 ? selectedKeyboardImages.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedKeyboard, selectedKeyboardImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedKeyboardImages.length);
  }, [selectedKeyboardImages.length]);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedKeyboardImages.length - 1 : prev - 1
    );
  }, [selectedKeyboardImages.length]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Keyboard Collection
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              A showcase of my mechanical keyboard collection. Each board tells a story of craftsmanship and typing experience.
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Layout Size</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent text-background'
                        : 'bg-secondary text-foreground hover:bg-tertiary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Switch Type</h3>
              <div className="flex flex-wrap gap-2">
                {switchTypes.map((switchType) => (
                  <button
                    key={switchType}
                    onClick={() => setSelectedSwitchType(switchType)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedSwitchType === switchType
                        ? 'bg-accent-purple text-background'
                        : 'bg-secondary text-foreground hover:bg-tertiary'
                    }`}
                  >
                    {switchType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Keyboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredKeyboards.map((keyboard) => {
              // Get first image from Cloudinary or fallback to placeholder
              const keyboardImageList = keyboardImages[keyboard.name] || [];
              const previewImage = keyboardImageList.length > 0 
                ? keyboardImageList[0].src 
                : keyboard.image;
              
              return (
              <div
                key={keyboard.id}
                className="bg-secondary rounded-lg overflow-hidden hover:bg-tertiary/20 transition-colors cursor-pointer"
                onClick={() => setSelectedKeyboard(keyboard.id)}
              >
                <div className="w-full h-48 bg-tertiary overflow-hidden">
                  <img 
                    src={previewImage} 
                    alt={keyboard.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{keyboard.name}</h3>
                    <p className="text-sm text-muted">{keyboard.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted">Layout:</span>
                      <span className="ml-1 text-accent">{keyboard.category}</span>
                    </div>
                    <div>
                      <span className="text-muted">Switches:</span>
                      <span className="ml-1 text-accent">{keyboard.switches}</span>
                    </div>
                    <div>
                      <span className="text-muted">Keycaps:</span>
                      <span className="ml-1 text-accent">{keyboard.keycaps}</span>
                    </div>
                    <div>
                      <span className="text-muted">Case:</span>
                      <span className="ml-1 text-accent">{keyboard.case}</span>
                    </div>
                    <div>
                      <span className="text-muted">Plate:</span>
                      <span className="ml-1 text-accent">{keyboard.plate}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {keyboard.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-tertiary text-xs rounded text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {filteredKeyboards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">No keyboards found matching the selected filters.</p>
            </div>
          )}
        </motion.div>
        </div>
      </main>

      {/* Keyboard Detail Modal */}
      {selectedKeyboardData && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setSelectedKeyboard(null)}
        >
          <div className="relative max-w-4xl w-full bg-secondary rounded-lg overflow-hidden my-8" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedKeyboard(null)}
              className="absolute top-4 right-4 text-foreground hover:text-accent text-2xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
            
            {/* Image Carousel */}
            <div className="relative w-full h-64 md:h-96 bg-tertiary overflow-hidden">
              {selectedKeyboardImages.length > 0 ? (
                <>
                  {/* Main Image */}
                  <img 
                    key={currentImageIndex}
                    src={selectedKeyboardImages[currentImageIndex]?.src} 
                    alt={selectedKeyboardImages[currentImageIndex]?.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation arrows - only show if multiple images */}
                  {selectedKeyboardImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent text-4xl font-bold z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedKeyboardImages.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                // Fallback to placeholder image
                <img 
                  src={selectedKeyboardData.image} 
                  alt={selectedKeyboardData.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedKeyboardData.name}</h2>
                <p className="text-muted mt-2">{selectedKeyboardData.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted">Layout Size:</span>
                    <p className="text-accent font-medium">{selectedKeyboardData.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted">Switches:</span>
                    <p className="text-accent font-medium">{selectedKeyboardData.switches}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted">Plate Material:</span>
                    <p className="text-accent font-medium">{selectedKeyboardData.plate}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-muted">Keycaps:</span>
                    <p className="text-accent font-medium">{selectedKeyboardData.keycaps}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted">Case Material:</span>
                    <p className="text-accent font-medium">{selectedKeyboardData.case}</p>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted">Tags:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedKeyboardData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-tertiary text-sm rounded text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
