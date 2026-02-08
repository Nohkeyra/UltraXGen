
import React, { useEffect, useMemo, useCallback, useRef, useState } from 'react';
import { PanelMode, KernelConfig, ExtractionResult, PresetItem, PresetCategory, LogEntry } from '../types.js';
import { PRESET_REGISTRY } from '../presets/index.js';
import { synthesizeMonogramStyle, refineTextPrompt } from '../services/geminiService.js';
import { useDevourer } from '../hooks/useDevourer.js';
import { PresetCard } from './PresetCard.jsx';
import { GenerationBar } from './GenerationBar.jsx';
import { PresetCarousel } from './PresetCarousel.jsx';
import { CanvasStage } from './CanvasStage.jsx';
import { DevourerHUD } from './HUD.jsx';
import { SparkleIcon } from './Icons.jsx';
import { PanelLayout, SidebarHeader } from './Layouts.jsx';










export const MonogramPanel = ({
  initialData,
  kernelConfig,
  integrity,
  refinementLevel = 0,
  uiRefined,
  onSaveToHistory,
  onModeSwitch,
  onSetGlobalDna,
  savedPresets = [],
  globalDna,
  onStateUpdate,
  addLog
}) => {
  const PRESETS = useMemo(() => {
    let presetsToRender = [
      ...PRESET_REGISTRY.MONOGRAM.libraries
    ];

    if (Array.isArray(savedPresets)) {
      const userPresets = savedPresets.filter(p => p && (p.type === PanelMode.MONOGRAM || p.mode === PanelMode.MONOGRAM));
      if (userPresets.length > 0) {
        const grouped, PresetItem[]> = {};
        userPresets.forEach(p => {
          const catName = p.category || p.dna?.category || "VAULT_ARCHIVES";
          if (!grouped[catName]) grouped[catName] = [];
          grouped[catName].push({
            id).toString(),
            name,
            type,
            description,
            dna,
            prompt);
        });
        const userCategories = Object.entries(grouped).map(([title, items]) => ({ title)}`, items }));
        presetsToRender = [...userCategories, ...presetsToRender];
      }
    }
    return presetsToRender;
  }, [savedPresets]);

  const { status, isProcessing, transition } = useDevourer(initialData?.dna || globalDna ? 'DNA_LINKED' : 'STARVING');
  
  // --- Architecture States ---
  const [layoutMode, setLayoutMode] = useState('interlocked');
  const [initialCount, setInitialCount] = useState(1);
  const [orientation, setOrientation] = useState('horizontal');
  const [intersectionGap, setIntersectionGap] = useState(2);
  const [autoWeave, setAutoWeave] = useState(true);
  const [strokeWeight, setStrokeWeight] = useState('regular');
  const [terminalShape, setTerminalShape] = useState('blunt');
  const [cornerRadius, setCornerRadius] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('normal');
  const [geoFrame, setGeoFrame] = useState('none');
  const [opticalKerning, setOpticalKerning] = useState(true);

  const [activePresetId, setActivePresetId] = useState(initialData?.id || null);
  const [activePreset, setActivePreset] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(initialData?.imageUrl || initialData?.uploadedImage || null);
  const [prompt, setPrompt] = useState(''); 
  const [isRefining, setIsRefining] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState(initialData?.generatedOutput || null);
  const [dna, setDna] = useState(initialData?.dna || globalDna || null);
  const [isValidationError, setIsValidationError] = useState(false);
  const processingRef = useRef(false);

  useEffect(() => {
    onStateUpdate?.({
      type,
      prompt,
      generatedOutput,
      uploadedImage,
      dna,
      name,
      settings, initialCount, orientation, intersectionGap, autoWeave, strokeWeight, terminalShape, cornerRadius, aspectRatio, geoFrame, opticalKerning,
      }
    });
  }, [
    onStateUpdate, prompt, generatedOutput, uploadedImage, dna,
    layoutMode, initialCount, orientation, intersectionGap, autoWeave, strokeWeight, terminalShape, cornerRadius, aspectRatio, geoFrame, opticalKerning
  ]);

  useEffect(() => {
    if (globalDna && dna?.name !== globalDna.name) { 
      setDna(globalDna); 
      transition("DNA_LINKED"); 
    }
  }, [globalDna, dna, transition]);

  const handleSelectPreset = useCallback((id) => {
    if (isProcessing) return;
    if (activePresetId === id) {
      setActivePresetId(null);
      setActivePreset(null);
      onSetGlobalDna?.(null); // Clear anchor on deselect
      return;
    }
    setActivePresetId(id);
    const item = PRESETS.flatMap(c => c.items).find(i => i.id === id);
    if (item) {
      setActivePreset(item);
      if (item.dna) { 
        setDna(item.dna); 
        transition("DNA_LINKED"); 
        onSetGlobalDna?.(item.dna); // Auto-anchor DNA
      }
      if ((item).imageUrl) setUploadedImage((item).imageUrl);
    }
  }, [PRESETS, isProcessing, transition, activePresetId, onSetGlobalDna]);

  const handleRefine = async () => {
    if (!prompt.trim() || isRefining) return;
    setIsRefining(true);
    try {
      const refined = await refineTextPrompt(prompt, PanelMode.MONOGRAM, kernelConfig, dna || undefined);
      setPrompt(refined);
    } catch (e) {
      console.error("Refinement failed");
      addLog("PROMPT_REFINE_FAILED", 'error');
    } finally {
      setIsRefining(false);
    }
  };

  const handleGenerate = async () => {
    if (processingRef.current) return;
    const effectivePrompt = prompt.trim() || "X";
    const combinedPrompt = [activePreset?.prompt, effectivePrompt].filter(Boolean).join('. ');
    
    // Construct extra architectural directives string
    const extraDirectives = `
      LAYOUT_MODE)}
      CHARACTER_COUNT)}
      INTERSECTION_GAP)}
      TERMINAL_SHAPE)}
      CORNER_RADIUS)}
      GEOMETRIC_FRAME)}
      OPTICAL_KERNING);

    processingRef.current = true;
    transition(dna ? "DNA_STYLIZE_ACTIVE", true);
    setIsValidationError(false);
    
    try {
      const result = await synthesizeMonogramStyle(combinedPrompt, uploadedImage || undefined, kernelConfig, dna || undefined, extraDirectives);
      setGeneratedOutput(result);
      transition("LATTICE_ACTIVE");
      onSaveToHistory({
        id)}`,
        name,
        description,
        type,
        generatedOutput,
        dna,
        imageUrl,
        timestamp).toLocaleTimeString()
      });
    } catch (e) {
      const errorMessage = e?.message || 'Synthesis failed due to an unknown error.';
      console.error(e);
      addLog(`SYNTHESIS_ERROR, 'error');
      transition("LATTICE_FAIL");
      setIsValidationError(true);
    } finally { 
      processingRef.current = false;
    }
  };

  const SidebarContent = (
    <>
      <SidebarHeader 
        moduleNumber="Module_03" 
        title="Seal_Architect" 
        version="Geometric Monogram core v5.0"
        colorClass="text-brandCharcoalMuted dark:text-white/60"
        borderColorClass="border-brandCharcoal dark:border-white/20"
      />
      
      {/* --- ARCHITECT_CONTROLS --- */}
      <div className="space-y-10 mb-12">
        {/* 1. Primary Logic Switches */}
        <section>
          <h4 className="text-[10px] font-black uppercase text-brandCharcoal/40 dark:text-white/30 tracking-widest mb-4 border-b border-brandCharcoal/10 dark:border-white/5 pb-2">Primary Logic</h4>
          <div className="space-y-4">
            <div>
              <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Layout Mode</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['interlocked', 'stacked', 'block', 'mirrored']).map(m => (
                  <button 
                    key={m} 
                    onClick={() => setLayoutMode(m)}
                    className={`py-2 text-[8px] font-black uppercase tracking-widest border-2 transition-all rounded-sm ${layoutMode === m ? 'bg-brandCharcoal text-white border-brandCharcoal dark))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Initial Count</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(c => (
                    <button 
                      key={c} 
                      onClick={() => setInitialCount(c)}
                      className={`flex-1 py-1.5 text-[8px] font-black border-2 rounded-sm ${initialCount === c ? 'bg-brandCharcoal text-white border-brandCharcoal dark))}
                </div>
              </div>
              <div className="flex-1">
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Orientation</label>
                <select 
                  value={orientation} 
                  onChange={e => setOrientation(e.target.value)}
                  className="w-full bg-transparent border-2 border-brandCharcoal/10 dark:border-white/5 text-[8px] font-black uppercase px-2 py-1.5 rounded-sm outline-none focus:border-brandRed"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                  <option value="diagonal">Diagonal</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Precision Gutter Controls */}
        <section>
          <h4 className="text-[10px] font-black uppercase text-brandCharcoal/40 dark:text-white/30 tracking-widest mb-4 border-b border-brandCharcoal/10 dark:border-white/5 pb-2">Precision Gutter</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40">Intersection Gap</label>
                <span className="text-[8px] font-black text-brandRed">{intersectionGap}%</span>
              </div>
              <input 
                type="range" min="1" max="5" step="0.5" 
                value={intersectionGap} 
                onChange={e => setIntersectionGap(parseFloat(e.target.value))} 
                className="w-full h-1.5 bg-brandCharcoal/5 dark:bg-white/5 appearance-none rounded-full accent-brandRed"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40">Auto-Weave Paths</label>
              <button 
                onClick={() => setAutoWeave(!autoWeave)}
                className={`w-10 h-5 rounded-full p-1 transition-colors ${autoWeave ? 'bg-brandRed' : 'bg-brandCharcoal/20 dark:bg-white/10'}`}
              >
                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${autoWeave ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <button className="w-full py-2 border-2 border-dashed border-brandCharcoal/20 dark:border-white/20 text-[8px] font-black uppercase tracking-widest text-brandCharcoalMuted dark:text-white/40 hover:border-brandRed hover:text-brandRed transition-all">
              Path Knockout_CMD
            </button>
          </div>
        </section>

        {/* 3. Morphological Attributes */}
        <section>
          <h4 className="text-[10px] font-black uppercase text-brandCharcoal/40 dark:text-white/30 tracking-widest mb-4 border-b border-brandCharcoal/10 dark:border-white/5 pb-2">Morphological</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Stroke Weight</label>
                <select value={strokeWeight} onChange={e => setStrokeWeight(e.target.value)} className="w-full bg-transparent border-2 border-brandCharcoal/10 dark:border-white/5 text-[8px] font-black uppercase px-2 py-1.5 rounded-sm outline-none">
                  <option value="hairline">Hairline</option>
                  <option value="regular">Regular</option>
                  <option value="bold">Bold</option>
                  <option value="ultra">Ultra</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Terminal Shape</label>
                <select value={terminalShape} onChange={e => setTerminalShape(e.target.value)} className="w-full bg-transparent border-2 border-brandCharcoal/10 dark:border-white/5 text-[8px] font-black uppercase px-2 py-1.5 rounded-sm outline-none">
                  <option value="sheared">Sheared</option>
                  <option value="rounded">Rounded</option>
                  <option value="blunt">Blunt</option>
                  <option value="tapered">Tapered</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40">Corner Radius</label>
                <span className="text-[8px] font-black text-brandRed">{cornerRadius}%</span>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={cornerRadius} 
                onChange={e => setCornerRadius(parseInt(e.target.value))} 
                className="w-full h-1.5 bg-brandCharcoal/5 dark:bg-white/5 appearance-none rounded-full accent-brandRed"
              />
            </div>
            <div>
              <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Aspect Ratio</label>
              <div className="flex gap-1.5">
                {(['condensed', 'normal', 'expanded']).map(a => (
                  <button key={a} onClick={() => setAspectRatio(a)} className={`flex-1 py-1.5 text-[7px] font-black uppercase border-2 rounded-sm ${aspectRatio === a ? 'bg-brandCharcoal text-white border-brandCharcoal dark))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Symmetry & Alignment */}
        <section>
          <h4 className="text-[10px] font-black uppercase text-brandCharcoal/40 dark:text-white/30 tracking-widest mb-4 border-b border-brandCharcoal/10 dark:border-white/5 pb-2">Symmetry_Alignment</h4>
          <div className="space-y-4">
            <button className="w-full py-2 bg-brandRed/10 border-2 border-brandRed text-[8px] font-black uppercase tracking-widest text-brandRed hover:bg-brandRed hover:text-white transition-all rounded-sm">
              Visual Weight_Smart-Adjust
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40 mb-1.5 block">Geometric Frame</label>
                <select value={geoFrame} onChange={e => setGeoFrame(e.target.value)} className="w-full bg-transparent border-2 border-brandCharcoal/10 dark:border-white/5 text-[8px] font-black uppercase px-2 py-1.5 rounded-sm outline-none">
                  <option value="none">None</option>
                  <option value="circle">Circle</option>
                  <option value="hexagon">Hexagon</option>
                  <option value="shield">Shield</option>
                </select>
              </div>
              <div className="flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase text-brandCharcoalMuted dark:text-white/40">Opt Kerning</span>
                  <button 
                    onClick={() => setOpticalKerning(!opticalKerning)}
                    className={`w-8 h-4 rounded-full p-0.5 transition-colors ${opticalKerning ? 'bg-brandRed' : 'bg-brandCharcoal/20 dark:bg-white/10'}`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${opticalKerning ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- PRESETS --- */}
      <div className="space-y-8">
        {PRESETS.map((cat, i) => (
          <div key={i} className="animate-in fade-in slide-in-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-3 bg-brandCharcoal dark:bg-white/40 rounded-full" />
              <h3 className="text-[9px] font-black uppercase text-brandCharcoal dark:text-white tracking-[0.25em]">{cat.title}</h3>
            </div>
            <div className="space-y-3">
              {cat.items.map(item => (
                <PresetCard 
                  key={item.id} 
                  name={item.name} 
                  description={item.description} 
                  isActive={activePresetId === item.id} 
                  onClick={() => handleSelectPreset(item.id)} 
                  iconChar="M" 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const isAnchored = dna && globalDna?.name === dna.name;

  return (
    <PanelLayout sidebar={SidebarContent}>
      <CanvasStage
        uploadedImage={uploadedImage}
        generatedOutput={generatedOutput}
        isProcessing={isProcessing}
        hudContent={<DevourerHUD devourerStatus={isAnchored ? `DNA_LOCKED)}` : dna?.name ? `DNA_LINKED)}` : status} />}
        isValidationError={isValidationError}
        uiRefined={uiRefined}
        refinementLevel={refinementLevel}
        onClear={() => { setUploadedImage(null); setGeneratedOutput(null); setDna(null); setActivePresetId(null); setActivePreset(null); setPrompt(''); transition("STARVING"); onSetGlobalDna?.(null); }}
        onGenerate={handleGenerate}
        onFileUpload={(file) => {
            const reader = new FileReader();
            reader.onload = e => { setUploadedImage(e.target?.result); transition("BUFFER_LOADED"); };
            reader.readAsDataURL(file);
        }}
        downloadFilename={`hyperxgen_monogram_${Date.now()}.png`}
      />
      
      <div className="flex flex-col gap-6">
        <GenerationBar 
          prompt={prompt} 
          setPrompt={setPrompt} 
          onGenerate={handleGenerate} 
          isProcessing={isProcessing} 
          activePresetName={activePreset?.name || dna?.name}
          placeholder="Enter characters for architect seal (e.g. 'HX')..." 
          refineButton={
            <button 
              onClick={handleRefine}
              disabled={isProcessing || isRefining || !prompt.trim()}
              className={`p-3 bg-black/40 border border-white/10 text-brandYellow hover:text-white transition-all rounded-sm group ${isRefining ? 'animate-pulse' : ''}`}
              title="AI Prompt Refinement"
            >
              <SparkleIcon className={`w-4 h-4 ${isRefining ? 'animate-spin' : 'group-hover:scale-110'}`} />
            </button>
          }
        />

        <PresetCarousel presets={PRESETS} activeId={activePresetId} onSelect={handleSelectPreset} />
      </div>
    </PanelLayout>
  );
};