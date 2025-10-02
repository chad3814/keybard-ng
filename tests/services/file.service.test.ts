import { describe, it, expect } from 'vitest';
import { fileService } from '../../src/services/file.service';
import type { KeyboardInfo } from '../../src/types/vial.types';

// Helper function to create mock files
const createMockFile = (content: string, filename = 'test.kbi'): File => {
  const blob = new Blob([content], { type: 'application/json' });
  return new File([blob], filename, { type: 'application/json' });
};

// Helper to create a large file
const createLargeFile = (): File => {
  const largeContent = 'x'.repeat(1048577); // 1MB + 1 byte
  const blob = new Blob([largeContent], { type: 'application/json' });
  return new File([blob], 'large.kbi', { type: 'application/json' });
};

describe('FileService', () => {
  describe('loadFile', () => {
    it('successfully loads valid .kbi file with all required fields', async () => {
      const validData: KeyboardInfo = {
        rows: 6,
        cols: 14,
        layers: 4,
        kbid: 'test-keyboard',
      };

      const file = createMockFile(JSON.stringify(validData));
      const result = await fileService.loadFile(file);

      expect(result).toEqual(validData);
      expect(result.rows).toBe(6);
      expect(result.cols).toBe(14);
    });

    it('successfully parses file with only required fields (rows, cols)', async () => {
      const minimalData: KeyboardInfo = {
        rows: 5,
        cols: 12,
      };

      const file = createMockFile(JSON.stringify(minimalData));
      const result = await fileService.loadFile(file);

      expect(result).toEqual(minimalData);
      expect(result.rows).toBe(5);
      expect(result.cols).toBe(12);
    });

    it('successfully parses file with optional fields', async () => {
      const dataWithOptionals: KeyboardInfo = {
        rows: 6,
        cols: 14,
        layers: 8,
        keymap: [[1, 2, 3], [4, 5, 6]],
        via_proto: 9,
        vial_proto: 6,
      };

      const file = createMockFile(JSON.stringify(dataWithOptionals));
      const result = await fileService.loadFile(file);

      expect(result).toEqual(dataWithOptionals);
      expect(result.layers).toBe(8);
      expect(result.keymap).toEqual([[1, 2, 3], [4, 5, 6]]);
    });

    it('throws "File too large" error for files > 1MB', async () => {
      const largeFile = createLargeFile();

      await expect(fileService.loadFile(largeFile)).rejects.toThrow('File too large');
    });

    it('throws "Invalid JSON" error for malformed JSON', async () => {
      const invalidJson = '{ invalid json content }';
      const file = createMockFile(invalidJson);

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid JSON');
    });

    it('throws "Invalid file" error when missing rows field', async () => {
      const missingRows = { cols: 14, layers: 4 };
      const file = createMockFile(JSON.stringify(missingRows));

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid file');
    });

    it('throws "Invalid file" error when missing cols field', async () => {
      const missingCols = { rows: 6, layers: 4 };
      const file = createMockFile(JSON.stringify(missingCols));

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid file');
    });

    it('throws "Invalid file" error when rows is not a number', async () => {
      const invalidRows = { rows: 'six', cols: 14 };
      const file = createMockFile(JSON.stringify(invalidRows));

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid file');
    });

    it('throws "Invalid file" error when cols is not a number', async () => {
      const invalidCols = { rows: 6, cols: 'fourteen' };
      const file = createMockFile(JSON.stringify(invalidCols));

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid file');
    });

    it('throws "Invalid file" error for non-object JSON', async () => {
      const arrayData = '[1, 2, 3]';
      const file = createMockFile(arrayData);

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid file');
    });

    it('throws "Invalid file" error for null JSON', async () => {
      const nullData = 'null';
      const file = createMockFile(nullData);

      await expect(fileService.loadFile(file)).rejects.toThrow('Invalid file');
    });

    it('converts string keycodes to numbers in keymap', async () => {
      const dataWithStringKeycodes: KeyboardInfo = {
        rows: 6,
        cols: 14,
        layers: 2,
        keymap: [
          ['KC_A', 'KC_B', 'KC_C'] as unknown as number[],
          ['KC_LCTRL', 'KC_LSHIFT', 'KC_ENTER'] as unknown as number[],
        ],
      };

      const file = createMockFile(JSON.stringify(dataWithStringKeycodes));
      const result = await fileService.loadFile(file);

      // Verify keymap was converted to numbers
      expect(result.keymap).toBeDefined();
      expect(result.keymap?.[0]).toBeDefined();
      expect(result.keymap?.[0][0]).toBeTypeOf('number');
      expect(result.keymap?.[0][1]).toBeTypeOf('number');
      expect(result.keymap?.[1][0]).toBeTypeOf('number');

      // KC_A should be 0x0004
      expect(result.keymap?.[0][0]).toBe(0x0004);
    });

    it('keeps numeric keycodes unchanged', async () => {
      const dataWithNumericKeycodes: KeyboardInfo = {
        rows: 6,
        cols: 14,
        keymap: [
          [0x0004, 0x0005, 0x0006], // KC_A, KC_B, KC_C
        ],
      };

      const file = createMockFile(JSON.stringify(dataWithNumericKeycodes));
      const result = await fileService.loadFile(file);

      expect(result.keymap?.[0][0]).toBe(0x0004);
      expect(result.keymap?.[0][1]).toBe(0x0005);
      expect(result.keymap?.[0][2]).toBe(0x0006);
    });
  });
});
