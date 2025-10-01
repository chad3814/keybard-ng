# Vite + React + TypeScript Setup

A modern React UI built with Vite and TypeScript for keyboard configuration.

## Structure

```
keybard-ng/
├── src/               # Vite + React + TS
│   ├── components/    # React components
│   ├── contexts/      # React contexts (VialContext)
│   ├── services/      # TypeScript Vial services
│   │   ├── usb.ts    # USB communication
│   │   ├── vial.service.ts  # Main Vial service
│   │   └── utils.ts  # Utility functions
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Main App component
│   ├── main.tsx      # React entry point
│   └── index.html    # Vite HTML template
├── tests/            # Test suite
│   ├── services/     # Service tests
│   ├── contexts/     # Context tests
│   └── fixtures/     # Test data
└── dist/             # Vite build output (gitignored)
```

## Development Setup

### Vite Dev Server

```bash
# Install dependencies (first time only)
npm install

# Run Vite dev server
npm run dev

# Access at http://localhost:5173 (or whatever Vite assigns)
```

## Key Features

### TypeScript Services

Core Vial modules implemented in TypeScript as ES modules:

- **`usb.ts`**: USB HID communication with Vial protocol
- **`vial.service.ts`**: Main service for keyboard operations
- **`key.service.ts`**: Keycode parsing and stringifying
- **`utils.ts`**: Byte manipulation utilities

### Constants

- **`keygen.ts`**: Keycode maps (CODEMAP, KEYMAP, KEYALIASES) with TypeScript types

### React Context

`VialContext` provides Vial services throughout the React app:

```tsx
import { useVial } from './contexts/VialContext';

function MyComponent() {
  const { keyboard, isConnected, connect, loadKeyboard } = useVial();
  // Use the Vial services...
}
```

### Type Safety

All Vial data structures are properly typed in `src/types/vial.types.ts`:

- `KeyboardInfo`: Main keyboard state
- `VialAPI`: API interface
- `USBSendOptions`: USB communication options
- Feature-specific types for macros, combos, tap dance, etc.

## Building for Production

```bash
# Build the React app
npm run build

# Output will be in dist/
```

## Dependencies

### Core
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Keyboard Communication
- **xz-decompress** - XZ decompression for Vial keyboard data (includes TypeScript types)
- **@types/w3c-web-hid** - WebHID API types for USB communication

## NPM Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production (TypeScript + Vite)
- `npm run preview` - Preview production build

## Notes

- TypeScript provides better IDE support and type safety
- React enables modern component-based UI development
- XZ decompression is handled by the `xz-decompress` npm package (includes types, no script tag needed)

## Migration Status

✅ Core Vial services converted to TypeScript
✅ USB communication layer implemented
✅ XZ decompression integrated (xz-decompress with built-in types)
✅ KEY utilities converted (keycode parsing/stringifying)
✅ Keycode constants (CODEMAP, KEYMAP, KEYALIASES) with TypeScript types
✅ React Context provider created
✅ Basic keyboard connection UI implemented
✅ WebHID types configured
⏳ Additional UI components (keymap editor, macros, etc.) pending

## Future Work

The following Vial features can be implemented as TypeScript services:

- Macro management service
- Combo configuration service
- Tap dance service
- Key override service
- QMK settings service

Each can be integrated into the React UI as needed.