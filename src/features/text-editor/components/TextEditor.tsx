import React, { useState } from 'react';
import { AlignLeft, AlignCenter, AlignRight, Trash2, Copy, Plus } from 'lucide-react';
import { PRESET_COLORS } from '@/constants/design.constants';

export interface TextOptions {
  content: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  color: string;
  textAlign: 'left' | 'center' | 'right';
}

interface TextEditorProps {
  initialValues?: Partial<TextOptions>;
  isEditingSelected?: boolean;
  onAddText?: (options: TextOptions) => void;
  onUpdateText?: (updates: Partial<TextOptions>) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

const AVAILABLE_FONTS = [
  { name: 'Inter', family: 'Inter, sans-serif' },
  { name: 'Roboto', family: 'Roboto, sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { name: 'Oswald', family: 'Oswald, sans-serif' },
  { name: 'Poppins', family: 'Poppins, sans-serif' },
  { name: 'Arial', family: 'Arial, sans-serif' },
];

export const TextEditor: React.FC<TextEditorProps> = ({
  initialValues,
  isEditingSelected = false,
  onAddText,
  onUpdateText,
  onDelete,
  onDuplicate,
}) => {
  const [content, setContent] = useState(initialValues?.content || 'Custom Text');
  const [fontFamily, setFontFamily] = useState(initialValues?.fontFamily || 'Inter, sans-serif');
  const [fontSize, setFontSize] = useState(initialValues?.fontSize || 54);
  const [fontWeight, setFontWeight] = useState<string | number>(initialValues?.fontWeight || 'bold');
  const [color, setColor] = useState(initialValues?.color || '#171717');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(
    initialValues?.textAlign || 'center'
  );

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onUpdateText?.({ content: newContent });
  };

  const handleFontChange = (newFont: string) => {
    setFontFamily(newFont);
    onUpdateText?.({ fontFamily: newFont });
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    onUpdateText?.({ fontSize: newSize });
  };

  const handleFontWeightChange = (newWeight: string) => {
    setFontWeight(newWeight);
    onUpdateText?.({ fontWeight: newWeight });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onUpdateText?.({ color: newColor });
  };

  const handleAlignChange = (newAlign: 'left' | 'center' | 'right') => {
    setTextAlign(newAlign);
    onUpdateText?.({ textAlign: newAlign });
  };

  const handleAddClick = () => {
    onAddText?.({
      content,
      fontFamily,
      fontSize,
      fontWeight,
      color,
      textAlign,
    });
  };

  return (
    <div className="space-y-4">
      {/* If not currently selecting a text object, show quick add button */}
      {!isEditingSelected && (
        <button
          type="button"
          onClick={handleAddClick}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Text to Garment</span>
        </button>
      )}

      {/* Text Content Input */}
      <div>
        <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
          Text Content
        </label>
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Enter custom slogan, name, or text..."
          rows={2}
          className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none font-medium"
        />
      </div>

      {/* Font Family Selection */}
      <div>
        <label className="text-xs font-semibold text-neutral-800 block mb-1.5">
          Font Family
        </label>
        <select
          value={fontFamily}
          onChange={(e) => handleFontChange(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all font-medium"
        >
          {AVAILABLE_FONTS.map((f) => (
            <option key={f.name} value={f.family} style={{ fontFamily: f.family }}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size & Weight Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-neutral-800">Size</span>
            <span className="text-xs font-mono text-neutral-500">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={18}
            max={120}
            value={fontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-neutral-800 block mb-1.5">Weight</span>
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => handleFontWeightChange('normal')}
              className={`flex-1 py-1 text-[11px] rounded transition-colors ${
                fontWeight === 'normal' || fontWeight === 400
                  ? 'bg-white font-normal text-neutral-900 shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Regular
            </button>
            <button
              type="button"
              onClick={() => handleFontWeightChange('bold')}
              className={`flex-1 py-1 text-[11px] rounded transition-colors ${
                fontWeight === 'bold' || fontWeight === 700
                  ? 'bg-white font-bold text-neutral-900 shadow-2xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Bold
            </button>
          </div>
        </div>
      </div>

      {/* Alignment */}
      <div>
        <span className="text-xs font-semibold text-neutral-800 block mb-1.5">Alignment</span>
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => handleAlignChange('left')}
            className={`flex-1 py-1.5 flex items-center justify-center rounded-lg transition-colors ${
              textAlign === 'left' ? 'bg-white shadow-2xs text-blue-600' : 'text-neutral-500'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignChange('center')}
            className={`flex-1 py-1.5 flex items-center justify-center rounded-lg transition-colors ${
              textAlign === 'center' ? 'bg-white shadow-2xs text-blue-600' : 'text-neutral-500'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignChange('right')}
            className={`flex-1 py-1.5 flex items-center justify-center rounded-lg transition-colors ${
              textAlign === 'right' ? 'bg-white shadow-2xs text-blue-600' : 'text-neutral-500'
            }`}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Text Color Swatches */}
      <div>
        <span className="text-xs font-semibold text-neutral-800 block mb-1.5">Text Color</span>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg border border-neutral-200 overflow-hidden shrink-0 relative">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-full" style={{ backgroundColor: color }} />
          </div>
          <span className="text-xs font-mono font-medium uppercase text-neutral-600">
            {color}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {PRESET_COLORS.slice(0, 12).map((item) => (
            <button
              key={item.hex}
              type="button"
              onClick={() => handleColorChange(item.hex)}
              className={`w-full aspect-square rounded-md border ${
                color.toUpperCase() === item.hex.toUpperCase()
                  ? 'border-blue-600 ring-2 ring-blue-600/30'
                  : 'border-neutral-200'
              }`}
              style={{ backgroundColor: item.hex }}
              title={item.name}
            />
          ))}
        </div>
      </div>

      {/* Action buttons when editing an existing selection */}
      {isEditingSelected && (
        <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              Duplicate
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};
