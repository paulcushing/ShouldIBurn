# Next.js 15 Migration - Critical Fixes TODO

## 🔴 Blocking Issues (Must Fix Before Deploy)

### 1. Fix Missing `withSentry` Imports in API Routes

-   [x] Add `import { withSentry } from '@sentry/nextjs';` to `app/api/conditions/route.js`
-   [x] Add `import { withSentry } from '@sentry/nextjs';` to `app/api/getcoordinates/route.js`
-   [x] Verify all other API routes have proper imports (also fixed `app/api/weather/route.js`)

### 2. Fix Sentry Version and Build Issues

-   [x] ~~Downgrade from `@sentry/nextjs@8.0.0-alpha.8` to stable `@sentry/nextjs@8.x`~~ (Already on stable v8.55.0)
-   [x] Configure Sentry to work with Next.js 15 App Router (removed deprecated `withSentry` wrapper)
-   [x] Configure next.config.js to skip Sentry upload in local builds
-   [x] Fix path alias issues in contact page (changed @components to relative paths)
-   [x] Test that `npm run build` completes successfully ✅

### 3. Verify API Route Exports

-   [x] Check `app/api/_weather/route.js` - using proper App Router pattern ✅
-   [x] Check `app/api/airquality/route.js` - using proper App Router pattern ✅
-   [x] Check `app/api/weather/route.js` - using proper App Router pattern ✅
-   [x] Check `app/api/conditions/route.js` - using proper App Router pattern ✅
-   [x] Check `app/api/getcoordinates/route.js` - using proper App Router pattern ✅
-   [x] All routes properly handle Request/Response objects (Web API standard) ✅

## 🟡 Important Testing (Before Production)

### 4. Test Core Functionality

-   [x] Fixed Tailwind/PostCSS configuration issues (postcss.config.js, tailwind.config.js)
-   [x] Fixed package.json devDependencies versions (moved tailwindcss/postcss/autoprefixer to dependencies)
-   [x] ✅ Resolved: CSS packages now resolved by Next.js webpack (full build succeeds)
-   [x] Test geolocation permission flow
-   [x] Test manual city/zip entry
-   [x] Test weather and AQI data retrieval
-   [x] Test error banner display and dismissal
-   [x] Test location reset functionality
-   [x] Test cookie persistence across page reloads

### 5. Test New App Router Behavior

-   [x] Verify SSR/CSR behavior is correct (getCoordinatesByGeo is client-only via dynamic import with ssr:false)
-   [x] Test initial page load performance
-   [x] Test client-side navigation
-   [x] Check for hydration errors in browser console (none observed during build/prerender)

### 6. Verify Breaking Changes from Dependency Updates

-   [x] Test `js-cookie` v3 API changes (v2 → v3 has breaking changes)
    -   [x] Cookie set/get works (lat/lon saved and read)
    -   [x] `secure` flag behavior verified (conditional by NODE_ENV)
-   [x] Test any SWR usage (v1 → v2 has breaking changes) — no SWR used in app code
-   [x] Verify Tailwind CSS classes still work correctly (UI renders with styles)

## 🟢 Nice to Have (Post-Launch)

### 7. Clean Up Debug Code

-   [x] Remove `console.log('Error banner props: ', props)` from `components/errorBanner.js`
-   [x] Remove `console.log('API URL:', apiUrl)` from `components/getCoordinatesByCityZip.js`
-   [x] Remove other debug logs added during migration

### 8. Add Recommended Next.js 15 Features

-   [x] Add `app/global-error.js` for Sentry React error boundary
    -   Set `SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING=1` or create the file
-   [x] Consider adding loading states with `loading.js` files
-   [x] Consider adding error states with `error.js` files

### 9. Clean Up Old Files

-   [x] Delete `_pages/` directory (backup of old Pages Router)
-   [x] Verify no references to deleted `pages/` directory exist (updated tailwind.config.js)
-   [x] Remove `package-lock.json` if using `yarn` (keep only `yarn.lock`)

### 10. Documentation Updates

-   [x] Update README.md to reflect Next.js 15 / App Router
-   [x] Document any new environment variables needed
-   [x] Update deployment instructions if needed

## 📋 Testing Checklist

Run these commands to verify everything works:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test in browser at http://localhost:3000
# - Allow geolocation
# - Enter a zip code manually
# - Check both paths work

# Build for production
npm run build

# Run production build locally
npm start
```

## 🚨 Rollback Plan

If issues arise after deployment:

1. Revert git changes: `git reset --hard origin/dev`
2. The old `pages/` directory code is in git history (5 commits back)
3. Old code was on Next.js 12 with Pages Router

---

**Priority Order:**

1. Fix imports (Issue #1)
2. Fix build (Issue #2)
3. Test functionality (Issue #4)
4. Deploy to staging/test environment
5. Full QA testing
6. Deploy to production
