# 🌟 HUMDRUM

A collection of custom animations and interactions for Webflow sites! This library makes your Webflow projects come alive with delightful animations.

## 🎯 Quick Start
1. Add these scripts to your Webflow project:
```html
<!-- Before </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>
```

## ⚡️ Core Features

### 🎮 Hero Section - Drag & Drop
Custom attributes needed in Webflow:
```html
[hero-drag="1"] <!-- For draggable elements -->
[hero-drop="1"] <!-- For dropzones -->
```
The drag area uses collision detection to match elements with their corresponding dropzones.

### 🎪 Mission Section
Required classes in Webflow:
- `.mission_item` - For animated elements
- `.mission_list` - Container for the animation
- `.h-mission-labels-wrapper` - For interactive labels

Features special hover states and responsive animations based on screen size.

### ⏳ Journey Timeline
Set up in Webflow:
```html
<div class="journey_timeline-track">
  <!-- Timeline content -->
</div>
<div class="journey_progress-bar"></div>
```
Creates a horizontal scrolling timeline with progress tracking.

### 👥 Profile Section
Webflow classes needed:
```html
.profiles_radio <!-- For radio buttons -->
.profiles_box-item <!-- For profile boxes -->
.swiper <!-- For mobile slider -->
```
Handles both desktop and mobile experiences with a custom radio system.

### 🍔 Navigation Menu
Required elements:
```html
.navbar_menu-button
.nav_menu-left-mask
.navbar_menu_master
```
Features a morphing hamburger menu and smooth transitions.

## 🎨 Animation Types

### 1️⃣ Scroll Animations
```html
<div data-scroll-anim="element">
  <!-- Content will animate on scroll -->
</div>
```

### 2️⃣ Hover States
Custom hover effects for:
- Navigation items
- CTA elements
- Mission labels

### 3️⃣ Mobile Interactions
- Custom Swiper implementation
- Responsive breakpoints
- Touch-friendly interfaces

## 🛠️ Customization

### Adding New Animations
1. Create your animation class in Webflow
2. Add the corresponding selector in the JS
3. Configure GSAP timeline
```javascript
let customTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".your-class"
  }
});
```

## 📱 Responsive Design
Built-in breakpoints:
- Desktop: 992px+
- Tablet: 768px - 991px
- Mobile: < 768px

## 🚀 Performance Tips
- Enable "Optimize for Performance" in Webflow settings
- Minimize number of animated elements
- Use `will-change` for heavy animations

## 🎯 Common Issues

### Animation Not Working?
1. Check custom attributes
2. Verify class names
3. Check console for errors

### Mobile Performance
- Reduce animation complexity
- Use `transform` instead of position
- Enable hardware acceleration

## 🌟 Examples
Check out our [demo site](example.com) to see these animations in action!

---

💡 **Need Help?**
- Check our [FAQ section](#)
- Join our [Discord community](#)
- Open an issue

Made with ❤️ for Webflow creators

#webflow #animation #javascript #gsap
