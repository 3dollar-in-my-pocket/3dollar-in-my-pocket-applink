import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.VITE_ENV || 'dev';
const sourceFile = `${__dirname}/../config/aasa/${env}.json`;
const destDir = `${__dirname}/../public/.well-known`;
const destFile = `${destDir}/apple-app-site-association`;

// Ensure directory exists
mkdirSync(destDir, { recursive: true });

// Copy the file
copyFileSync(sourceFile, destFile);

console.log(`✓ Copied AASA file for ${env} environment`);
