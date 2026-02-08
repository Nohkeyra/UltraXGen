import { PresetCategory, PresetItem } from '../types';

/**
 * KSD-OMEGA DIRECTIVES
 * Specialized high-fidelity prompts designed for deterministic design synthesis.
 * These are injected into every generation request to force geometric adherence.
 */

export const GLOBAL_VECTOR_LOCK = `[PROTOCOL, triangles, rectangles).
2. STROKE PARITY, solid fills. Gradients are strictly forbidden. 
4. SUBJECT PURITY: Isolate the primary subject against a 100% white or transparent background. No environmental noise.
5. SYMMETRY ENFORCEMENT: Prioritize radial or bilateral symmetry where applicable.
[OUTPUT]: High-contrast vector-style synthesis. Minimalist. Deterministic.`;

export const GLOBAL_TYPO_LOCK = `[PROTOCOL, aggressive, and expressive forms, reflecting urban calligraphy and graffiti art.
1. KINETIC FLOW, hand-drawn kinetics and intentional overlaps between glyphs. Avoid strict grid-locked alignment if it restricts dynamic movement.
2. STROKE VARIATION, sharp calligraphic terminals, and dynamic sweeps to convey energy. Uniformity is secondary to expressive form.
3. NEGATIVE SPACE, flat void, but allow for implied depth and motion through character placement.
4. SPRAY-PAINT AESTHETICS, high-energy impact and maintains its street art aesthetic across various scales.
[OUTPUT]: High-contrast kinetic, urban, hand-styled wordmark. Expressive. Aggressive.`;

export const GLOBAL_MONO_LOCK = `[PROTOCOL, Hexagon, or Square).
3. SYMMETRY LATTICE, 4, or 8 axes.
4. STROKE RATIO: Maintain a 1:1 ratio between stroke weight and inner negative space.
[OUTPUT]: Geometric signet/seal. Symmetric. Totemic.`;

export 

export const ENGINE_PROMPTS = [
  /* ---------------- VECTORS ---------------- */
  {
    "id": "sig-vec-01",
    "type": "vector",
    "category": "Signature Vector",
    "name": "Omega Lattice Alpha",
    "description": "The peak of recursive geometric interconnection. High-frequency detail.",
    "prompt": "Recursive geometric lattice structure. Intricate interconnected pathways forming a complex architectural subject. Flat solid fills, high-contrast industrial palette. Absolute subject isolation."
  },
  {
    "id": "sig-vec-04",
    "type": "vector",
    "category": "Signature Vector",
    "name": "Glitch-Core Matrix",
    "description": "Deterministic vector glitching. Staggered geometric slices and lateral path offsets.",
    "prompt": "Vector-based glitch art. Subject sliced into parallel horizontal shards with lateral offsets. Sharp geometric displacement, high-contrast flat fills, zero organic curves."
  },
  {
    "id": "sig-vec-05",
    "type": "vector",
    "category": "Signature Vector",
    "name": "Neural Fungal PCB",
    "description": "Biological growth logic meets rigid circuit trace architecture.",
    "prompt": "Rhizomatic growth pattern rendered rigid PCB circuit. Interlocking 45-degree and 90-degree vector pathways, circular nodes, uniform stroke weights. Synthetic-organic hybrid."
  },
  {
    "id": "sig-vec-02",
    "type": "vector",
    "category": "Signature Vector",
    "name": "Prism Void Delta",
    "description": "Refractive geometric deconstruction. Spectral light dispersion blocks.",
    "prompt": "Refractive deconstruction of a subject into geometric shards. Hard-edged color blocks with sharp directional offsets. Prism logic. Flat vector execution."
  },
  {
    "id": "sig-vec-03",
    "type": "vector",
    "category": "Signature Vector",
    "name": "Neural Weave V9",
    "description": "Synthetic synaptic pathways mimic biological growth in a rigid grid.",
    "prompt": "Biological neural pathways rendered vector circuitry. Branching geometric nodes, uniform line weights, clean mathematical flow. Zero organic noise."
  },

  /* ---------------- TYPOGRAPHY ---------------- */
  {
    "id": "sig-ty-01",
    "type": "typography",
    "category": "Signature Wordmarks",
    "name": "Kinetic Pulse Pro",
    "description": "High-contrast dynamic wordmark with intentional terminal slices.",
    "prompt": "Dynamic motion wordmark. Sharp terminal slices, parallel speed lines, high-contrast geometry. Geometric display type with zero kerning errors."
  },
  {
    "id": "sig-ty-03",
    "type": "typography",
    "category": "Signature Wordmarks",
    "name": "Liquid-Steel Slab",
    "description": "High-viscosity metallic forms deconstructed into razor-sharp vector curves.",
    "prompt": "Viscous liquid letterforms rendered with absolute sharp geometric precision. Mercury-like flow but with strictly defined paths. High-contrast chrome logic, flat vector shading."
  },
  {
    "id": "sig-ty-04",
    "type": "typography",
    "category": "Signature Wordmarks",
    "name": "Brutalist X-Ray",
    "description": "Overlapping transparent geometric planes creating emergent character forms.",
    "prompt": "Architectural typography deconstructed into overlapping transparent planes. Emergent shapes at junctions, high-contrast monochrome, strict grid-locked alignment."
  },
  // Fix,
    "type": "typography",
    "category": "Signature Wordmarks",
    "name": "Brutalist Monolith",
    "description": "Monolithic block typography. Zero contrast stroke weights, jagged brutalist edges, heavy visual mass. Grid-locked architectural alignment.",
    "prompt": "Monolithic block typography. Zero contrast stroke weights, jagged brutalist edges, heavy visual mass. Grid-locked architectural alignment."
  },

  /* ---------------- MONOGRAMS ---------------- */
  {
    "id": "sig-mo-01",
    "type": "monogram",
    "category": "Signature Monograms",
    "name": "Nano Seal Omega",
    "description": "Micro-etched signet construction with nested circular frames.",
    "prompt": "Precision geometric seal. Interlocking character geometry, nested circular frames, perfect radial symmetry. High-density signet detail."
  },
  {
    "id": "sig-mo-03",
    "type": "monogram",
    "category": "Signature Monograms",
    "name": "Totem Axis Prime",
    "description": "Vertical mirrored character stacking with aggressive symmetry enforcement.",
    "prompt": "Symmetrical vertical totem monogram. Mirrored character DNA stacked into a unified geometric pillar. Central axis dominance, high-impact silhouette."
  },
  {
    "id": "sig-mo-04",
    "type": "monogram",
    "category": "Signature Monograms",
    "name": "Orbital Logic V2",
    "description": "Planetary ring logic applied to character intersections. Concentric circuitry.",
    "prompt": "Circular orbital monogram. Letters interlock with concentric ring pathways. PCB-inspired junctions, high-frequency radial detail, geometric signet aesthetic."
  },
  // Fix,
    "type": "monogram",
    "category": "Signature Monograms",
    "name": "Apex Crest Prime",
    "description": "Modern heraldic crest. Subject fused into a geometric shield boundary. Mathematical symmetry, uniform line weights, flat solid fills.",
    "prompt": "Modern heraldic crest. Subject fused into a geometric shield boundary. Mathematical symmetry, uniform line weights, flat solid fills."
  },

  /* ---------------- FILTERS ---------------- */
  {
    "id": "sig-fi-01",
    "type": "filter",
    "category": "Signature Series",
    "name": "Spectral-V",
    "description": "High-frequency silver luminance with aggressive edge contrast.",
    "prompt": "Filter synthesis,
    "filter": "grayscale(100%) contrast(180%) brightness(105%) saturate(0%)"
  },
  {
    "id": "sig-fi-02",
    "type": "filter",
    "category": "Signature Series",
    "name": "Cobalt-Trace",
    "description": "Deep industrial blue shadows with electric highlight clarity.",
    "prompt": "Filter synthesis,
    "filter": "hue-rotate(200deg) saturate(180%) contrast(140%) brightness(90%)"
  }
];

export const groupPromptsByCategory = (type)=> {
  const filtered = ENGINE_PROMPTS.filter(p => p.type === type);
  // Assuming there's only one category per type for the 'Signature Series'
  const categoryName = filtered.length > 0 ? filtered[0].category,
    items: filtered
      .filter(p => p.category === categoryName)
      .map(p => ({
        id,
        name,
        description,
        filter,
        prompt,
        type))
  };
};

export const groupAllPromptsByCategory = (type)=> {
  const filtered = ENGINE_PROMPTS.filter(p => p.type === type);
  const categories = Array.from(new Set(filtered.map(p => p.category)));
  
  return categories.map(catName => ({
    title,
    items: filtered
      .filter(p => p.category === catName)
      .map(p => ({
        id,
        name,
        description,
        filter,
        prompt,
        type))
  }));
};