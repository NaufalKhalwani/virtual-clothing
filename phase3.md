# IMPLEMENTATION TASK — PHASE 3: T-SHIRT CUSTOMIZATION ENGINE

You have successfully completed Phase 1 (Project Foundation) and Phase 2 (3D T-Shirt Viewer).

Now continue implementing Phase 3 based on the existing codebase.

**IMPORTANT: Do not rebuild the application from scratch. Extend the existing implementation while preserving all working Phase 1 and Phase 2 functionality.**

## 1. OBJECTIVE

Implement a fully functional T-Shirt Customization Engine.

Users must be able to:

1. Upload artwork/images onto the T-shirt.
2. Paste images directly using Ctrl + V.
3. Add custom text onto the T-shirt.
4. Move artwork and text.
5. Resize artwork and text.
6. Rotate artwork and text.
7. Change text color, font, and size.
8. Delete and duplicate design elements.
9. Edit the front and back independently.
10. See every change immediately on the actual 3D T-shirt.

The editing experience must work on desktop, tablet, and mobile.

This is a functional implementation task, not a UI-only task.

---

## 2. FIRST: INSPECT THE EXISTING PROJECT

Before writing code, inspect the existing implementation.

Pay particular attention to:

- Existing project structure.
- `TShirtModel.tsx`.
- `Viewer3D.tsx`.
- `CameraRig.tsx`.
- `ColorEditor.tsx`.
- Existing Zustand stores.
- Existing surface selector.
- Existing GLB model.
- Existing material configuration.
- Existing 3D model mesh names.
- Existing GLB UV coordinates.
- Existing GLB material assignments.

Do not create duplicate components or state stores if equivalent implementations already exist.

Preserve:

- Existing 3D model.
- Existing OrbitControls.
- Existing camera presets.
- Existing lighting.
- Existing color customization.
- Existing responsive layout.
- Existing routing.

The new functionality must integrate with the current architecture.

---

## 3. DEPENDENCIES

Use the existing stack.

Install Fabric.js if it is not already installed.

```bash
npm install fabric
```

Use:

- React.
- TypeScript.
- Three.js.
- React Three Fiber.
- Drei.
- Fabric.js.
- Zustand.
- Tailwind CSS.
- Lucide React.

Do not introduce unnecessary dependencies.

Use the Fabric.js API compatible with the installed version. Check the installed version before implementing the editor.

---

## 4. ARTWORK UPLOAD SYSTEM

Create a reusable image upload component.

Suggested component:

`ArtworkUploader.tsx`

### Supported Upload Methods

Implement:

**Method 1: File picker**

Users can select an image from their device.

**Method 2: Drag and drop**

Users can drag an image from their computer and drop it into the artwork editor.

**Method 3: Clipboard paste**

Users can copy an image and paste it directly using:

`Ctrl + V`

On Mac:

`Cmd + V`

Listen for the appropriate browser paste event.

Support clipboard images where the browser permits access.

Provide a fallback file picker when clipboard access is unavailable.

### Supported Formats

- PNG.
- JPG.
- JPEG.
- WebP.

SVG may be supported only after sanitization.

### Validation

- Maximum file size: 10 MB.
- Validate MIME type.
- Reject invalid files.
- Handle corrupt images.
- Display useful error messages.
- Avoid unsafe SVG content.
- Prevent unnecessary memory usage.

### Upload Behavior

When an image is uploaded:

1. Load the image.
2. Create a Fabric.js image object.
3. Insert it into the currently selected surface.
4. Center it initially.
5. Maintain its original aspect ratio.
6. Make it immediately selectable and editable.
7. Update the corresponding 3D texture.

Users must be able to upload multiple images to one surface.

Do not overwrite existing artwork when adding a new image.

---

## 5. 2D ARTWORK COMPOSITION ENGINE

Create a dedicated reusable composition engine using Fabric.js.

Suggested structure:

```text
src/features/texture-engine/
├── components/
│   └── ArtworkCanvas.tsx
├── services/
│   ├── canvas.service.ts
│   └── texture.service.ts
├── hooks/
│   └── useArtworkCanvas.ts
├── types/
└── utils/
```

The Fabric.js canvas is responsible for composing all artwork elements.

It must support:

- Image objects.
- Text objects.
- Object selection.
- Dragging.
- Scaling.
- Rotation.
- Deletion.
- Duplication.
- Layer ordering.
- Selection controls.
- Canvas clearing.
- Canvas serialization.
- Canvas restoration.

Use an appropriate canvas resolution.

Initial target:

`2048 × 2048`

Make the resolution configurable.

Important:

The 2D canvas must represent the actual editable surface or a correctly defined region of the GLB UV texture.

Do not assume that an arbitrary square canvas can automatically map to the front or back of the garment.

Inspect the model's UV coordinates and material structure before implementing the mapping.

---

## 6. ADD TEXT FUNCTIONALITY

Create a dedicated text editor.

Suggested component:

`TextEditor.tsx`

Users must be able to add text to the currently selected T-shirt surface.

### Text Controls

Implement:

- Text input.
- Font family.
- Font size.
- Font weight.
- Text color.
- Text alignment.
- Rotation.
- Position.
- Duplicate.
- Delete.

Use Fabric.js text objects, preferably `Textbox` when multiline editing is required.

Suggested fonts:

- Inter.
- Arial.
- Roboto.
- Montserrat.
- Oswald.
- Poppins.

Use fonts that are actually available or properly loaded in the browser.

### Text Workflow

1. User clicks Add Text.
2. A new text object appears on the editing canvas.
3. User enters text.
4. User selects the text object.
5. User changes font, size, weight, and color.
6. User moves or rotates the text.
7. The 3D preview updates.

The text must be rendered onto the actual garment texture.

Do not implement text as an HTML overlay on top of the 3D viewer.

---

## 7. FRONT AND BACK SURFACE MANAGEMENT

The T-shirt editor must maintain two independent design surfaces:

```ts
type TShirtSurface = "front" | "back";
```

Expected behavior:

**Front selected:**

- Display the front artwork composition.
- Display front text.
- Allow editing front elements.
- Update the front 3D texture.

**Back selected:**

- Display the back artwork composition.
- Display back text.
- Allow editing back elements.
- Update the back 3D texture.

Switching between surfaces must never erase existing artwork.

When returning to a previously edited surface, all previous elements must be restored.

The selected surface should also update the 3D camera orientation using the existing camera preset implementation.

---

## 8. CRITICAL: UV MAPPING AND 3D TEXTURE INTEGRATION

This is the most important part of Phase 3.

The uploaded artwork and text must appear on the actual 3D T-shirt.

Do not simply display the uploaded image inside the editing panel.

Do not use an HTML overlay over the 3D canvas.

Do not use a static PNG mockup as the final result.

### Step 1: Inspect the GLB

Inspect:

- Scene graph.
- Mesh names.
- Geometry.
- UV attributes.
- Material assignments.
- Existing texture maps.
- UV orientation.

Determine whether the front and back use:

1. Separate meshes and materials.
2. Separate UV regions within one mesh.
3. One shared UV atlas.

Document the actual structure before selecting the implementation strategy.

### Step 2: Define Surface Mapping

Create an explicit mapping configuration.

Example:

```ts
interface GarmentSurfaceMapping {
  surface: "front" | "back";
  meshName: string;
  materialIndex?: number;
  textureResolution: number;
}
```

Adapt this configuration to the actual GLB structure.

Do not invent mesh names or UV coordinates.

### Step 3: Generate Textures

Use CanvasTexture to create the 3D texture.

Conceptual implementation:

```ts
const texture = new THREE.CanvasTexture(canvas);

texture.colorSpace = THREE.SRGBColorSpace;
texture.needsUpdate = true;
```

Apply the generated texture to the appropriate mesh material.

Preserve the existing fabric color and material appearance.

If using a shared UV atlas, correctly composite the front and back artwork into their respective UV regions.

If using separate materials, update only the selected surface material.

### Step 4: Real-Time Synchronization

When a user:

- Adds an image.
- Adds text.
- Moves an image.
- Resizes an image.
- Rotates an image.
- Changes text color.
- Changes font size.
- Deletes an element.

The corresponding 3D texture must update.

Use an efficient update mechanism.

Avoid recreating the entire GLB scene or all materials for every edit.

Dispose old textures and GPU resources when they are no longer needed.

### Step 5: Preserve Garment Color

The existing fabric color customization must continue working.

Artwork must not disappear when the user changes the T-shirt color.

Changing the garment color must not unintentionally recolor uploaded artwork.

Use an appropriate material and texture compositing strategy.

### Step 6: Verify Texture Orientation

Verify:

- Front artwork is not mirrored.
- Back artwork is not mirrored.
- Images are not upside down.
- Text is readable.
- Artwork does not appear on the wrong surface.
- Artwork does not unexpectedly wrap across seams.
- Texture mapping remains correct when rotating the garment.

If the existing GLB model does not provide sufficient UV separation for accurate front/back editing, report the limitation instead of pretending the mapping is correct.

---

## 9. ZUSTAND STATE MANAGEMENT

Extend the existing designer store.

Do not create a duplicate store if an appropriate store already exists.

Suggested types:

```ts
interface ArtworkElement {
  id: string;
  type: "image" | "text";
  assetId?: string;
  content?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  zIndex: number;
}

interface SurfaceDesign {
  color: string;
  elements: ArtworkElement[];
}

interface TShirtDesignerState {
  selectedSurface: "front" | "back";

  surfaces: {
    front: SurfaceDesign;
    back: SurfaceDesign;
  };

  selectedElementId: string | null;
  isDirty: boolean;
}
```

The final implementation must use types compatible with Fabric.js object transformations and project serialization.

Implement actions for:

```ts
selectSurface(surface);

addImage(surface, image);

addText(surface, text);

updateElement(surface, elementId, updates);

removeElement(surface, elementId);

duplicateElement(surface, elementId);

selectElement(elementId);

undo();

redo();
```

Do not store large binary image data in Zustand.

Keep image asset references and editable element metadata separate.

---

## 10. UNDO AND REDO

Implement design history.

Support:

- Undo image insertion.
- Undo image movement.
- Undo image resize.
- Undo rotation.
- Undo text insertion.
- Undo text editing.
- Undo deletion.
- Redo previous actions.

Use a history mechanism that avoids generating excessive snapshots during continuous dragging.

Keep history independent for front and back surfaces or ensure history entries identify their surface.

Keyboard shortcuts:

- Ctrl + Z: Undo.
- Ctrl + Shift + Z: Redo.
- Cmd + Z: Undo on Mac.
- Cmd + Shift + Z: Redo on Mac.
- Delete: Delete selected object.

Shortcuts must not interfere with text input.

---

## 11. USER INTERFACE

Extend the existing designer interface.

Preserve the current design language and layout.

### Desktop

The interface should provide:

**Left Toolbar**

- Select.
- Upload Artwork.
- Add Text.
- Layers.

**Center**

- Actual 3D T-shirt preview.
- Camera controls.
- Front/back presets.
- Zoom controls.
- Reset camera.

**Right Panel**

Contextual editing panel.

When no element is selected:
- Color editor.
- Upload artwork.
- Add text.
- Surface information.

When an image is selected:
- Position.
- Width.
- Height.
- Scale.
- Rotation.
- Opacity.
- Duplicate.
- Delete.

When text is selected:
- Text content.
- Font family.
- Font size.
- Font weight.
- Text color.
- Alignment.
- Rotation.
- Duplicate.
- Delete.

### Mobile

Adapt the editor to a vertical layout.

Requirements:

- Keep the 3D preview visible.
- Provide a bottom editing panel.
- Use touch-friendly controls.
- Support touch selection and manipulation.
- Provide a horizontal front/back selector.
- Avoid horizontal overflow.
- Avoid overlapping the 3D viewport with editing controls.

Ensure that artwork manipulation does not accidentally trigger camera rotation.

---

## 12. RESPONSIVE REQUIREMENTS

Test:

- 320px.
- 375px.
- 390px.
- 768px.
- 1024px.
- 1280px.
- 1440px.

Requirements:

- Responsive 3D canvas.
- Responsive artwork editor.
- Responsive toolbar.
- Responsive editing panel.
- Touch-friendly interactions.
- No horizontal scrolling.
- No clipped controls.

Do not simply scale down desktop UI.

---

## 13. ACCEPTANCE CRITERIA

Phase 3 is complete only when all of the following work.

### Image Upload

- [ ] Upload PNG.
- [ ] Upload JPG.
- [ ] Upload WebP.
- [ ] Drag and drop.
- [ ] Clipboard paste.
- [ ] Multiple images on one surface.
- [ ] Image selection.
- [ ] Image movement.
- [ ] Image resizing.
- [ ] Image rotation.
- [ ] Image duplication.
- [ ] Image deletion.

### Text Editor

- [ ] Add text.
- [ ] Edit text content.
- [ ] Change font.
- [ ] Change font size.
- [ ] Change font weight.
- [ ] Change text color.
- [ ] Move text.
- [ ] Resize text.
- [ ] Rotate text.
- [ ] Delete text.

### 3D Integration

- [ ] Artwork appears on the actual 3D T-shirt.
- [ ] Text appears on the actual 3D T-shirt.
- [ ] Front artwork maps correctly.
- [ ] Back artwork maps correctly.
- [ ] Front and back remain independent.
- [ ] 360-degree rotation works.
- [ ] Texture orientation is correct.
- [ ] Changing fabric color preserves artwork.
- [ ] Texture updates happen without reloading the GLB model.

### History

- [ ] Undo works.
- [ ] Redo works.
- [ ] History does not lose previous surface designs.

### Responsive

- [ ] Desktop works.
- [ ] Tablet works.
- [ ] Mobile works.
- [ ] Touch editing works.

---

## 14. DEVELOPMENT WORKFLOW

Implement in the following order:

1. Inspect GLB UV mapping and materials.
2. Document actual front/back texture mapping.
3. Implement Fabric.js composition canvas.
4. Implement image upload.
5. Implement clipboard paste.
6. Implement image manipulation.
7. Implement text editing.
8. Implement front/back surface management.
9. Implement CanvasTexture integration.
10. Verify artwork on the actual 3D model.
11. Implement undo/redo.
12. Refine responsive UI.
13. Run tests and verify the entire flow.

Do not proceed to Jersey Designer, Supabase integration, or other phases yet.

Focus exclusively on making the T-Shirt Designer fully functional.

---

## 15. FINAL REPORT

After implementation, provide:

1. Files created.
2. Files modified.
3. Dependencies added.
4. Actual GLB mesh/material structure.
5. UV mapping strategy.
6. How front and back textures work.
7. How image uploads work.
8. How text rendering works.
9. How undo/redo works.
10. Responsive behavior.
11. TypeScript check results.
12. Lint results.
13. Production build results.
14. Known limitations.

Include evidence that uploaded artwork and text are actually visible on the 3D T-shirt.

Do not report success based only on a working UI.

**Final objective: Users must be able to upload or paste an image, add custom text, edit both elements, and see them accurately applied to the real 3D T-shirt while rotating it 360 degrees.**