import React, { createContext, useContext, useState, useCallback } from 'react';
import { vialService, VialService } from '../services/vial.service';
import { qmkService } from '../services/qmk.service';
import { usbInstance } from '../services/usb';
import { fileService } from '../services/file.service';
import { storage } from '../utils/storage';
import type { KeyboardInfo } from '../types/vial.types';

interface VialContextType {
  keyboard: KeyboardInfo | null;
  isConnected: boolean;
  isWebHIDSupported: boolean;
  loadedFrom: string | null;
  connect: (filters?: HIDDeviceFilter[]) => Promise<boolean>;
  disconnect: () => Promise<void>;
  loadKeyboard: () => Promise<void>;
  loadFromFile: (file: File) => Promise<void>;
  updateKey: (layer: number, row: number, col: number, keymask: number) => Promise<void>;
}

const VialContext = createContext<VialContextType | undefined>(undefined);

export const VialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keyboard, setKeyboard] = useState<KeyboardInfo | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loadedFrom, setLoadedFrom] = useState<string | null>(null);
  const isWebHIDSupported = VialService.isWebHIDSupported();

  const connect = useCallback(async (filters?: HIDDeviceFilter[]) => {
    try {
      const defaultFilters = [
        { usagePage: 0xff60, usage: 0x61 },
        { usagePage: 0xff60, usage: 0x62 },
      ];
      const success = await usbInstance.open(filters || defaultFilters);
      setIsConnected(success);
      console.log('connected success:', success);
      return success;
    } catch (error) {
      console.error('Failed to connect to keyboard:', error);
      return false;
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await usbInstance.close();
      setIsConnected(false);
      setKeyboard(null);
      setLoadedFrom(null);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  }, []);

  const loadKeyboard = useCallback(async () => {
    if (!isConnected) {
      console.log('loadKeyboard not connected');
      throw new Error('USB device not connected');
    }

    try {
      const kbinfo: KeyboardInfo = {
        rows: 0,
        cols: 0,
      };
      await vialService.init(kbinfo);
      const loadedInfo = await vialService.load(kbinfo);

      // Load QMK settings
      try {
        await qmkService.get(loadedInfo);
      } catch (error) {
        console.warn('Failed to load QMK settings:', error);
      }

      setKeyboard(loadedInfo);
      // Set loadedFrom to device product name
      const deviceName = usbInstance.getDeviceName();
      setLoadedFrom(deviceName || loadedInfo.kbid || 'Connected Device');
    } catch (error) {
      console.error('Failed to load keyboard:', error);
      throw error;
    }
  }, [isConnected]);

  const loadFromFile = useCallback(async (file: File) => {
    try {
      const kbinfo = await fileService.loadFile(file);
      setKeyboard(kbinfo);
      const filePath = file.name;
      setLoadedFrom(filePath);
      storage.setLastFilePath(filePath);
      setIsConnected(false);
    } catch (error) {
      console.error('Failed to load file:', error);
      throw error;
    }
  }, []);

  const updateKey = useCallback(
    async (layer: number, row: number, col: number, keymask: number) => {
      if (!isConnected) {
        throw new Error('USB device not connected');
      }
      await vialService.updateKey(layer, row, col, keymask);
    },
    [isConnected]
  );

  const value: VialContextType = {
    keyboard,
    isConnected,
    isWebHIDSupported,
    loadedFrom,
    connect,
    disconnect,
    loadKeyboard,
    loadFromFile,
    updateKey,
  };

  return <VialContext.Provider value={value}>{children}</VialContext.Provider>;
};

export const useVial = (): VialContextType => {
  const context = useContext(VialContext);
  if (!context) {
    throw new Error('useVial must be used within a VialProvider');
  }
  return context;
};
