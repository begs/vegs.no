'use client';

import Navigation from "@/components/Navigation";
import { useState } from "react";
import { motion } from "framer-motion";

// Mock keyboard data - replace with real data later
const mockKeyboards = [
  {
    id: 1,
    name: "Elise",
    category: "Alice",
    switches: "Crinks",
    keycaps: "keyreative ABS blanks",
    case: "Aluminum",
    description: "An Alice-inspired keyboard by Mekanisk/Snurrebassen.",
    image: "https://live.staticflickr.com/65535/50583082332_0360c8d777_b.jpg",
    tags: ["Alice"]
  },
  {
    id: 2,
    name: "UTD 360C",
    category: "TKL",
    switches: "Pewters",
    keycaps: "Cherry PBT Dyesub",
    case: "Aluminum",
    description: "A clone of the classic OTD 360C.",
    image: "https://live.staticflickr.com/65535/51352150983_c510c731ce_b.jpg",
    tags: ["JWK", "TKL"]
  },
  {
    id: 3,
    name: "HHKB Pro 1",
    category: "60%",
    switches: "Topre 45g",
    keycaps: "PBT Dyesub",
    case: "ABS",
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
    description: "Tray mount 60% with gummy o-ring, made by TGR & Singa. Built with Cherry MX Browns from 1997.",
    image: "https://via.placeholder.com/400x250/9ece6a/1a1b26",
    tags: ["cherry", "60%"]
  },
  {
    id: 5,
    name: "Haus",
    category: "65%",
    switches: "Cherry MX Black",
    keycaps: "-",
    case: "Aluminum",
    description: "TGR 910-style 65% with top- or o-ring mount options. By Hands Engineering.",
    image: "https://via.placeholder.com/400x250/9ece6a/1a1b26",
    tags: ["cherry", "65%"]
  },
  {
    id: 6,
    name: "HHKB Pro Hybrid Type-S (Black)",
    category: "60%",
    switches: "Topre 45g",
    keycaps: "PBT Dyesub",
    case: "ABS",
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
    description: "Classic TKL by Plywrks.",
    image: "https://via.placeholder.com/400x250/bb9af7/1a1b26",
    tags: ["TKL"]
  },
];

const categories = ["all", "40%", "60%", "65%", "75%", "TKL", "full-size"];
const switchTypes = ["all", "topre", "cherry", "gateron", "zealios"];

export default function Keyboards() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSwitchType, setSelectedSwitchType] = useState("all");
  const [selectedKeyboard, setSelectedKeyboard] = useState<number | null>(null);

  const filteredKeyboards = mockKeyboards.filter(keyboard => {
    const categoryMatch = selectedCategory === "all" || keyboard.category === selectedCategory;
    const switchMatch = selectedSwitchType === "all" || 
      keyboard.tags.some(tag => tag.includes(selectedSwitchType));
    return categoryMatch && switchMatch;
  });

  const selectedKeyboardData = selectedKeyboard 
    ? mockKeyboards.find(kb => kb.id === selectedKeyboard)
    : null;

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
            {filteredKeyboards.map((keyboard) => (
              <div
                key={keyboard.id}
                className="bg-secondary rounded-lg overflow-hidden hover:bg-tertiary/20 transition-colors cursor-pointer"
                onClick={() => setSelectedKeyboard(keyboard.id)}
              >
                <div className="w-full h-48 bg-tertiary overflow-hidden">
                  <img 
                    src={keyboard.image} 
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
            ))}
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
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedKeyboard(null)}
        >
          <div className="relative max-w-2xl w-full bg-secondary rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedKeyboard(null)}
              className="absolute top-4 right-4 text-foreground hover:text-accent text-2xl z-10"
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-10 bg-tertiary">
              <div className="w-full h-64 bg-tertiary flex items-center justify-center">
                <div className="text-center text-muted">
                  <div className="w-20 h-20 mx-auto mb-4 opacity-50">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm3 3h2v2h-2v-2zm0 3h2v2h-2v-2zm0 3h2v2h-2v-2zm7-6h2v2h-2v-2zm0-3h2v2h-2V8zm0 6h2v2h-2v-2z"/>
                    </svg>
                  </div>
                  <p>{selectedKeyboardData.name}</p>
                </div>
              </div>
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
