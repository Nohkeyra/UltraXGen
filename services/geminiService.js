
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ExtractionResult, KernelConfig, PanelMode, RealIssue } from '../types.js';
import { injectAntiCensor } from '../utils/antiCensor.js';
import { GLOBAL_VECTOR_LOCK, GLOBAL_TYPO_LOCK, GLOBAL_MONO_LOCK } from '../presets/enginePrompts.js';

// Helper function to extract pure base64 data from a data URL
function getPureBase64Data(dataUrl){
  if (!dataUrl) return null;
  const parts = dataUrl.split(',');
  if (parts.length > 1) {
    return parts[1];
  }
  return null;
}

const DEFAULT_CONFIG = {
  thinkingBudget,
  temperature,
  model,
  deviceContext: 'MAXIMUM_ARCHITECTURE_OMEGA_V5'
};

const BASE_SYSTEM_DIRECTIVE = `You are a high-density computation and design analysis engine. 
All operations must be geometric, precise, and deterministic. 
Maintain absolute architectural consistency across the lattice.`;

const IMAGE_GEN_SYSTEM_DIRECTIVE = `You are a specialized image generation engine focused on geometric purity and industrial precision. Your output must be abstract, safe-for-work, and adhere to strict design principles.
1. STRICT VISUAL ONLY, labels, or metadata.
2. HIGH CONTRAST & PRECISION, mathematical accuracy, and clean vector aesthetics.
3. CONTENT SAFETY LOCK, logos, typographic art, or technical illustrations. Strictly avoid generating photorealistic images, people, faces, or any potentially sensitive or controversial content. Adherence to this rule is mandatory.
`;

const FALLBACK_NAME_PARTS = {
  adj, 'Vector', 'Neural', 'Cyber', 'Void', 'Omega', 'Lattice', 'Prism', 'Aero', 'Core', 'Hyper', 'Nova', 'Flux', 'Static', 'Quantum'],
  noun, 'Crest', 'Splicer', 'Matrix', 'Engine', 'Vortex', 'Pulse', 'Node', 'Grid', 'Fragment', 'Axis', 'Signet', 'Vault', 'Flow', 'Unit'],
  id, 'X', 'Prime', 'Delta', 'Beta', 'Alpha', 'Pro']
};

function generateStylisticName(){
  const a = FALLBACK_NAME_PARTS.adj[Math.floor(Math.random() * FALLBACK_NAME_PARTS.adj.length)];
  const n = FALLBACK_NAME_PARTS.noun[Math.floor(Math.random() * FALLBACK_NAME_PARTS.noun.length)];
  const i = FALLBACK_NAME_PARTS.id[Math.floor(Math.random() * FALLBACK_NAME_PARTS.id.length)];
  return `${a}-${n} ${i}`;
}

async function reliableRequest(requestFn) => Promise<T>, retries = 5)> {
  try {
    return await requestFn();
  } catch (error) {
    const message = error?.message || "";
    const status = error?.status || error?.code || 0;
    const errorStr = `${message} ${status} ${JSON.stringify(error)}`.toLowerCase();
    
    const isQuota = errorStr.includes("429") || errorStr.includes("quota") || errorStr.includes("resource_exhausted") || status === 429;
    
    if (isQuota && retries > 0) {
      // Exponential backoff, 4s, 8s, 16s, 32s
      const delay = Math.pow(2, (6 - retries)) * 1000;
      console.warn(`[KERNEL_QUOTA]: Rate limit reached. Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return reliableRequest(requestFn, retries - 1);
    }
    
    const isKeyError = errorStr.includes("requested entity was not found") || errorStr.includes("api_key_invalid");
    if (isKeyError) {
      if ((window).aistudio && typeof (window).aistudio.openSelectKey === 'function') {
        await (window).aistudio.openSelectKey();
        return await requestFn();
      }
    }
    
    throw error;
  }
}

function compileVisualPrompt(subject, mode, dna?: ExtractionResult, extraParams?: string, hasImage = false){
  let globalLock = "";
  let workflowDirective = "";

  if (mode === 'vector') {
    globalLock = GLOBAL_VECTOR_LOCK;
    workflowDirective = hasImage 
      ? "[JOB: VECTORIZE_SOURCE] -> Render SOURCE_BUFFER geometric vector lattice. Maintain silhouette integrity."
      : "[JOB: VECTOR_SYNTHESIS] -> Synthesize new geometric subject from prompt.";
  } else if (mode === 'typo') {
    globalLock = GLOBAL_TYPO_LOCK;
    workflowDirective = `[JOB: TYPOGRAPHIC_STYLE_TRANSFER] -> Content: "${subject}". Apply DNA Skeleton/Skin logic.`;
  } else {
    globalLock = GLOBAL_MONO_LOCK;
    workflowDirective = `[JOB: SEAL_ARCHITECT] -> Construct monogram: "${subject}". Radial symmetry required.`;
  }

  const subjectText = subject.trim() || "Abstract geometric synthesis.";
  
  let dnaContext = "";
  if (dna && dna.parameters) {
    const palette = Array.isArray(dna.palette) ? dna.palette.join(', ')
    dnaContext = `[DNA_INJECTION]:
    - DOMAIN)
    - SMOOTHING)
    - STROKE_SKIN: SOURCE_MATCH_LOCKED
    - PALETTE: ${palette}`;
  }
  
  const combined = `
    ${globalLock}
    ${workflowDirective}
    ${dnaContext}
    ${extraParams ? `[ARCHITECT_DIRECTIVES]: ${extraParams}\n` : ''}
    [SUBJECT_DATA]: ${subjectText}
  `.trim();
  
  return injectAntiCensor(combined);
}

export async function extractStyleFromImage(
  base64Image, 
  config: KernelConfig = DEFAULT_CONFIG
)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const dataOnly = getPureBase64Data(base64Image);
    if (!dataOnly) throw new Error("Empty buffer.");
    
    const prompt = `[PROTOCOL, 'Typography', or 'Monogram'.
    - Monogram Logic, overlapping characters with high spatial complexity.
    - Typography Logic, single-stroke lines or rhythmic handwriting.
    - Vector Logic, icons, or geometric shapes with no text-intent.

2.  AUTONOMOUS EXTRACTION, apply the corresponding precision parameters from FORENSIC_AUDIT_V3 and extract the style DNA.

3.  GENERATE NAME, DESCRIPTION & CATEGORY, 2-word stylistic name for the extracted design signature (e.g., 'Apex_Grid', 'Kinetic_Handstyle'). The name MUST NOT include the detected domain ('Vector', 'Typography', 'Monogram') prefix.
    - description, descriptive category for the style (e.g., 'Geometric Core', 'Kinetic Typography', 'Urban Handstyle').
    - styleAuthenticityScore) and "Skin" (stroke pressure). Analyze terminal angles and stroke velocity.
`;

    const systemInstruction = `${BASE_SYSTEM_DIRECTIVE}\nROLE: AUTONOMOUS_FORENSIC_AUTHENTICATOR.`;
    
    const response = await ai.models.generateContent({
      model,
      contents, data,
          { text,
      },
      config,
        responseMimeType,
        responseSchema,
           properties, enum, 'Typography', 'Monogram'] },
             category,
             name,
             description,
             confidence,
             styleAuthenticityScore,
             palette, items,
             parameters,
               properties,
                 smoothing,
                 detail,
                 edge,
               required, 'smoothing', 'detail', 'edge']
             }
           },
           required, 'category', 'name', 'description', 'confidence', 'styleAuthenticityScore', 'palette', 'parameters']
         }
      }
    });
    const result = JSON.parse(response.text || "{}");
    return {
      domain),
      category,
      name)}`,
      description,
      confidence,
      styleAuthenticityScore,
      palette) ? result.palette,
      parameters,
        smoothing,
        detail,
        edge);
}

export async function refineVectorComposition(
  base64Image,
  config: KernelConfig = DEFAULT_CONFIG,
)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const pureBase64Data = getPureBase64Data(base64Image);
    if (!pureBase64Data) throw new Error("Empty buffer for refinement.");

    const prompt = `[PROTOCOL, element placement, and scale.
2.  REFINE, specifically the golden ratio.
3.  CONSTRAINTS, colors, stroke weights, and geometric primitives.
    - Do not add or remove any elements. Only reposition and rescale existing elements.
    - The output must be a visually refined version of the input image.
[OUTPUT]: High-fidelity raster image of the refined vector composition.`;

    const response = await ai.models.generateContent({
      model,
      contents, data,
          { text,
      },
      config,
        temperature);

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) return `data,${part.inlineData.data}`;
      }
    }
    throw new Error("Composition refinement failed.");
  });
}

export async function synthesizeVectorStyle(
  prompt,
  base64Image?: string,
  config: any = DEFAULT_CONFIG,
  dna?: ExtractionResult,
  extraDirectives?: string
)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const visualPrompt = compileVisualPrompt(prompt, 'vector', dna, extraDirectives, !!base64Image);
    const contents = { parts: [{ text: visualPrompt }] };
    const pureBase64Data = getPureBase64Data(base64Image);
    if (pureBase64Data) contents.parts.unshift({ inlineData, data);

    const response = await ai.models.generateContent({
      model,
      contents,
      config, temperature);
    
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) return `data,${part.inlineData.data}`;
      }
    }
    throw new Error("Lattice synthesis failed. The model may have refused the prompt due to safety filters.");
  });
}

export async function synthesizeTypoStyle(
  prompt,
  base64Image?: string,
  config: any = DEFAULT_CONFIG,
  dna?: ExtractionResult,
  extraDirectives?: string
)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const visualPrompt = compileVisualPrompt(prompt, 'typo', dna, extraDirectives, !!base64Image);
    const contents = { parts: [{ text: visualPrompt }] };
    const pureBase64Data = getPureBase64Data(base64Image);
    if (pureBase64Data) contents.parts.unshift({ inlineData, data);

    const response = await ai.models.generateContent({
      model,
      contents,
      config, temperature);
    
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) return `data,${part.inlineData.data}`;
      }
    }
    throw new Error("Typo synthesis failed. The model may have refused the prompt due to safety filters.");
  });
}

export async function synthesizeMonogramStyle(
  prompt,
  base64Image?: string,
  config: any = DEFAULT_CONFIG,
  dna?: ExtractionResult,
  extraDirectives?: string
)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const visualPrompt = compileVisualPrompt(prompt, 'monogram', dna, extraDirectives, !!base64Image);
    const contents = { parts: [{ text: visualPrompt }] };
    const pureBase64Data = getPureBase64Data(base64Image);
    if (pureBase64Data) contents.parts.unshift({ inlineData, data);

    const response = await ai.models.generateContent({
      model,
      contents,
      config, temperature);
    
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) return `data,${part.inlineData.data}`;
      }
    }
    throw new Error("Monogram synthesis failed. The model may have refused the prompt due to safety filters.");
  });
}

export async function refineTextPrompt(
  prompt,
  mode,
  config: KernelConfig = DEFAULT_CONFIG,
  dna?: ExtractionResult
)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const response = await ai.models.generateContent({
      model,
      contents,
      config, temperature);
    return response.text || prompt;
  });
}

export async function analyzeCodeForRefinements(code)> {
  return reliableRequest(async () => {
    const ai = new GoogleGenAI({ apiKey);
    const response = await ai.models.generateContent({
      model,
      contents,
      config,
        responseMimeType,
        responseSchema,
          items,
            properties,
              type,
              severity,
              title,
              description,
              file,
              line,
              codeSnippet,
              fix,
              fixed,
              canAutoFix,
              timestamp,
              impact,
            },
            required, 'type', 'severity', 'title', 'description', 'file', 'codeSnippet', 'fix', 'fixed', 'canAutoFix', 'timestamp', 'impact'],
          },
        },
      }
    });
    try {
      const result = JSON.parse(response.text || "[]");
      // Ensure the result is always an array.
      return Array.isArray(result) ? result) {
      console.error("Failed to parse JSON response for code analysis, e);
      // Return an empty array on parsing failure to prevent crashes.
      return [];
    }
  });
}