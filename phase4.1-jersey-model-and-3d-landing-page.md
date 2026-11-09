# Phase 4.1 — Jersey 3D Integration & Landing Page Redesign

## Project Context

Project: Virtual Clothing Designer  
Directory: `D:\fullstack\virtual_desgin`

The application already has:
- React + TypeScript + Vite
- Three.js and React Three Fiber
- Drei
- Zustand
- Fabric.js
- T-shirt 3D customization
- Artwork and text editor
- Dark Mode and Light Mode
- Jersey editor foundation with six independent design surfaces

Continue the existing implementation. Do not rebuild the application.

# PART 1 — JERSEY 3D MODEL INTEGRATION

## Objective

Complete the Jersey Customizer by integrating an actual sports jersey 3D model.

Currently, `public/models/jersey.glb` is missing. The existing JerseyViewer3D only provides the viewer stage and interaction controls.

## Model Requirements

Find or prepare a suitable sports jersey GLB model.

Requirements:
- Actual sports jersey geometry, not a T-shirt substitute.
- Proper front and back geometry.
- Left and right sleeves.
- Shoulder areas.
- Valid UV coordinates.
- Suitable material assignments.
- Compatible with Three.js and GLTFLoader.

If searching for an existing model online, verify its license and suitability before using it.

Place the validated model at:

`public/models/jersey.glb`

Do not create a fake model or claim successful integration without loading and inspecting the actual asset.

## Six Design Surfaces

Integrate the six existing independent design surfaces:

1. Front
2. Back
3. Left
4. Right
5. Left Shoulder
6. Right Shoulder

Each surface must have its own design canvas, artwork, text, layers, and texture mapping.

Verify that each design appears on the correct physical area of the jersey.

Inspect the actual GLB mesh, material, and UV coordinates before deciding the texture mapping strategy.

Do not guess UV positions.

Prevent mirrored artwork, incorrect orientation, texture bleeding, and unintended projection across seams.

Reuse the existing Fabric.js editor and Zustand architecture.

## Jersey Viewer

Complete:
- 360-degree rotation.
- Zoom controls.
- Front, back, left, right, and isometric camera presets.
- Studio lighting.
- Realistic shadows.
- Accurate artwork preview.

Ensure the existing jersey color customization works with the actual model materials.

If a valid model cannot be obtained, report the blocker transparently and do not mark model integration as completed.

# PART 2 — 3D LANDING PAGE REDESIGN

## Objective

Redesign the existing landing page into a premium, modern, interactive 3D clothing design platform.

The current landing page is too empty and relies heavily on centered text and buttons.

The new landing page should immediately communicate that this is an interactive 3D garment customization application.

## Hero Section

Create a visually impressive hero section.

Desktop layout:
- Left: headline, supporting description, CTA buttons, and feature highlights.
- Right: large interactive 3D garment preview.

Use the existing `tshirt.glb` model for the hero if suitable.

The 3D model should:
- Be clearly visible.
- Have realistic studio lighting.
- Support mouse drag rotation.
- Have subtle automatic rotation when idle.
- Support responsive resizing.
- Have a clean presentation without unnecessary UI clutter.

Do not use a static image as a substitute for the actual 3D viewer.

Use the jersey model in the showcase only after it has been successfully integrated.

## Hero Content

Use polished English copy consistent with the existing brand.

Suggested headline:

"Design Your Style.
See It in 3D."

Supporting text:

"Create custom T-shirts and sports jerseys with an interactive 3D design studio. Customize colors, add artwork, and preview every detail before production."

Primary CTA:
"Start Designing"

Secondary CTA:
"Explore Garments"

Make the CTA buttons navigate to the correct existing routes.

## Garment Showcase

Create a section introducing available garment types.

Show:
- T-Shirt
- Sports Jersey

Use actual 3D models where available.

Each garment card should have:
- Product preview.
- Garment name.
- Short description.
- Start Designing action.

Do not display a jersey 3D preview if the jersey model is unavailable.

## How It Works

Create a visually engaging section showing the workflow:

1. Choose Your Garment.
2. Customize Colors.
3. Upload Artwork and Add Text.
4. Preview Your Design in 3D.

Use clean illustrations or UI previews where necessary.

## Features Section

Highlight:
- Interactive 360-degree 3D preview.
- Custom fabric colors.
- Artwork upload.
- Typography customization.
- Front and back design.
- Jersey customization.
- Dark and Light Mode.

Only advertise features that are actually implemented.

## Final CTA

Add a strong closing section encouraging users to start designing their own clothing.

## Visual Design Direction

The visual direction should feel like a premium 3D design studio.

Use:
- Clean typography.
- Strong visual hierarchy.
- Generous spacing.
- Professional composition.
- Subtle animations.
- Refined borders and shadows.
- Consistent blue accent colors.
- High-quality 3D presentation.

Avoid:
- Excessive gradients.
- Excessive glassmorphism.
- Generic AI-generated landing page patterns.
- Too many decorative cards.
- Unnecessary animations.
- Oversized empty spaces.
- Static garment placeholders.

## Dark Mode and Light Mode

Fully support the existing theme system.

Ensure:
- All sections adapt to both themes.
- Text remains readable.
- 3D stage backgrounds adapt appropriately.
- Theme changes do not modify garment materials or design textures.
- Theme preference remains persistent.

## Responsive Design

Optimize for:
- 320px
- 375px
- 390px
- 768px
- 1024px
- 1280px
- 1440px

On mobile:
- Stack hero content vertically.
- Keep the 3D garment preview prominent.
- Ensure CTA buttons are accessible.
- Avoid horizontal overflow.
- Maintain good performance.

## Performance

Because the landing page now contains a 3D viewer:

- Lazy-load 3D assets where appropriate.
- Avoid loading the same GLB multiple times unnecessarily.
- Dispose of Three.js resources correctly.
- Optimize rendering.
- Respect reduced-motion preferences.
- Keep the page responsive on lower-powered devices.

# PART 3 — VALIDATION

Verify:

1. Landing page displays a real interactive 3D T-shirt.
2. T-shirt can rotate smoothly.
3. Hero layout works on desktop and mobile.
4. CTA buttons navigate correctly.
5. Garment showcase uses valid assets.
6. Jersey model loads successfully if available.
7. All six jersey design surfaces map correctly.
8. Dark Mode and Light Mode work throughout.
9. Existing T-shirt customization remains functional.
10. No console errors or resource leaks.

Run:

```bash
npx tsc -b
npm run lint
npm run build
```

Fix all errors.

# FINAL REPORT

Provide:
- New and modified files.
- Jersey model source and license, if downloaded.
- Actual mesh, material, and UV mapping findings.
- Status of all six jersey surfaces.
- Landing page improvements.
- Responsive testing results.
- Performance considerations.
- TypeScript, ESLint, and build results.
- Remaining limitations.

Do not claim completion for features that are only placeholders or partially implemented.