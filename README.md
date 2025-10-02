# KeyBard

[![Test Coverage](https://img.shields.io/codecov/c/github/svalboard/keybard-ng?style=flat-square&label=coverage)](https://codecov.io/gh/svalboard/keybard-ng)
[![Tests](https://img.shields.io/github/actions/workflow/status/svalboard/keybard-ng/test.yml?branch=main&style=flat-square&label=tests)](https://github.com/svalboard/keybard-ng/actions/workflows/test.yml)

A modern Vite-based keyboard configuration UI built with React and TypeScript.

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start development server
# → http://localhost:5173
```

## Project Structure

```text
keybard-ng/
├── src/           # Vite + React + TypeScript
│   ├── constants/      # KeyMap constants
│   ├── components/     # React components
│   ├── contexts/       # VialContext
│   ├── services/       # TypeScript Vial services
│   │   ├── key.service.ts
│   │   ├── usb.ts
│   │   ├── utils.ts
│   │   └── vial.service.ts
│   └── types/         # TypeScript definitions
├── tests/         # Test suite
│   ├── services/       # Service layer tests
│   ├── contexts/       # React Context tests
│   ├── fixtures/       # Test data and mocks
│   └── mocks/          # USB and API mocks
└── dist/          # Build output (gitignored)
```

## Key Technologies

- **React 19** with TypeScript
- **Vite** for fast dev server and builds
- **xz-decompress** for XZ decompression (keyboard data, includes types)
- **WebHID API** for USB keyboard communication

## Available Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Integration Points

### VialContext Hook

```tsx
import { useVial } from './contexts/VialContext';

function MyComponent() {
  const { keyboard, isConnected, connect, loadKeyboard } = useVial();

  // Use Vial services...
}
```

### Services Available

- `VialUSB` - USB HID communication
- `VialService` - Keyboard operations (load, getKeyboardInfo, etc.)
- `KeyService` - Keycode parsing and stringifying (parse, stringify, define, etc.)
- Utilities - Byte manipulation (LE16, BE16, etc.)

## What's Working

✅ TypeScript conversion of core Vial modules
✅ USB communication layer
✅ XZ decompression via npm package (xz-decompress with built-in types)
✅ KEY utilities (keycode parsing, CODEMAP, KEYMAP, KEYALIASES)
✅ React Context provider
✅ Basic connection UI

## What's Next

- Keymap editor component
- Macro management UI
- Combo/tap-dance configuration
- Additional Vial features

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode (during development)
npm run test:watch

# Open Vitest UI
npm run test:ui
```

### Test Coverage

This project maintains **90% code coverage** across:

- ✅ Utility functions and byte manipulation
- ✅ KeyService (keycode parsing, custom keys, layers)
- ✅ USB communication layer (mocked WebHID API)
- ✅ VialService (keyboard loading, keymap management)
- ✅ QMK settings service
- ✅ React Context state management

### Test Structure

```text
tests/
├── services/       # Service layer tests
├── contexts/       # React Context tests
├── fixtures/       # Test data and mocks
├── mocks/          # USB and API mocks
└── utils/          # Test utilities
```

### Writing Tests

Tests follow the AAA (Arrange-Act-Assert) pattern:

```typescript
it('should update key at specific position', async () => {
  // Arrange
  const layer = 0, row = 1, col = 2;
  const keymask = 0x0004; // KC_A

  // Act
  await vialService.updateKey(layer, row, col, keymask);

  // Assert
  expect(mockUSB.send).toHaveBeenCalledWith(/* ... */);
});
```

### CI/CD

Tests run automatically on:

- Pull requests (all commits)
- Pushes to main/master
- Coverage reports posted to PRs

## Documentation

See [VITE_SETUP.md](./VITE_SETUP.md) for detailed setup and development documentation.
