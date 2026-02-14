# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a collection of web development projects for various businesses and clients, primarily focused on creating landing pages, business websites, and web forms. The repository contains multiple independent projects organized by business/client name.

## Project Structure

The repository is organized into client/business-specific directories:

- **Bornasyterminales/**: Business website pages (HTML-based)
- **Comem/**: Professional certification service website with contact forms
- **Division/**: Basic HTML test pages
- **Ecce/**: Welcome page with interactive elements
- **Electrificadoracapital/**: Electrical company website with sophisticated styling and components
- **Gemultimarcas/**: Multi-brand business pages
- **Ilutecno/**: Technology business website with sliders
- **Importled/**: LED import business website
- **LaBodegaDeLoUsado/**: Second-hand store with embedded video content
- **Maelectricos/**: Electrical services business
- **JavaScriptUdemy/**: Learning repository for JavaScript/Udemy courses
- **Retos-Programacion/**: Programming challenges and solutions
- **pure-css-animated-background/**: Standalone CSS animation template

## Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with modern features
- **CSS3**: Custom properties (CSS variables), Flexbox, Grid, animations
- **Vanilla JavaScript**: Form validation, interactive elements, WhatsApp integration
- **Responsive Design**: Mobile-first approach with CSS media queries

### Key Libraries and Frameworks
- **Google Fonts**: Primarily Manrope, Inter, and system fonts
- **SVG Icons**: Inline SVG for scalable vector graphics
- **CSS Custom Properties**: Extensive use of CSS variables for theming

## Common Development Patterns

### Form Handling
Most projects include contact forms with:
- **WhatsApp Integration**: Forms that generate WhatsApp messages with form data
- **Client-side Validation**: JavaScript validation with real-time error feedback
- **Colombian Phone Validation**: Specialized validation for Colombian phone numbers
- **Emoji Compatibility**: Special handling for emojis in WhatsApp messages across different platforms

### Styling Architecture
- **CSS Custom Properties**: Consistent use of CSS variables for colors, spacing, typography
- **Component-based CSS**: Class naming follows component patterns (e.g., `.ec-`, `.hero-`, `.form-`)
- **Responsive Design**: Mobile-first approach with breakpoints typically at 768px and 480px
- **Modern CSS**: Flexbox and Grid for layouts, smooth animations and transitions

### File Organization
Each project typically contains:
```
ProjectName/
├── index.html (or main HTML files)
├── css/
│   └── styles.css (or style.css)
├── js/
│   └── script.js
├── img/ (when present)
└── additional pages/
```

## Common Development Commands

Since these are static HTML/CSS/JS projects, no build tools are required:

### Development Workflow
- **Live Server**: Use any local development server (Live Server extension, http-server, etc.)
- **File Editing**: Direct editing of HTML, CSS, and JavaScript files
- **Testing**: Open HTML files directly in browsers for testing

### No Build System
- No package.json build scripts
- No bundling or compilation required
- Direct browser compatibility testing needed

## Key Features and Components

### Form Validation Systems
The **Comem/formulario** project contains sophisticated form validation:
- Multi-step validation with real-time feedback
- Colombian phone number formatting and validation
- Email validation with proper regex patterns
- Character counting for text areas
- WhatsApp integration with proper URL encoding

### Emoji and Platform Compatibility
Special attention to emoji handling across different platforms:
- Platform detection (Windows/Chrome/Edge compatibility)
- Fallback systems for emoji rendering
- Unicode normalization for WhatsApp compatibility

### Responsive Design Patterns
- CSS Grid and Flexbox for complex layouts
- Mobile-first responsive design
- Consistent spacing and typography scales
- Smooth animations and transitions

## Troubleshooting Notes

### WhatsApp Integration Issues
- Emoji encoding problems on Windows browsers (see Comem/formulario/SOLUCION_EMOJIS.md)
- URL encoding for special characters in messages
- Platform-specific emoji rendering differences

### Cross-browser Compatibility
- SVG icon fallbacks may be needed for older browsers
- CSS custom property support required
- JavaScript ES6+ features used throughout

## Project-Specific Guidelines

### When working with Comem/formulario:
- Pay attention to the emoji compatibility system
- Ensure form validation maintains Colombian phone number patterns
- Test WhatsApp message generation across different browsers

### When working with Electrificadoracapital:
- The project uses a sophisticated CSS namespace system (ec- prefix)
- CSS custom properties are extensively used for theming
- Component-based architecture for reusable elements

### When working with learning projects (JavaScriptUdemy, Retos-Programacion):
- These are educational repositories for skill development
- Focus on clean, educational code examples
- Document learning progress and solutions clearly