import { useState, useCallback } from 'react';
import type { Canvas, FabricObject, Textbox } from 'fabric';
import {
  addImageToCanvas,
  addTextToCanvas,
  exportCanvasAsDataUrl,
  serializeCanvas,
} from '../services/canvas.service';
import type { TextOptions } from '@/features/text-editor/components/TextEditor';
import { useDesignerStore } from '@/stores/designer.store';

export const useArtworkCanvas = () => {
  const [canvasInstance, setCanvasInstance] = useState<Canvas | null>(null);
  const selectedSurface = useDesignerStore((state) => state.selectedSurface);
  const setSurfaceTexture = useDesignerStore((state) => state.setSurfaceTexture);
  const pushHistory = useDesignerStore((state) => state.pushHistory);

  const updateTexture = useCallback(() => {
    if (!canvasInstance) return;
    const objects = canvasInstance.getObjects();
    const dataUrl = objects.length > 0 ? exportCanvasAsDataUrl(canvasInstance) : null;
    const json = serializeCanvas(canvasInstance);
    setSurfaceTexture(selectedSurface, dataUrl, json);
  }, [canvasInstance, selectedSurface, setSurfaceTexture]);

  const addImage = useCallback(
    async (imageUrl: string) => {
      if (!canvasInstance) return;
      pushHistory();
      await addImageToCanvas(canvasInstance, imageUrl);
      updateTexture();
    },
    [canvasInstance, pushHistory, updateTexture]
  );

  const addText = useCallback(
    (options: TextOptions) => {
      if (!canvasInstance) return;
      pushHistory();
      addTextToCanvas(canvasInstance, options.content, {
        fontFamily: options.fontFamily,
        fontSize: options.fontSize,
        fontWeight: options.fontWeight,
        fill: options.color,
        textAlign: options.textAlign,
      });
      updateTexture();
    },
    [canvasInstance, pushHistory, updateTexture]
  );

  const updateSelectedObject = useCallback(
    (updates: Partial<TextOptions> & { opacity?: number; scale?: number; angle?: number }) => {
      if (!canvasInstance) return;
      const activeObj = canvasInstance.getActiveObject();
      if (!activeObj) return;

      if (activeObj.type === 'textbox' || activeObj.type === 'text') {
        const textbox = activeObj as Textbox;
        if (updates.content !== undefined) textbox.set('text', updates.content);
        if (updates.fontFamily !== undefined) textbox.set('fontFamily', updates.fontFamily);
        if (updates.fontSize !== undefined) textbox.set('fontSize', updates.fontSize);
        if (updates.fontWeight !== undefined) textbox.set('fontWeight', updates.fontWeight as string);
        if (updates.color !== undefined) textbox.set('fill', updates.color);
        if (updates.textAlign !== undefined) textbox.set('textAlign', updates.textAlign);
      }

      if (updates.opacity !== undefined) activeObj.set('opacity', updates.opacity);
      if (updates.scale !== undefined) activeObj.scale(updates.scale);
      if (updates.angle !== undefined) activeObj.set('angle', updates.angle);

      canvasInstance.renderAll();
      updateTexture();
    },
    [canvasInstance, updateTexture]
  );

  const deleteSelected = useCallback(() => {
    if (!canvasInstance) return;
    const activeObj = canvasInstance.getActiveObject();
    if (!activeObj) return;

    pushHistory();
    canvasInstance.remove(activeObj);
    canvasInstance.discardActiveObject();
    canvasInstance.renderAll();
    updateTexture();
  }, [canvasInstance, pushHistory, updateTexture]);

  const duplicateSelected = useCallback(async () => {
    if (!canvasInstance) return;
    const activeObj = canvasInstance.getActiveObject();
    if (!activeObj) return;

    pushHistory();
    const cloned = await (activeObj as unknown as { clone: () => Promise<FabricObject> }).clone();
    cloned.set({
      left: (activeObj.left || 0) + 30,
      top: (activeObj.top || 0) + 30,
    });
    canvasInstance.add(cloned);
    canvasInstance.setActiveObject(cloned);
    canvasInstance.renderAll();
    updateTexture();
  }, [canvasInstance, pushHistory, updateTexture]);

  const centerSelected = useCallback(() => {
    if (!canvasInstance) return;
    const activeObj = canvasInstance.getActiveObject();
    if (!activeObj) return;

    canvasInstance.centerObject(activeObj);
    canvasInstance.renderAll();
    updateTexture();
  }, [canvasInstance, updateTexture]);

  const bringForward = useCallback(() => {
    if (!canvasInstance) return;
    const activeObj = canvasInstance.getActiveObject();
    if (!activeObj) return;

    canvasInstance.bringObjectForward(activeObj);
    canvasInstance.renderAll();
    updateTexture();
  }, [canvasInstance, updateTexture]);

  const sendBackward = useCallback(() => {
    if (!canvasInstance) return;
    const activeObj = canvasInstance.getActiveObject();
    if (!activeObj) return;

    canvasInstance.sendObjectBackwards(activeObj);
    canvasInstance.renderAll();
    updateTexture();
  }, [canvasInstance, updateTexture]);

  const clearCanvas = useCallback(() => {
    if (!canvasInstance) return;
    pushHistory();
    canvasInstance.clear();
    updateTexture();
  }, [canvasInstance, pushHistory, updateTexture]);

  return {
    canvasInstance,
    setCanvasInstance,
    addImage,
    addText,
    updateSelectedObject,
    deleteSelected,
    duplicateSelected,
    centerSelected,
    bringForward,
    sendBackward,
    clearCanvas,
    updateTexture,
  };
};
