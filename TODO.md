# TODO.md

## 🎯 **Trackify Enhancement Plan**

A list of upcoming improvements to optimize the UI/UX, enhance functionality, and add new features.

---

### 🔄 **Search Component**

- [ ] **Improve Loading Indicator for Spotify Embed**
  - Add a more prominent and visually engaging animation for the embed loading state using Tailwind CSS.
  - Consider customizing the animation to fit the app’s theme.
- [ ] **Track Status Indicator**
  - Show a small label or icon next to tracks that are already added to the playlist.
  - Ensure the indicator is subtle but visible (e.g., a checkmark overlay or "Added" badge).

---

### 📜 **Playlist Component**

- [ ] **Drag-and-Drop Track Reordering**
  - Implement drag-and-drop functionality to reorder tracks in the playlist.
  - Use `react-dnd` or another library for smooth reordering.
- [ ] **Success Feedback for Removal**

  - Add a brief success animation or message when a track is removed from the playlist.
  - Consider a fading animation or toast notification for feedback.

- [ ] **Playlist Item Spacing Adjustment**
  - Further refine the alignment of track titles and remove buttons for optimal spacing on different screen sizes.

---

### 🔧 **General Improvements**

- [ ] **Optimize Mobile Responsiveness**
  - Ensure the UI adapts seamlessly to smaller screens.
  - Test and tweak button sizes, padding, and text scaling for mobile.
- [ ] **Error Handling and Alerts**
  - Add better error handling for failed Spotify API calls.
  - Provide user-friendly error messages or alerts.

---

## 🏁 **Completed Tasks**

- [x] Improved Playlist Component layout
- [x] Compact playlist item rows with aligned remove buttons
- [x] Enhanced active preview feedback in search results
- [x] Added tooltips for preview buttons
