
# 🖌️ Stateless 2D Canvas Editor

A lightweight **web-based 2D canvas editor** where users can draw shapes, add text, freehand sketch, and **share a live canvas via a public link**—no login required.
Built with **React, Tailwind CSS, Firebase (Firestore), and Fabric.js**.

---

## 🚀 Features

* **Shape Tools**: Add rectangles, circles, ellipses, and text with one click.
* **Pen Tool**: Freehand drawing with adjustable color.
* **Color Picker**: Change shape or pen colors instantly.
* **Undo/Redo**: Step backward or forward through your edits.
* **Export Options**: Save your canvas as **PNG** or **SVG**.
* **Shareable Links**: Each canvas has a unique URL stored in Firestore so others can view or collaborate.
* **Snap-to-Grid**: Shapes auto-align for cleaner layouts.

---

## ⚡ Tech Stack

* **React + Vite** for a fast and modern frontend.
* **Tailwind CSS** for responsive styling.
* **Firebase Firestore** for real-time saving and sharing.
* **Fabric.js** for canvas manipulation (shapes, drawing, text editing).

---

## 🔧 Trade-offs & Decisions

1. **Firestore as the Backend**

   * ✅ Simple, real-time database for quick collaboration.
   * ⚠️ Limited to Firebase’s ecosystem; no custom backend logic.

2. **Fabric.js vs. Custom Canvas**

   * ✅ Faster development with built-in shape, text, and export features.
   * ⚠️ Larger bundle size compared to a custom HTML5 Canvas implementation.

3. **Debounced Auto-Save**

   * ✅ Prevents excessive Firestore writes and keeps UI smooth.
   * ⚠️ Changes may take a short delay to appear for collaborators.

---

## 🎁 Bonus Features

* **Hover Tooltips** on all toolbar buttons.
* **Animated Icons** with smooth transitions.
* **Snap-to-Grid** for cleaner shape placement.
* **Mobile-Friendly** sidebars for tools and operations.

---

## ▶️ Getting Started

1. **Clone this repo**

   ```bash
   git clone https://github.com/yourusername/canvas-editor.git
   cd canvas-editor
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Firebase**

   * Create a Firebase project.
   * Add your config in `firebase.js`.

4. **Run locally**

   ```bash
   npm run dev
   ```

---

## 📸 Demo Screenshot

<img width="1912" height="908" alt="image" src="https://github.com/user-attachments/assets/cae1f3d9-e815-4f47-beca-8bc1bbdcd44d" />


---

## 🙏 Acknowledgments

Special thanks to **React**, **Tailwind**, **Firebase**, and **Fabric.js** for making this project possible.

---
