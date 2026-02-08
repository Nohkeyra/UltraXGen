
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * ESM environment fix: define __dirname using import.meta.url
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server,
        host,
      },
      plugins)],
      define),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve, '.'),
        }
      },
      // New, // All build artifacts will be placed here
        emptyOutDir, // Clear the directory before building
        base, // CRITICAL);