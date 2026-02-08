import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { PanelMode, KernelConfig } from '../types.js';
import { PRESET_REGISTRY } from '../presets/index.js';
import { GenerationBar } from './GenerationBar.jsx';
import { PresetCarousel } from './PresetCarousel.jsx';
import { CanvasStage } from './CanvasStage.jsx';
import { FilterHUD } from './HUD.jsx';
import { PanelLayout } from './Layouts.jsx';



const applyFiltersToImage = (imageUrl, b, c, s, f)> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width; canvas.height = img.height;
      if (ctx) {
        ctx.filter = `brightness(${b}%) contrast(${c}%) saturate(${s}%) ${f}`;
        ctx.drawImage(img, 0, 0); resolve(canvas.toDataURL('image/png'));
      } else resolve(imageUrl);
    };
    img.src = imageUrl;
  });
};

export const ImageFilterPanel = ({ onSaveToHistory, integrity, refinementLevel = 0, uiRefined, kernelConfig, onStateUpdate }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterStatus, setFilterStatus] = useState("IDLE");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeFilterId, setActiveFilterId] = useState(null);
  
  const processingRef = useRef(false);

  const PRESETS = useMemo(() => {
    return PRESET_REGISTRY.FILTERS.libraries;
  }, []);

  useEffect(() => {
    const activeFilter = PRESETS.flatMap(c => c.items).find(f => f.id === activeFilterId);
    onStateUpdate?.({
      type,
      name,
      uploadedImage,
      generatedOutput,
      settings,
        contrast,
        saturation,
        activeFilterId,
      }
    });
  }, [onStateUpdate, uploadedImage, filteredImage, brightness, contrast, saturation, activeFilterId, PRESETS]);

  const handleApplyFilter = useCallback(async () => {
    if (processingRef.current || !uploadedImage) return;
    setIsProcessing(true);
    processingRef.current = true;
    setFilterStatus("APPLYING_TRANSFORMATION...");
    try {
      const activeFilter = PRESETS.flatMap(c => c.items).find(f => f.id === activeFilterId);
      const fCss = (activeFilter)?.filter || '';
      const result = await applyFiltersToImage(uploadedImage, brightness, contrast, saturation, fCss);
      setFilteredImage(result);
      setFilterStatus("TRANSFORMATION_COMPLETE");
    } catch (e) {
      console.error(e);
      setFilterStatus("TRANSFORMATION_FAILED");
    } finally { 
      setIsProcessing(false); 
      processingRef.current = false;
    }
  }, [uploadedImage, brightness, contrast, saturation, activeFilterId, PRESETS]);

  return (
    <PanelLayout sidebar={null}>
      <CanvasStage
        uploadedImage={uploadedImage}
        generatedOutput={filteredImage}
        isProcessing={isProcessing}
        hudContent={<FilterHUD filterStatus={filterStatus} />}
        isValidationError={false}
        uiRefined={uiRefined}
        refinementLevel={refinementLevel}
        onClear={() => {
          if(isProcessing) return;
          setUploadedImage(null);
          setFilteredImage(null);
          setActiveFilterId(null);
          setFilterStatus("IDLE");
        }}
        onGenerate={handleApplyFilter}
        onFileUpload={(f) => {
          if(isProcessing) return;
          const r = new FileReader(); r.onload = (e) => {
              const base64 = e.target?.result;
              setUploadedImage(base64);
              setFilteredImage(base64);
              setFilterStatus("BUFFER_LOADED");
          }; 
          r.readAsDataURL(f);
        }}
        downloadFilename={`hyperxgen_filter_${Date.now()}.png`}
      />

      <div className="flex flex-col gap-6">
        <GenerationBar
          onGenerate={handleApplyFilter}
          isProcessing={isProcessing}
          additionalControls={
            <div className="flex-1 flex items-center gap-6 py-2 min-w-0">
              {[
                { label, val, set,
                { label, val, set,
                { label, val, set: setSaturation }
              ].map(s => (
                <div key={s.label} className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-brandCharcoal dark:text-white tracking-widest">{s.label}</span>
                    <span className="text-[10px] font-mono font-black text-brandRed drop-shadow-sm">{s.val}%</span>
                  </div>
                  <div className="relative flex items-center h-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={s.val} 
                      disabled={isProcessing}
                      onChange={e => s.set(parseInt(e.target.value))} 
                      className="w-full h-2 bg-brandCharcoalMuted/30 border border-white/10 rounded-full appearance-none accent-brandRed cursor-pointer disabled))}
            </div>
          }
        />

        <PresetCarousel presets={PRESETS} activeId={activeFilterId} onSelect={(id) => !isProcessing && setActiveFilterId(id)} />
      </div>
    </PanelLayout>
  );
};
