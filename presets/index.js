import { PresetCategory, PresetItem } from '../types';
import { 
  GLOBAL_VECTOR_LOCK, 
  GLOBAL_TYPO_LOCK, 
  GLOBAL_MONO_LOCK, 
  groupAllPromptsByCategory
} from './enginePrompts';

// Export global locks directly from enginePrompts
export { GLOBAL_VECTOR_LOCK, GLOBAL_TYPO_LOCK, GLOBAL_MONO_LOCK };

/**
 * FULL PRESET LIBRARIES
 * Grouped for sidebar and carousel navigation.
 */
export const VECTOR_PRESETS = groupAllPromptsByCategory('vector');
export const TYPOGRAPHY_PRESETS = groupAllPromptsByCategory('typography');
export const MONOGRAM_PRESETS = groupAllPromptsByCategory('monogram');
export const FILTERS_PRESETS = groupAllPromptsByCategory('filter');

export const PRESET_REGISTRY = {
  VECTOR,
  TYPOGRAPHY,
  MONOGRAM,
  FILTERS: {
    libraries: FILTERS_PRESETS
  }
};