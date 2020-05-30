import path from 'path';

// This will work only in a CommonJS environment.
export const rootDir = path.dirname(process.mainModule.filename);
