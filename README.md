# CHC Group Website

A modern, professional website for Congo Horizon Challenges Group built with React, Vite, and Framer Motion.

## Features

- 🎨 **Modern Apple-inspired UI** - Clean, minimalist design with smooth animations
- 🖼️ **Animated Hero Carousel** - Beautiful image transitions with smooth animations
- 🎯 **Interactive Navigation** - Hover effects on menu items with elegant dropdowns
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Built with Vite for optimal loading speeds
- 🎭 **Smooth Animations** - Powered by Framer Motion for fluid interactions

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Next-generation frontend tooling
- **Framer Motion** - Production-ready motion library
- **Montserrat Font** - Clean, modern typography
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
chcweb/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation with hover menus
│   │   ├── Hero.jsx            # Hero section with image carousel
│   │   ├── Services.jsx        # Services section
│   │   ├── Sectors.jsx         # Activity sectors
│   │   ├── About.jsx           # About section
│   │   ├── Values.jsx          # Company values
│   │   ├── Team.jsx            # Team members
│   │   ├── Partners.jsx        # Partners logos
│   │   ├── Contact.jsx         # Contact form
│   │   └── Footer.jsx          # Footer
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global app styles
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── assets/
│   ├── logo/                   # Company logo
│   └── patners/                # Partner logos
├── package.json
├── vite.config.js
└── index.html
```

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #1a1a1a;
  --accent-color: #e63946;
  /* ... */
}
```

### Content

All content is based on `documentation/site.MD`. Update component files to modify text and information.

### Images

The application uses stock photos from Pexels. For better representation of the target audience (people in Africa, specifically Congo DRC), consider:

1. **Using Local Images**: Replace stock photos with actual photos of your team, projects, and events in Congo DRC
   - Place images in `public/assets/` directory
   - Update image URLs in components to use local paths (e.g., `/assets/team/member1.jpg`)

2. **Recommended Stock Photo Sources for Black/African People**:
   - [Nappy.co](https://nappy.co) - Free high-quality photos of Black and Brown people
   - [Afripik.com](https://afripik.com) - Free African stock images
   - [Pexels.com](https://www.pexels.com/search/black%20people%20african/) - Search for "black people african"
   - [Pixabay.com](https://pixabay.com/images/search/black%20people/) - Free images of Black people

**Components that use images:**
- `src/components/Hero.jsx` - Hero carousel images (4 images)
- `src/components/Team.jsx` - Team member photos (3 images)
- `src/components/Testimonials.jsx` - Testimonial author photos (3 images)
- `src/pages/Gallery.jsx` - Gallery images (12 images)
- `src/pages/Blog.jsx` - Blog post featured images (6 images)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 CHC Group. All rights reserved.


