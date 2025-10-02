const STORAGE_KEY = 'keybard_last_file_path';

export const storage = {
  getLastFilePath(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  },

  setLastFilePath(path: string): void {
    try {
      localStorage.setItem(STORAGE_KEY, path);
    } catch (error) {
      console.warn('Failed to save file path:', error);
    }
  },

  clearLastFilePath(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear file path:', error);
    }
  },
};
