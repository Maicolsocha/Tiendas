// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.background = "var(--background)"
    navbar.style.backdropFilter = "none"
  }
})

// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.floor(current).toLocaleString()
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    updateCounter()
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")

      // Trigger counter animation when stats section is visible
      if (entry.target.classList.contains("stats-section")) {
        animateCounters()
      }
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// Observe stats section for counter animation
const statsSection = document.querySelector(".stats-section")
if (statsSection) {
  observer.observe(statsSection)
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// CTA Button interactions
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Form validation and interaction (if needed for future contact forms)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Lazy loading for images
const images = document.querySelectorAll("img")
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.classList.add("loaded")
      observer.unobserve(img)
    }
  })
})

images.forEach((img) => {
  imageObserver.observe(img)
})

// Add smooth reveal animation for page load
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".hero-content, .hero-image")
  elements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"

    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, index * 200)
  })
})
