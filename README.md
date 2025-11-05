# vegs.no

A minimal personal website built with Next.js and styled with the Tokyo Night color scheme.

## Features

- 🎨 **Tokyo Night Theme** - Beautiful dark color scheme throughout
- 📸 **Photo Gallery** - Filterable photo collection with tag-based organization
- ⌨️ **Keyboard Showcase** - Display mechanical keyboard collection with detailed specs
- 👨‍💻 **About Page** - Personal information and links
- ⚡ **Fast & Modern** - Built with Next.js 16, TypeScript, and Tailwind CSS v4
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 📱 **Responsive Design** - Works seamlessly on all devices

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Deployment:** Ready for Vercel, Netlify, or similar platforms

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/begs/vegs.no.git
cd vegs.no
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
vegs.no/
├── src/
│   ├── app/
│   │   ├── about/         # About page
│   │   ├── keyboards/     # Keyboard showcase
│   │   ├── photos/        # Photo gallery
│   │   ├── globals.css    # Global styles with Tokyo Night theme
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── not-found.tsx  # 404 page
│   └── components/
│       └── Navigation.tsx # Main navigation component
├── public/               # Static assets
└── package.json
```

## Customization

### Adding Photos

Currently using placeholder images. To add real photos:

1. **Choose a hosting solution:**
   - **Cloudinary** - Free tier, automatic optimization, CDN
   - **GitHub repo** - Simple but increases repo size (~100 photos may be heavy)
   - **Netlify/Vercel** - Integrated with deployment

2. Update the `mockPhotos` array in `src/app/photos/page.tsx`:
```typescript
const photos = [
  { 
    id: 1, 
    src: "your-image-url", 
    alt: "Description", 
    tags: ["landscape", "nature"] 
  },
  // ... more photos
];
```

3. Modify tags in the `allTags` array for your categorization needs

### Adding Keyboards

Update the `mockKeyboards` array in `src/app/keyboards/page.tsx`:

```typescript
{
  id: number,
  name: string,
  category: "40%" | "60%" | "65%" | "75%" | "TKL" | "full-size",
  switches: string,
  keycaps: string,
  case: string,
  description: string,
  image: string,
  tags: string[]
}
```

### Customizing the Tokyo Night Theme

Edit the color variables in `src/app/globals.css`:

```css
:root {
  --tn-bg-primary: #1a1b26;
  --tn-accent-blue: #7aa2f7;
  /* ... other colors */
}
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tokyo Night Theme](https://github.com/enkia/tokyo-night-vscode-theme)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/begs/vegs.no)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT

## Author

Vegard - [GitHub](https://github.com/begs)
