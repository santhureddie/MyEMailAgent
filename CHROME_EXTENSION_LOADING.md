# How to Load EmailAgent Extension in Chrome

## Step-by-Step Instructions

### 1. Build the Extension First
Make sure the extension is built before loading:

```bash
# Navigate to your project directory
cd MyEMailAgent

# Build the extension (creates the dist folder)
npm run build:extension
```

You should see output like:
```
✓ built in 881ms
dist/index.css     8.40 kB │ gzip:  2.22 kB
dist/gmail-injector.js    0.51 kB │ gzip:  0.34 kB
dist/service-worker.js    0.75 kB │ gzip:  0.48 kB
dist/sidebar.js   146.56 kB │ gzip: 46.65 kB
```

### 2. Open Chrome Extensions Page
1. Open Google Chrome browser
2. Type `chrome://extensions/` in the address bar and press Enter
3. **OR** click the three dots menu → More tools → Extensions

### 3. Enable Developer Mode
1. Look for the "Developer mode" toggle in the top-right corner
2. Click the toggle to turn it ON (it should turn blue)
3. You'll see new buttons appear: "Load unpacked", "Pack extension", "Update"

### 4. Load the Extension
1. Click the **"Load unpacked"** button
2. A file browser window will open
3. Navigate to your project folder: `MyEMailAgent`
4. Go into the `extension` folder
5. **IMPORTANT**: Select the `dist` folder (NOT the `extension` folder itself)
6. Click "Select Folder" or "Open"

### 5. Verify Extension is Loaded
After loading, you should see:
- EmailAgent extension card appears in the extensions list
- Extension ID (something like: `abcdefghijklmnopqrstuvwxyz123456`)
- Status shows as "On" with a blue toggle
- No error messages

### 6. Test the Extension
1. Open Gmail in a new tab: `https://mail.google.com`
2. Log into your Gmail account
3. **Expected Result**: You should see the EmailAgent sidebar appear on the right side of Gmail

## Visual Guide

```
Chrome Extensions Page Layout:
┌─────────────────────────────────────────┐
│ chrome://extensions/                     │
├─────────────────────────────────────────┤
│ [Developer mode] ←── Turn this ON       │
│                                         │
│ [Load unpacked] [Pack extension] [Update]│
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ EmailAgent                          │ │
│ │ Extension ID: abc123...             │ │
│ │ [Details] [Remove] [Errors] [ON]    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## File Structure You Should Have

```
MyEMailAgent/
├── extension/
│   ├── dist/           ← SELECT THIS FOLDER
│   │   ├── manifest.json
│   │   ├── gmail-injector.js
│   │   ├── service-worker.js
│   │   ├── sidebar.js
│   │   └── index.css
│   ├── src/
│   └── package.json
├── backend/
└── shared/
```

## Common Issues & Solutions

### ❌ "Manifest file is missing or unreadable"
**Problem**: You selected the wrong folder
**Solution**: Make sure you select `extension/dist/` not `extension/`

### ❌ "Failed to load extension"
**Problem**: Extension wasn't built properly
**Solution**: Run `npm run build:extension` again

### ❌ Extension loads but doesn't appear in Gmail
**Problem**: Backend server not running
**Solution**: Make sure backend is running with `npm run dev:backend`

### ❌ "This extension may have been corrupted"
**Problem**: Build files are incomplete
**Solution**: 
1. Delete the `extension/dist` folder
2. Run `npm run build:extension` again
3. Reload the extension

## Updating the Extension

When you make changes to the code:

1. **Rebuild the extension**:
   ```bash
   npm run build:extension
   ```

2. **Reload in Chrome**:
   - Go to `chrome://extensions/`
   - Find EmailAgent extension
   - Click the refresh/reload icon (circular arrow)

3. **Refresh Gmail**:
   - Reload your Gmail tab to see changes

## Debugging Extension Issues

### Check Extension Console
1. Go to `chrome://extensions/`
2. Find EmailAgent extension
3. Click "Inspect views: service worker"
4. Check for any error messages in the console

### Check Gmail Console
1. Open Gmail
2. Right-click → "Inspect" → "Console" tab
3. Look for any JavaScript errors related to EmailAgent

### Check Network Requests
1. Open Gmail with DevTools (F12)
2. Go to "Network" tab
3. Use EmailAgent features
4. Look for requests to `localhost:3001`

## Success Indicators

✅ **Extension appears in chrome://extensions/**
✅ **No error messages in extension card**
✅ **EmailAgent sidebar visible in Gmail**
✅ **Backend server running on port 3001**
✅ **No console errors in Gmail**

## Quick Troubleshooting Checklist

- [ ] Extension built successfully (`npm run build:extension`)
- [ ] Developer mode enabled in Chrome
- [ ] Selected `extension/dist/` folder (not `extension/`)
- [ ] Backend server running (`npm run dev:backend`)
- [ ] No errors in chrome://extensions/
- [ ] Gmail page refreshed after loading extension

Follow these steps exactly and your EmailAgent extension should load successfully in Chrome!
