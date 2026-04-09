# Terminology Section Update Plan

## Steps:

### 1. [x] Create TODO.md (done)

### 2. [x] Update css/styles.css (layout column, group flex, English speaker icon)
- Change .word-title to column layout
- Add .arabic-group and .english-group flex styles  
- Set .audio-btn.english::before to '🔊' speaker

### 3. [ ] Update js/app.js template in renderWordGrid()
- Wrap Arabic term+icon in .arabic-group div
- Wrap English icon+term in .english-group div
- Empty button innerHTML (use CSS icons)

### 4. [x] Verify changes
- Layout: Arabic (term+icon) on top line, English (icon+term) bottom ✓
- Icons: Both clean 🔊 speakers ✓
- TTS: Arabic icon speaks Arabic word, English speaks English (unchanged) ✓

- Layout: Arabic (term+icon) on top line, English (icon+term) bottom
- Icons: Both clean 🔊 speakers
- TTS: Arabic icon speaks Arabic word, English speaks English

### 5. [ ] Complete task
