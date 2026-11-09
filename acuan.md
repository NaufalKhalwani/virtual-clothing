# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
# Virtual Clothing Designer — 3D T-Shirt & Jersey Customizer

**Document Type:** Software Requirements Specification & Technical Implementation Guide  
**Project Type:** Responsive 3D Web Application  
**Version:** 1.0.0  
**Status:** Ready for Implementation  
**Language:** Indonesian (documentation), English (code identifiers)  

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

Virtual Clothing Designer adalah aplikasi web berbasis 3D yang memungkinkan pengguna mendesain pakaian secara interaktif melalui browser.

Pengguna dapat memilih jenis pakaian, mengubah warna, menambahkan gambar, logo, teks, dan pola pada berbagai bagian pakaian, kemudian melihat hasil desain secara langsung menggunakan model 3D yang dapat diputar 360 derajat.

Aplikasi memiliki dua mode utama:

1. **T-Shirt Designer**
   - Customization untuk kaos polos.
   - Mengubah warna seluruh kaos.
   - Menambahkan gambar pada bagian depan dan belakang.
   - Mengatur posisi, ukuran, rotasi, dan layer gambar.
   - Melihat hasil desain dalam 3D secara real-time.

2. **Jersey Designer**
   - Customization untuk jersey olahraga.
   - Mengubah warna setiap bagian jersey.
   - Menambahkan gambar, logo, sponsor, nomor, nama, dan pola.
   - Mengedit bagian depan, belakang, kanan, kiri, bahu kanan, dan bahu kiri secara terpisah.
   - Melihat hasil desain dalam 3D secara real-time.

Aplikasi harus memiliki tampilan modern, profesional, minimalis, intuitif, dan responsive pada desktop, tablet, serta smartphone.

## 1.2 Product Vision

Membangun platform virtual clothing customization yang memungkinkan pengguna membuat desain pakaian tanpa harus memiliki kemampuan desain grafis profesional.

Pengguna harus dapat:
- Melihat pakaian dalam bentuk 3D.
- Memutar model pakaian dari berbagai sudut.
- Mengubah warna pakaian.
- Mengunggah gambar dari perangkat.
- Melakukan paste gambar dari clipboard.
- Memindahkan, memperbesar, memperkecil, dan memutar gambar.
- Mengedit setiap bagian pakaian secara independen.
- Menyimpan desain.
- Mengunduh hasil desain.

## 1.3 Target Users

1. Individu yang ingin membuat desain kaos custom.
2. Tim olahraga yang ingin membuat desain jersey.
3. Komunitas dan organisasi.
4. Desainer pakaian.
5. Pemilik bisnis merchandise.
6. Vendor konveksi dan percetakan pakaian.

## 1.4 Core Product Principles

- Real 3D, bukan sekadar gambar mockup.
- Real-time preview.
- Accurate texture mapping.
- Intuitive editing experience.
- Responsive across devices.
- Modular and maintainable architecture.
- Performance-conscious rendering.
- Reliable project persistence.

---

# 2. TECHNOLOGY STACK

Gunakan teknologi berikut sebagai standar implementasi.

## 2.1 Frontend

| Technology | Purpose |
|---|---|
| React | UI framework |
| TypeScript | Static typing |
| Vite | Development server dan build tool |
| Tailwind CSS | Responsive styling |
| React Router DOM | Client-side routing |
| Zustand | Global state management |
| Lucide React | Icon library |
| Zod | Data validation |

## 2.2 3D Rendering Engine

| Technology | Purpose |
|---|---|
| Three.js | Core 3D rendering engine |
| React Three Fiber | React renderer untuk Three.js |
| @react-three/drei | 3D helpers dan controls |
| GLTF / GLB | 3D model format |
| Blender | 3D model preparation |
| Canvas API | Texture composition |
| Fabric.js | 2D interactive image editor |
| @use-gesture/react | Optional advanced touch interactions |

### Important

Three.js dan React Three Fiber merupakan bagian paling penting dari aplikasi.

Jangan menggunakan:
- Static PNG sebagai pengganti 3D model.
- CSS transform sebagai simulasi rotasi 3D.
- Gambar kaos depan dan belakang yang hanya diganti berdasarkan tombol.
- Fake 3D mockup yang tidak memiliki geometry dan material sungguhan.

Gunakan model 3D berbasis GLB yang benar-benar bisa diputar menggunakan OrbitControls.

## 2.3 Backend & Database

Gunakan Supabase sebagai backend platform.

| Technology | Purpose |
|---|---|
| Supabase Auth | Authentication |
| PostgreSQL | Database |
| Supabase Storage | Image dan asset storage |
| Supabase Row Level Security | Data access control |
| Supabase JavaScript SDK | Frontend integration |

Backend tidak perlu dibuat menggunakan Express atau framework backend tambahan untuk MVP.

## 2.4 Development Tools

| Tool | Purpose |
|---|---|
| ESLint | Code quality |
| Prettier | Code formatting |
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Playwright | End-to-end testing |
| Git | Version control |

## 2.5 Deployment

- Frontend: Vercel.
- Database: Supabase PostgreSQL.
- Image storage: Supabase Storage.
- 3D assets: Static public assets atau storage/CDN yang mendukung caching.

---

# 3. APPLICATION ARCHITECTURE

Gunakan feature-based architecture.

Pisahkan UI, state management, business logic, rendering engine, dan data persistence.

## 3.1 High-Level Architecture

```text
                    USER
                     |
                     v
             REACT APPLICATION
                     |
          +----------+----------+
          |                     |
          v                     v
    DESIGNER INTERFACE      APPLICATION STATE
          |                     |
          |                  ZUSTAND
          |                     |
    +-----+------+              |
    |            |              |
    v            v              |
  T-SHIRT      JERSEY            |
  EDITOR       EDITOR            |
    |            |              |
    +------+-----+--------------+
           |
           v
     TEXTURE ENGINE
           |
           v
     CANVAS COMPOSITOR
           |
           v
     THREE.JS / R3F
           |
           v
      3D GARMENT
           |
           v
    REAL-TIME PREVIEW

           |
           v
       SUPABASE
           |
    +------+------+
    |      |      |
    v      v      v
   AUTH  DATABASE STORAGE
```

## 3.2 Application Modules

| Module | Responsibility |
|---|---|
| App | Application initialization |
| Router | Page navigation |
| Designer | Main editor experience |
| Viewer3D | 3D garment rendering |
| TextureEngine | Texture generation and mapping |
| ImageEditor | Image upload and manipulation |
| TextEditor | Custom text management |
| ColorEditor | Garment color customization |
| PanelSelector | Garment surface selection |
| TShirtEditor | T-shirt-specific functionality |
| JerseyEditor | Jersey-specific functionality |
| DesignProject | Save/load project |
| Export | Export preview and design assets |
| SupabaseService | Database and storage integration |

---

# 4. USER INTERFACE & USER EXPERIENCE

## 4.1 General Design Direction

Create a professional SaaS-style web application.

Design characteristics:
- Minimalist.
- Modern.
- Clean.
- Professional.
- Spacious.
- Clear visual hierarchy.
- Consistent spacing.
- Subtle borders and shadows.
- Smooth interactions.
- Avoid excessive gradients.
- Avoid unnecessary decorative elements.
- Avoid generic AI-generated dashboard aesthetics.

Suggested design system:

| Element | Specification |
|---|---|
| Primary background | #FFFFFF |
| Secondary background | #F7F8FA |
| Primary text | #171717 |
| Secondary text | #737373 |
| Border | #E5E7EB |
| Accent | #2563EB |
| Success | #16A34A |
| Danger | #DC2626 |
| Border radius | 8–14px |
| Font | Inter or Geist |
| Icon | Lucide |

Use CSS variables or centralized design tokens.

Do not hardcode repeated colors throughout components.

## 4.2 Application Pages

Create the following pages:

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Product introduction |
| `/designer` | Designer Selection | Choose clothing type |
| `/designer/tshirt` | T-Shirt Designer | T-shirt editor |
| `/designer/jersey` | Jersey Designer | Jersey editor |
| `/projects` | My Projects | Saved designs |
| `/projects/:id` | Project Editor | Open saved design |
| `/login` | Login | User authentication |
| `/register` | Register | User registration |

Authentication can be optional for initial guest editing. Require authentication when users want to persist projects in their account.

---

# 5. LANDING PAGE

Create a professional landing page introducing the application.

## 5.1 Hero Section

Content:
- Strong headline.
- Short product description.
- Primary CTA: Start Designing.
- Secondary CTA: Explore Designs.
- Large visual preview of a customizable 3D garment.

Suggested headline:

"Design Your Clothes. See Every Detail in 3D."

Description:

"Create your own custom T-shirts and sports jerseys. Customize colors, upload artwork, and preview your design in an interactive 3D environment."

## 5.2 Features Section

Showcase:
- Interactive 3D Preview.
- Custom Colors.
- Upload Your Artwork.
- Multi-Surface Editing.
- Save and Export.

## 5.3 Product Selection

Provide two prominent product cards:

**T-Shirt Customizer**
- Preview image.
- Description.
- Start Designing button.

**Jersey Customizer**
- Preview image.
- Description.
- Start Designing button.

---

# 6. T-SHIRT DESIGNER

This is one of the core application features.

## 6.1 Initial State

When users enter `/designer/tshirt`:

1. Display a realistic plain white T-shirt.
2. The T-shirt must be a real 3D GLB model.
3. Position the garment in the center of the 3D viewport.
4. Use a neutral studio environment.
5. Use realistic lighting.
6. Enable 360-degree rotation.
7. Enable zoom in and zoom out.
8. Show editing controls.

Default configuration:

```ts
interface TShirtDesign {
  garmentType: "tshirt";
  baseColor: string;
  surfaces: {
    front: SurfaceDesign;
    back: SurfaceDesign;
  };
}
```

Default color:

```ts
baseColor = "#FFFFFF";
```

## 6.2 3D Viewer

Requirements:

- Real-time 3D rendering.
- Full 360-degree rotation.
- Smooth camera interaction.
- Zoom in and zoom out.
- Reset camera position.
- Front view.
- Back view.
- Left-side view.
- Right-side view.
- Optional auto-rotate.
- Responsive canvas sizing.

Use:

- React Three Fiber.
- Three.js.
- OrbitControls from `@react-three/drei`.

Suggested controls:

```tsx
<OrbitControls
  enableRotate
  enableZoom
  enablePan={false}
  minDistance={2}
  maxDistance={7}
  minPolarAngle={0.3}
  maxPolarAngle={Math.PI - 0.3}
/>
```

The exact camera distance and rotation constraints must be adjusted according to the actual GLB model dimensions.

Do not force the camera to use incorrect dimensions.

## 6.3 Color Customization

Provide color customization functionality.

Features:

1. Preset color palette.
2. Custom color picker.
3. HEX input.
4. Apply selected color to the entire garment.
5. Instantly update the 3D preview.
6. Reset to default white.

Suggested preset colors:

```ts
const presetColors = [
  "#FFFFFF",
  "#000000",
  "#EF4444",
  "#2563EB",
  "#16A34A",
  "#EAB308",
  "#7C3AED",
  "#F97316",
  "#6B7280",
];
```

Changing the base color must not remove existing uploaded artwork.

Color updates must affect the garment material without unintentionally changing logos, images, or text.

## 6.4 Surface Selection

Users must be able to switch between:

- Front.
- Back.

Provide a clear surface selector.

Example:

```text
[ FRONT ] [ BACK ]
```

When selecting a surface:
- Show the currently selected surface.
- Load its existing design elements.
- Allow new artwork to be added.
- Do not erase the other surface.
- Preserve independent surface configurations.

## 6.5 Image Upload

Users can upload images through:

1. File picker.
2. Drag and drop.
3. Clipboard paste using Ctrl + V.
4. Clipboard paste on supported mobile browsers.

Supported formats:
- PNG.
- JPG.
- JPEG.
- WebP.
- SVG, only if sanitized and safely processed.

Requirements:
- Validate MIME type.
- Validate image dimensions.
- Set a reasonable file size limit, initially 10 MB.
- Show upload progress where applicable.
- Show clear error messages.
- Prevent unsupported file uploads.
- Prevent unsafe SVG content.
- Revoke temporary object URLs when no longer needed.

Clipboard handling should use the browser paste event and Clipboard API where supported.

Do not assume clipboard image access works in every browser or context. Provide a normal upload fallback.

## 6.6 Image Manipulation

After an image is added, users must be able to:

- Drag.
- Move.
- Resize.
- Rotate.
- Delete.
- Duplicate.
- Change layer order.
- Reset transformation.

Use Fabric.js for the interactive 2D artwork composition.

Example object state:

```ts
interface DesignImage {
  id: string;
  type: "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}
```

Important:

The Fabric.js editing canvas is a 2D composition editor.

The resulting composition must be converted into a texture that is applied to the corresponding 3D garment surface.

Do not simply display an HTML overlay above the 3D model.

## 6.7 Artwork Editing Workflow

```text
User uploads image
        |
        v
Validate image
        |
        v
Create image object
        |
        v
Display on 2D editor
        |
        v
User edits position, scale, rotation
        |
        v
Render artwork composition
        |
        v
Generate/update texture
        |
        v
Apply texture to 3D model
        |
        v
Display real-time preview
```

---

# 7. JERSEY DESIGNER

The jersey editor must have more customization options than the T-shirt editor.

## 7.1 Initial State

When users open `/designer/jersey`:

1. Display a realistic plain white sports jersey.
2. Use a real 3D jersey model.
3. Enable 360-degree rotation.
4. Enable zoom.
5. Provide a multi-surface editing interface.
6. Display editing controls.

Default jersey:

```ts
interface JerseyDesign {
  garmentType: "jersey";
  panels: Record<JerseyPanel, SurfaceDesign>;
}
```

## 7.2 Jersey Editing Areas

The jersey must support six independently editable surfaces.

| Surface | Key | Description |
|---|---|---|
| Front | `front` | Front body |
| Back | `back` | Back body |
| Right side | `right` | Right-side body panel |
| Left side | `left` | Left-side body panel |
| Right shoulder | `rightShoulder` | Right shoulder area |
| Left shoulder | `leftShoulder` | Left shoulder area |

Use a panel selector with visual labels.

Example:

```text
       JERSEY DESIGNER

   [ Front ] [ Back ]

   [ Right ] [ Left ]

   [ Right Shoulder ]
   [ Left Shoulder ]
```

The actual visual layout should be more polished than this example.

## 7.3 Independent Panel Customization

Every panel must support:

- Background color.
- Image upload.
- Clipboard paste.
- Drag and drop.
- Image positioning.
- Resize.
- Rotation.
- Delete.
- Duplicate.
- Layer management.
- Reset panel.

Changing one panel must not accidentally overwrite another panel.

## 7.4 Jersey Color Customization

Support two levels of color customization.

**Level 1: Global color**

Change the entire jersey base color.

**Level 2: Individual panel color**

Change colors independently:

- Front.
- Back.
- Right side.
- Left side.
- Right shoulder.
- Left shoulder.

Global color changes should preserve artwork and panel-specific overrides according to clearly defined behavior.

## 7.5 Jersey Text Editor

Support adding text elements.

Examples:
- Player name.
- Jersey number.
- Team name.
- Sponsor text.
- Custom labels.

Text customization:

```ts
interface DesignText {
  id: string;
  type: "text";
  content: string;
  x: number;
  y: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  rotation: number;
  opacity: number;
  zIndex: number;
}
```

Provide:
- Text input.
- Font family selection.
- Font size.
- Font weight.
- Text color.
- Alignment.
- Rotation.
- Position.
- Delete and duplicate.

Use a curated list of locally available or properly licensed fonts.

## 7.6 Number Customization

Provide a dedicated jersey number tool.

Features:
- Add jersey number.
- Change number.
- Change font.
- Change color.
- Adjust size.
- Adjust position.
- Add optional outline.
- Add optional shadow.

The user must be able to position numbers independently on the front and back.

---

# 8. CRITICAL: 3D MODEL AND UV MAPPING

This section is mandatory.

The quality of the entire application depends on correct 3D assets and texture mapping.

## 8.1 Model Requirements

Prepare two separate 3D models:

```text
public/
└── models/
    ├── tshirt.glb
    └── jersey.glb
```

The models should be:
- Realistic.
- Properly proportioned.
- Cleanly modeled.
- Optimized for web rendering.
- Properly UV unwrapped.
- Equipped with suitable materials.
- Suitable for texture customization.

Do not assume these models already exist.

First inspect the project assets.

If the models are missing:
1. Build the rendering architecture.
2. Prepare a clear asset specification.
3. Use a temporary development placeholder only if necessary.
4. Clearly mark the placeholder as temporary.
5. Do not pretend a placeholder is a production-ready garment.
6. Keep model paths configurable.

A real GLB asset is required before declaring the full 3D garment feature complete.

## 8.2 UV Mapping

UV mapping determines how a 2D image is projected onto the surface of a 3D garment.

The models must be UV-unwrapped properly.

For the T-shirt:

- Front body.
- Back body.
- Left sleeve.
- Right sleeve.
- Collar.
- Remaining fabric surfaces.

For the jersey:

- Front.
- Back.
- Left side.
- Right side.
- Left shoulder.
- Right shoulder.
- Sleeves and remaining fabric surfaces.

The precise UV layout must correspond to the actual garment mesh.

Do not assume that front and back surfaces can be mapped accurately using arbitrary rectangular coordinates.

## 8.3 Recommended Material Architecture

There are two acceptable approaches.

**Approach A: Separate materials per surface**

Each editable surface has its own material or texture.

Advantages:
- Easier surface-specific editing.
- Independent color changes.
- Easier texture composition.
- Easier debugging.

Recommended for the initial implementation if the GLB model is designed accordingly.

**Approach B: Single UV atlas**

Use one texture atlas for the entire garment.

Advantages:
- Fewer materials.
- Potentially fewer draw calls.
- Centralized texture management.

However, it requires accurate UV atlas coordinates and a well-defined mapping system.

For the MVP, prefer separate materials or clearly identified mesh regions when possible.

## 8.4 Mesh Naming Convention

When preparing Blender models, use consistent mesh or material names.

Suggested names:

```text
TShirt:
- Tshirt_Front
- Tshirt_Back
- Tshirt_LeftSleeve
- Tshirt_RightSleeve
- Tshirt_Collar

Jersey:
- Jersey_Front
- Jersey_Back
- Jersey_LeftSide
- Jersey_RightSide
- Jersey_LeftShoulder
- Jersey_RightShoulder
- Jersey_LeftSleeve
- Jersey_RightSleeve
```

The implementation must inspect the actual GLB scene graph and map real mesh names to editable panels.

Do not silently assume that these names already exist.

Create a model configuration layer so mesh naming can be adjusted without rewriting the editor.

## 8.5 Texture Engine

Implement a reusable texture engine.

Responsibilities:

1. Receive the design state.
2. Render artwork onto a 2D composition.
3. Convert the composition into a texture.
4. Apply the texture to the correct material.
5. Update the 3D preview.
6. Dispose obsolete GPU textures safely.
7. Preserve artwork between surface switches.

Use CanvasTexture or an equivalent Three.js texture implementation.

Example conceptual workflow:

```ts
const texture = new THREE.CanvasTexture(canvas);

texture.colorSpace = THREE.SRGBColorSpace;
texture.needsUpdate = true;

material.map = texture;
material.needsUpdate = true;
```

Important implementation requirements:

- Correct color space.
- Correct UV orientation.
- Correct texture dimensions.
- Proper texture filtering.
- Correct material configuration.
- Correct texture disposal.
- No unnecessary recreation of all materials after every small edit.

Use appropriate texture resolution, initially 2048 × 2048 per surface where performance allows.

The resolution should be configurable and adjusted based on device performance.

---

# 9. DESIGN STATE MANAGEMENT

Use Zustand for global editor state.

Do not store large binary image files or base64 strings unnecessarily in the main application state.

Separate:
- UI state.
- Garment configuration.
- Artwork metadata.
- Temporary image assets.
- Persistence data.

## 9.1 Core Types

```ts
type GarmentType = "tshirt" | "jersey";

type TShirtSurface =
  | "front"
  | "back";

type JerseyPanel =
  | "front"
  | "back"
  | "right"
  | "left"
  | "rightShoulder"
  | "leftShoulder";

interface DesignImage {
  id: string;
  type: "image";
  assetId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
  zIndex: number;
}

interface DesignText {
  id: string;
  type: "text";
  content: string;
  x: number;
  y: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  rotation: number;
  opacity: number;
  zIndex: number;
}

type DesignElement = DesignImage | DesignText;

interface SurfaceDesign {
  color: string;
  elements: DesignElement[];
}

interface DesignerState {
  garmentType: GarmentType;
  selectedSurface: string;
  selectedElementId: string | null;
  isDirty: boolean;
  surfaces: Record<string, SurfaceDesign>;
}
```

Adjust the types to enforce garment-specific surfaces using discriminated unions rather than relying on unrestricted strings in the final implementation.

## 9.2 Required Actions

The store must provide actions for:

```ts
interface DesignerActions {
  setGarmentType: (type: GarmentType) => void;

  selectSurface: (surface: string) => void;

  setSurfaceColor: (
    surface: string,
    color: string
  ) => void;

  addElement: (
    surface: string,
    element: DesignElement
  ) => void;

  updateElement: (
    surface: string,
    elementId: string,
    updates: Partial<DesignElement>
  ) => void;

  removeElement: (
    surface: string,
    elementId: string
  ) => void;

  duplicateElement: (
    surface: string,
    elementId: string
  ) => void;

  selectElement: (id: string | null) => void;

  resetSurface: (surface: string) => void;

  undo: () => void;

  redo: () => void;
}
```

Undo and redo must preserve meaningful design history.

Do not create a new history entry for every intermediate pointer movement. Use appropriate history grouping or debouncing.

---

# 10. DESIGNER INTERFACE LAYOUT

## 10.1 Desktop Layout

For desktop screens, use a three-part editor layout.

```text
+-----------------------------------------------------------+
| LOGO       Project Name            Save    Export    User |
+-----------------------------------------------------------+
|                                                           |
| TOOLBAR     |             3D VIEWER        |  EDIT PANEL  |
|             |                              |              |
| Select      |                              | Color        |
| Upload      |       3D T-SHIRT              |              |
| Text        |                              | Artwork      |
| Shapes      |                              |              |
|             |                              | Position     |
|             |                              | Size         |
|             |                              | Rotation     |
|             |                              |              |
|             |                              | Layers       |
|             |                              |              |
+-----------------------------------------------------------+
|      FRONT       BACK       ROTATE       RESET CAMERA      |
+-----------------------------------------------------------+
```

### Layout Rules

- Header height around 64px.
- Left toolbar width around 64–80px.
- Right editing panel width around 300–360px.
- Center viewport takes remaining space.
- Avoid unnecessary horizontal scrolling.
- The viewport must maintain an appropriate aspect ratio.
- The right panel should support vertical scrolling.

These dimensions are starting guidelines, not fixed constraints.

## 10.2 Tablet Layout

- Use a flexible canvas area.
- Editing panel may become a collapsible side panel.
- Toolbar may become horizontal.
- Keep the 3D preview as the main visual focus.
- Do not allow panels to cover important editing controls.

## 10.3 Mobile Layout

Mobile must have a purpose-built layout.

Suggested structure:

```text
+---------------------------+
| Project       Save   More |
+---------------------------+
|                           |
|                           |
|       3D GARMENT          |
|                           |
|                           |
|                           |
+---------------------------+
| Front | Back | Side       |
+---------------------------+
|                           |
| Color / Upload / Text     |
|                           |
| Selected Element Settings |
|                           |
+---------------------------+
```

Mobile interaction requirements:

- Single-finger rotation using OrbitControls.
- Pinch-to-zoom.
- Touch-friendly editing controls.
- Bottom sheet for editing options.
- Horizontal surface selector.
- Full-width upload controls where appropriate.
- Minimum comfortable touch target around 44 × 44 CSS pixels.
- Avoid overlapping controls.
- Support portrait orientation.
- Support landscape orientation where practical.

Important: When the user manipulates an image inside the 2D editor, the gesture must edit the image rather than unexpectedly rotate the 3D garment.

Provide a clear interaction mode or selected editing state.

## 10.4 Responsive Breakpoints

Use the following starting breakpoints:

```css
/* Mobile */
@media (max-width: 639px) {}

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) {}

/* Desktop */
@media (min-width: 1024px) {}

/* Large Desktop */
@media (min-width: 1440px) {}
```

The layout must be tested at:

- 320px.
- 375px.
- 390px.
- 768px.
- 1024px.
- 1280px.
- 1440px.
- 1920px.

Do not simply scale desktop components down.

---

# 11. SAVE & PROJECT MANAGEMENT

Users should be able to save their designs.

## 11.1 Save Project

Each project contains:

- Project ID.
- User ID.
- Project name.
- Garment type.
- Base color.
- Surface configurations.
- Uploaded artwork references.
- Created timestamp.
- Updated timestamp.

Example:

```json
{
  "name": "My Custom Jersey",
  "garmentType": "jersey",
  "surfaces": {
    "front": {
      "color": "#FFFFFF",
      "elements": []
    },
    "back": {
      "color": "#000000",
      "elements": []
    },
    "right": {
      "color": "#FFFFFF",
      "elements": []
    },
    "left": {
      "color": "#FFFFFF",
      "elements": []
    },
    "rightShoulder": {
      "color": "#2563EB",
      "elements": []
    },
    "leftShoulder": {
      "color": "#2563EB",
      "elements": []
    }
  }
}
```

This is a conceptual example. The actual implementation should use validated TypeScript serialization and database schemas.

## 11.2 Autosave

Recommended behavior:

- Track unsaved changes.
- Debounce autosave.
- Show save status.
- Prevent accidental overwriting.
- Handle network errors.
- Support manual save.

Suggested statuses:

```ts
type SaveStatus =
  | "idle"
  | "saving"
  | "saved"
  | "error";
```

Autosave should not generate excessive database requests.

## 11.3 My Projects

Users can:
- View saved projects.
- Open a project.
- Rename a project.
- Duplicate a project.
- Delete a project.
- Preview the last saved design.

---

# 12. SUPABASE DATABASE DESIGN

Use PostgreSQL.

## 12.1 Tables

### profiles

| Column | Type |
|---|---|
| id | UUID, primary key, references auth.users |
| full_name | TEXT |
| avatar_url | TEXT |
| created_at | TIMESTAMPTZ |

### design_projects

| Column | Type |
|---|---|
| id | UUID, primary key |
| user_id | UUID, references auth.users |
| name | TEXT |
| garment_type | TEXT |
| design_data | JSONB |
| thumbnail_url | TEXT |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |

### design_assets

| Column | Type |
|---|---|
| id | UUID, primary key |
| user_id | UUID |
| project_id | UUID |
| storage_path | TEXT |
| file_name | TEXT |
| mime_type | TEXT |
| file_size | BIGINT |
| created_at | TIMESTAMPTZ |

## 12.2 Storage Buckets

Create:

```text
design-assets/
    user-id/
        project-id/
            logo.png
            sponsor.png
            artwork.webp

design-thumbnails/
    user-id/
        project-id/
            preview.png
```

## 12.3 Security

Enable Row Level Security on user-owned data.

Policies must ensure:

- Users can only read their own projects.
- Users can only insert projects under their own user ID.
- Users can only update their own projects.
- Users can only delete their own projects.
- Users can only access their own private uploaded assets.

Never expose the Supabase service role key in frontend code.

Only use the Supabase anon/publishable key on the client with properly configured RLS.

Validate ownership before allowing asset deletion or project modification.

---

# 13. EXPORT FUNCTIONALITY

The application should support two different export types.

## 13.1 3D Preview Export

Allow users to export a screenshot of the garment.

Requirements:
- PNG format.
- High-quality rendering.
- Transparent background option where supported.
- Optional white background.
- Correctly rendered lighting.
- Current camera angle.
- Current garment design.

Use Three.js canvas rendering.

Do not use an arbitrary HTML screenshot as a substitute for the actual 3D rendering.

## 13.2 2D Artwork Export

Allow users to export individual surface compositions.

For example:

```text
exports/
    tshirt/
        front.png
        back.png

    jersey/
        front.png
        back.png
        right.png
        left.png
        right-shoulder.png
        left-shoulder.png
```

Requirements:
- High-resolution PNG.
- Transparent background where appropriate.
- Accurate positioning.
- Correct aspect ratio.
- Consistent texture dimensions.
- No UI controls in exported images.

## 13.3 Future Production Export

Prepare architecture for future production-ready exports:

- UV texture atlas.
- High-resolution panel artwork.
- Print-ready templates.
- Vendor-specific dimensions.
- CMYK conversion where required.
- PDF export where required.

Do not claim that a normal 3D screenshot is a production-ready print file.

---

# 14. PERFORMANCE & OPTIMIZATION

3D rendering is resource-intensive.

Performance must be considered from the beginning.

## 14.1 3D Optimization

- Use optimized GLB models.
- Avoid excessive polygon counts.
- Use compressed textures when appropriate.
- Lazy-load garment models.
- Avoid unnecessary material recreation.
- Reuse geometry and materials where appropriate.
- Dispose unused textures and resources.
- Avoid unnecessary React re-renders.
- Avoid rendering the entire application for every pointer movement.

## 14.2 Texture Optimization

- Use configurable texture resolution.
- Use appropriate texture filtering.
- Update only affected surfaces.
- Avoid repeatedly encoding large base64 strings.
- Avoid unnecessary texture uploads to the GPU.
- Debounce expensive texture generation when appropriate.

## 14.3 Responsive Performance

On lower-powered devices:

- Reduce rendering resolution using an appropriate device pixel ratio.
- Avoid unnecessary real-time shadows.
- Use optimized lighting.
- Consider disabling expensive effects.
- Provide a graceful fallback when WebGL is unavailable.

Do not disable essential editing functionality without communicating the limitation.

## 14.4 Loading Experience

Provide:
- Loading indicator for 3D model.
- Asset loading progress where available.
- Image upload feedback.
- Error state if the model fails to load.
- WebGL unsupported message.
- Retry mechanism.

---

# 15. ACCESSIBILITY & USABILITY

Requirements:

- Semantic HTML.
- Keyboard-accessible controls.
- Visible focus states.
- Accessible form labels.
- Proper color contrast.
- Descriptive button labels.
- Clear validation messages.
- Tooltips for icon-only controls.
- Keyboard support for common editing actions.

Suggested keyboard shortcuts:

| Shortcut | Action |
|---|---|
| Ctrl + Z | Undo |
| Ctrl + Shift + Z | Redo |
| Ctrl + C | Copy selected element |
| Ctrl + V | Paste image or copied element |
| Delete | Delete selected element |
| Escape | Deselect or close dialog |
| Ctrl + S | Save project |

Shortcuts must not interfere with normal text input.

---

# 16. ERROR HANDLING

Implement proper error handling for:

- Invalid image format.
- Image larger than the configured limit.
- Corrupt image file.
- Clipboard access denied.
- WebGL unavailable.
- GLB loading failure.
- Missing mesh or material.
- Texture generation failure.
- Supabase connection failure.
- Save failure.
- Unauthorized project access.
- Storage upload failure.
- Invalid design JSON.

Use a consistent notification system.

Never silently ignore errors that could result in lost user designs.

---

# 17. PROJECT FOLDER STRUCTURE

Use the following feature-based structure.

```text
virtual-clothing-designer/
│
├── public/
│   ├── models/
│   │   ├── tshirt.glb
│   │   └── jersey.glb
│   │
│   ├── textures/
│   ├── images/
│   └── fonts/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── app.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── feedback/
│   │
│   ├── features/
│   │   │
│   │   ├── landing/
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   ├── designer/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── viewer-3d/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── models/
│   │   │   ├── materials/
│   │   │   └── utils/
│   │   │
│   │   ├── texture-engine/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   │
│   │   ├── image-editor/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   │
│   │   ├── color-editor/
│   │   ├── text-editor/
│   │   ├── tshirt-editor/
│   │   ├── jersey-editor/
│   │   ├── design-project/
│   │   └── export/
│   │
│   ├── stores/
│   │   ├── designer.store.ts
│   │   ├── history.store.ts
│   │   └── ui.store.ts
│   │
│   ├── services/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── project.service.ts
│   │   │   └── storage.service.ts
│   │   │
│   │   └── asset.service.ts
│   │
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── constants/
│   └── styles/
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── tests/
│   ├── unit/
│   ├── components/
│   └── e2e/
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── README.md
```

Adjust the structure when implementation requires it, but preserve separation of responsibilities.

Avoid creating unnecessary abstractions or empty folders.

---

# 18. ENVIRONMENT CONFIGURATION

Use environment variables.

Example `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use the currently recommended Supabase publishable key naming if the project uses the newer key format.

Requirements:

- Never hardcode credentials.
- Never commit `.env`.
- Include `.env.example`.
- Validate required environment variables.
- Handle missing configuration gracefully.

---

# 19. PACKAGE INSTALLATION

Initialize the application with Vite.

```bash
npm create vite@latest virtual-clothing-designer -- --template react-ts

cd virtual-clothing-designer

npm install
```

Install 3D dependencies:

```bash
npm install three @react-three/fiber @react-three/drei
```

Install editor dependencies:

```bash
npm install fabric
```

Install state management and utilities:

```bash
npm install zustand zod lucide-react react-dropzone react-router-dom
```

Install backend integration:

```bash
npm install @supabase/supabase-js
```

Install styling:

```bash
npm install tailwindcss @tailwindcss/vite
```

Optional advanced gesture support:

```bash
npm install @use-gesture/react
```

Development dependencies:

```bash
npm install -D eslint prettier vitest @testing-library/react @testing-library/jest-dom playwright
```

Ensure package versions are compatible with the installed React, TypeScript, and Three.js versions.

Do not blindly install outdated package versions.

After installation, verify that the application runs.

```bash
npm run dev
```

---

# 20. IMPLEMENTATION PHASES

Implement the project incrementally.

Do not attempt to build every feature in one step without verifying the underlying rendering architecture.

## PHASE 1 — Project Foundation

Tasks:

- Initialize Vite + React + TypeScript.
- Configure Tailwind CSS.
- Configure ESLint and Prettier.
- Configure React Router.
- Configure Zustand.
- Configure the base design system.
- Create the initial folder structure.
- Build the landing page.
- Build designer selection page.
- Implement responsive navigation.

Deliverables:
- Running application.
- Responsive landing page.
- Navigation.
- T-shirt and jersey selection.

Acceptance criteria:
- Application starts without errors.
- Routes work.
- No horizontal overflow.
- Layout works on mobile and desktop.

## PHASE 2 — 3D T-Shirt Viewer

Tasks:

- Prepare or integrate a real T-shirt GLB model.
- Load model using React Three Fiber.
- Implement lighting.
- Implement camera controls.
- Implement 360-degree rotation.
- Implement zoom.
- Implement reset camera.
- Implement front/back camera presets.
- Handle loading and error states.

Deliverables:
- Realistic 3D white T-shirt.
- Fully functional 3D viewer.

Acceptance criteria:
- User can rotate the actual garment.
- User can inspect front and back.
- Model does not disappear during rotation.
- Zoom works.
- The model loads correctly.
- The viewer adapts to viewport resizing.

## PHASE 3 — T-Shirt Customization

Tasks:

- Implement base color editor.
- Implement surface selector.
- Implement image upload.
- Implement clipboard paste.
- Integrate Fabric.js.
- Implement image transformation.
- Implement texture generation.
- Map textures to front/back.
- Implement undo/redo.
- Implement element selection and deletion.

Deliverables:
- Working T-shirt designer.

Acceptance criteria:
- User can change garment color.
- User can add an image.
- User can move, resize, and rotate it.
- Artwork appears on the correct 3D surface.
- Front and back designs remain independent.
- Rotating the model does not cause artwork to disappear or move to the wrong location.

## PHASE 4 — Jersey Customization

Tasks:

- Prepare jersey GLB model.
- Map jersey panels.
- Implement six independent editing surfaces.
- Implement individual panel colors.
- Implement text editor.
- Implement jersey number editor.
- Implement artwork composition.
- Update corresponding 3D textures.

Deliverables:
- Fully functional jersey designer.

Acceptance criteria:
- All six surfaces are editable.
- Each surface maintains its own design.
- Panel colors update correctly.
- Images appear on the correct garment regions.
- Text and numbers render correctly.
- No accidental changes to other panels.

## PHASE 5 — Project Persistence

Tasks:

- Set up Supabase.
- Create database migrations.
- Configure RLS.
- Configure Storage buckets.
- Implement project saving.
- Implement project loading.
- Implement autosave.
- Implement project management.
- Implement asset ownership validation.

Deliverables:
- Persistent user projects.

Acceptance criteria:
- User can save projects.
- User can reopen saved projects.
- Designs persist after refreshing.
- Users cannot access other users' private projects.
- Uploaded artwork remains accessible.

## PHASE 6 — Export

Tasks:

- Export 3D preview.
- Export individual surface textures.
- Add background options.
- Add export resolution settings.
- Handle download errors.

Deliverables:
- Downloadable PNG previews.
- Downloadable artwork surfaces.

Acceptance criteria:
- Export reflects the latest design.
- Export does not include editing controls.
- Images maintain correct dimensions.
- Texture export preserves artwork positions.

## PHASE 7 — Responsive Optimization & Testing

Tasks:

- Test desktop layout.
- Test tablet layout.
- Test mobile layout.
- Test touch interactions.
- Test image uploads.
- Test clipboard paste.
- Test project persistence.
- Test model loading.
- Test WebGL fallback.
- Optimize rendering.
- Fix console errors.

Deliverables:
- Responsive application.
- Tested functionality.
- Production-ready build.

---

# 21. TESTING REQUIREMENTS

## 21.1 Functional Tests

T-Shirt:

- Load T-shirt model.
- Rotate model 360 degrees.
- Zoom.
- Change color.
- Upload image.
- Paste image.
- Move image.
- Resize image.
- Rotate image.
- Delete image.
- Switch front/back.
- Preserve design after switching surfaces.

Jersey:

- Load jersey model.
- Rotate model.
- Select front.
- Select back.
- Select right side.
- Select left side.
- Select right shoulder.
- Select left shoulder.
- Change panel colors.
- Upload artwork to each panel.
- Add player name.
- Add jersey number.
- Preserve all panel designs.

Persistence:

- Save project.
- Reload project.
- Edit project.
- Rename project.
- Duplicate project.
- Delete project.

## 21.2 Responsive Tests

Verify:

- No horizontal overflow.
- No clipped editor panels.
- No broken toolbars.
- No unusable buttons.
- 3D canvas fills its intended area.
- Touch rotation works.
- Touch zoom works.
- Bottom sheet works.
- Surface selector is accessible.

## 21.3 Performance Tests

Test on:
- Desktop with integrated graphics.
- Mid-range laptop.
- Modern smartphone.
- Lower-powered mobile device.

Measure:
- Initial loading time.
- Model loading time.
- Texture update responsiveness.
- Memory consumption.
- GPU resource cleanup.
- UI responsiveness.

---

# 22. NON-FUNCTIONAL REQUIREMENTS

| Requirement | Specification |
|---|---|
| Responsiveness | Mobile, tablet, desktop |
| Rendering | Real Three.js 3D rendering |
| State management | Zustand |
| Architecture | Modular feature-based |
| Type safety | TypeScript |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Security | RLS and validated uploads |
| Accessibility | Keyboard and touch support |
| Performance | Optimized GLB and textures |
| Maintainability | Reusable components |
| Reliability | Error handling and persistence |

---

# 23. SCOPE CONTROL

## MVP — Must Have

- Landing page.
- T-shirt designer.
- Jersey designer.
- Real 3D models.
- 360-degree rotation.
- Zoom.
- Color customization.
- Image upload.
- Clipboard paste.
- Drag, resize, and rotate artwork.
- Front/back T-shirt editing.
- Six jersey editing areas.
- Real-time texture updates.
- Responsive interface.
- PNG preview export.

## Version 2 — Should Have

- User authentication.
- Saved projects.
- Autosave.
- Undo/redo.
- Text editor.
- Jersey number editor.
- Project duplication.
- Design history.
- Artwork export.
- More garment models.

## Future Development

- Additional clothing types.
- Hoodie customization.
- Polo shirt customization.
- Shorts customization.
- Custom patterns.
- Fabric material selection.
- Advanced fabric simulation.
- AI design assistance.
- Print-ready production exports.
- Vendor integration.
- Shopping and ordering system.

Do not implement future features before the MVP works reliably.

---

# 24. IMPORTANT IMPLEMENTATION RULES FOR ANTIGRAVITY

Follow these rules throughout development.

## 24.1 Code Quality

- Use TypeScript strictly.
- Avoid `any` unless absolutely necessary.
- Use functional React components.
- Keep components small and reusable.
- Separate business logic from presentation.
- Avoid giant components.
- Avoid duplicated logic.
- Use meaningful naming conventions.
- Use centralized constants.
- Use reusable hooks where appropriate.
- Do not hardcode configuration.
- Avoid unnecessary dependencies.

## 24.2 Architecture

- Keep the 3D rendering engine separate from the UI.
- Keep the texture engine independent from editor components.
- Keep Zustand stores focused.
- Keep Supabase operations inside service modules.
- Keep model configuration separate from model rendering.
- Use validated serialization for saved projects.

## 24.3 Visual Quality

- Do not produce generic dashboard UI.
- Do not create a static mockup instead of a functional editor.
- Prioritize the 3D garment preview.
- Keep the editing interface intuitive.
- Maintain consistent spacing.
- Make mobile interactions intentional.
- Use professional typography.
- Avoid excessive animations.
- Ensure every visible control has a meaningful action.

## 24.4 3D Accuracy

- Never fake garment rotation.
- Never use a flat image as a production 3D garment.
- Do not apply artwork to an incorrect mesh.
- Do not assume arbitrary UV coordinates.
- Validate texture orientation.
- Validate texture seams.
- Validate material assignments.
- Verify front, back, sides, and shoulder regions independently.

## 24.5 Asset Management

If the required GLB models are not available:

- Do not claim they exist.
- Do not generate fake production-ready assets.
- Identify the missing assets.
- Provide a documented GLB asset specification.
- Build the viewer and material architecture around a clearly identified development placeholder only if needed.
- Make it possible to replace the placeholder with the final model without rewriting the application.

## 24.6 Development Workflow

For every implementation phase:

1. Inspect the existing project.
2. Understand existing files and dependencies.
3. Implement the requested functionality.
4. Run the development server.
5. Run TypeScript checks.
6. Run linting.
7. Run relevant tests.
8. Fix errors before proceeding.
9. Summarize completed work.
10. Identify remaining limitations honestly.

Do not rewrite working code unnecessarily.

Do not delete existing user files without a clear reason.

Do not mark a feature complete when it only has a visual placeholder.

---

# 25. FINAL ACCEPTANCE CRITERIA

The application is considered successfully implemented when all the following conditions are met.

### T-Shirt Designer

- [ ] A real white 3D T-shirt is displayed.
- [ ] User can rotate the garment 360 degrees.
- [ ] User can zoom in and out.
- [ ] User can change garment color.
- [ ] User can upload images.
- [ ] User can paste images from clipboard.
- [ ] User can drag images.
- [ ] User can resize images.
- [ ] User can rotate images.
- [ ] User can edit front independently.
- [ ] User can edit back independently.
- [ ] Changes appear on the actual 3D model.

### Jersey Designer

- [ ] A real 3D jersey is displayed.
- [ ] User can rotate the jersey.
- [ ] User can edit front.
- [ ] User can edit back.
- [ ] User can edit right side.
- [ ] User can edit left side.
- [ ] User can edit right shoulder.
- [ ] User can edit left shoulder.
- [ ] Each panel supports individual color customization.
- [ ] Each panel supports image editing.
- [ ] User can add text.
- [ ] User can add jersey numbers.
- [ ] All changes appear on the correct 3D surfaces.

### General Application

- [ ] Responsive desktop layout.
- [ ] Responsive tablet layout.
- [ ] Responsive mobile layout.
- [ ] Functional upload controls.
- [ ] Functional editor controls.
- [ ] Functional undo/redo.
- [ ] 3D preview export.
- [ ] Artwork export.
- [ ] Error handling.
- [ ] No critical console errors.
- [ ] Production build succeeds.

### Backend (when enabled)

- [ ] Supabase connection works.
- [ ] User authentication works.
- [ ] Project saving works.
- [ ] Project loading works.
- [ ] Asset storage works.
- [ ] RLS policies work.
- [ ] User data is isolated.

---

# 26. FINAL INSTRUCTIONS

Build this application as a real, usable 3D clothing customization platform.

The most important priorities are:

1. **Realistic 3D garment rendering.**
2. **Accurate UV mapping and texture application.**
3. **Independent surface customization.**
4. **Smooth real-time editing experience.**
5. **Professional responsive interface.**
6. **Maintainable architecture.**

Start by inspecting the existing repository.

If the repository is empty, initialize the project using the specified stack.

Do not attempt to complete all features simultaneously.

Start with Phase 1 and Phase 2. Verify that the actual 3D T-shirt can be loaded, rotated, zoomed, and displayed correctly before implementing the advanced editing functionality.

After Phase 2, proceed to T-shirt customization, then jersey customization.

If a required 3D model is missing, explicitly report that dependency and prepare the application architecture to support the final model.

**The final product must be a functional 3D virtual clothing designer, not merely a landing page, static mockup, or collection of non-functional UI components.**

End goal: A user opens the website, selects a T-shirt or jersey, sees a realistic white 3D garment, rotates it 360 degrees, changes its colors, pastes artwork onto individual surfaces, adjusts the artwork, and immediately sees the final design on the actual 3D garment across desktop, tablet, and mobile devices.