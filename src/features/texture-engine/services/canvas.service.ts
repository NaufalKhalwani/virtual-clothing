import { Canvas, FabricImage, Textbox, type FabricObject } from 'fabric';

export interface CanvasDimensions {
  width: number;
  height: number;
}

export const CANVAS_SIZE: CanvasDimensions = {
  width: 1024,
  height: 1024,
};

export const createFabricCanvas = (
  canvasEl: HTMLCanvasElement,
  dimensions = CANVAS_SIZE
): Canvas => {
  const canvas = new Canvas(canvasEl, {
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: 'rgba(0,0,0,0)',
    preserveObjectStacking: true,
    selectionColor: 'rgba(37, 99, 235, 0.1)',
    selectionBorderColor: '#2563eb',
    selectionLineWidth: 1.5,
  });

  return canvas;
};

export const addImageToCanvas = async (
  canvas: Canvas,
  imageUrl: string
): Promise<FabricImage> => {
  const img = await FabricImage.fromURL(imageUrl, {
    crossOrigin: 'anonymous',
  });

  // Calculate proportional scaling to fit neatly into center of 1024x1024 canvas
  const targetAreaSize = 480;
  const currentW = img.width || 400;
  const currentH = img.height || 400;
  const scale = Math.min(targetAreaSize / currentW, targetAreaSize / currentH, 1);

  img.scale(scale);

  const scaledW = currentW * scale;
  const scaledH = currentH * scale;

  img.set({
    left: (canvas.width! - scaledW) / 2,
    top: (canvas.height! - scaledH) / 2,
    cornerColor: '#2563eb',
    cornerStrokeColor: '#ffffff',
    cornerStyle: 'circle',
    borderColor: '#2563eb',
    cornerSize: 10,
    transparentCorners: false,
    padding: 6,
  });

  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.renderAll();

  return img;
};

export const addTextToCanvas = (
  canvas: Canvas,
  text: string,
  options: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string | number;
    fill?: string;
    textAlign?: 'left' | 'center' | 'right';
  } = {}
): Textbox => {
  const defaultWidth = 400;
  const textbox = new Textbox(text || 'Your Text Here', {
    left: (canvas.width! - defaultWidth) / 2,
    top: canvas.height! / 2 - 40,
    width: defaultWidth,
    fontSize: options.fontSize || 56,
    fontFamily: options.fontFamily || 'Inter',
    fontWeight: (options.fontWeight as string) || 'bold',
    fill: options.fill || '#171717',
    textAlign: options.textAlign || 'center',
    cornerColor: '#2563eb',
    cornerStrokeColor: '#ffffff',
    cornerStyle: 'circle',
    borderColor: '#2563eb',
    cornerSize: 10,
    transparentCorners: false,
    padding: 6,
  });

  canvas.add(textbox);
  canvas.setActiveObject(textbox);
  canvas.renderAll();

  return textbox;
};

export const exportCanvasAsDataUrl = (canvas: Canvas): string => {
  return canvas.toDataURL({
    format: 'png',
    multiplier: 1,
  });
};

export const serializeCanvas = (canvas: Canvas): string => {
  return JSON.stringify(canvas.toJSON());
};

export const loadCanvasFromJson = async (
  canvas: Canvas,
  jsonString: string
): Promise<void> => {
  try {
    const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    await canvas.loadFromJSON(parsed);
    canvas.renderAll();
  } catch (err) {
    console.error('Failed to load canvas from JSON:', err);
  }
};

export const getSelectedObject = (canvas: Canvas): FabricObject | null => {
  return canvas.getActiveObject() || null;
};
