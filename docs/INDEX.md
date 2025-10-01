# KeyBard-NG Documentation Index

## 📚 Documentation Overview

Comprehensive documentation for the KeyBard-NG keyboard configuration tool, a modern web-based interface for Vial-compatible keyboards built with React, TypeScript, and the WebHID API.

## 🚀 Quick Start

- [README](../README.md) - Project overview and quick start guide
- [VITE_SETUP](../VITE_SETUP.md) - Development environment setup

## 📖 Core Documentation

### [Architecture Documentation](./ARCHITECTURE.md)
System design and architectural overview
- System layers and components
- Data flow patterns
- Technology stack
- Browser compatibility
- Security considerations

### [API Documentation](./API.md)
Complete service API reference
- **VialService** - Core Vial protocol operations
- **QMKService** - QMK settings management
- **SvalService** - Svalboard-specific features
- **KeyService** - Keycode translation utilities
- **VialUSB** - Low-level USB communication
- **VialContext** - React context API

### [Component Documentation](./COMPONENTS.md)
React component guide
- Component hierarchy
- **App** - Root application component
- **VialProvider** - Context provider
- **KeyboardConnector** - Connection orchestration
- **Keyboard** - Visual layout renderer
- **Key** - Individual key component
- **QMKSettings** - Settings configuration UI
- Component patterns and best practices

### [Type Definitions](./TYPES.md)
TypeScript type reference
- Core types (`KeyboardInfo`, `KeyboardPayload`)
- Feature types (Macro, Combo, TapDance)
- USB communication types
- Keymap types
- QMK settings types
- Component prop types
- Protocol constants

## 🗺️ Navigation Guide

### By Role

#### For Developers
1. Start with [Architecture](./ARCHITECTURE.md) for system overview
2. Review [API Documentation](./API.md) for service interfaces
3. Check [Type Definitions](./TYPES.md) for TypeScript types
4. See [Component Documentation](./COMPONENTS.md) for UI components

#### For Contributors
1. Read [VITE_SETUP](../VITE_SETUP.md) for development setup
2. Review [Architecture](./ARCHITECTURE.md) for codebase structure
3. Check test patterns in API examples
4. Follow component patterns in [Components](./COMPONENTS.md)

#### For Users
1. Start with [README](../README.md) for installation
2. Check browser compatibility in [Architecture](./ARCHITECTURE.md#browser-compatibility)
3. Review supported features in service documentation

### By Feature

#### USB Communication
- [VialUSB API](./API.md#vialusb) - Low-level USB operations
- [USBSendOptions Type](./TYPES.md#usbsendoptions) - Communication options
- [Protocol Constants](./TYPES.md#protocol-constants) - Command definitions

#### Keyboard Configuration
- [VialService API](./API.md#vialservice) - Keyboard operations
- [KeyboardInfo Type](./TYPES.md#keyboardinfo) - State structure
- [Keyboard Component](./COMPONENTS.md#keyboard) - Visual interface

#### Key Mapping
- [KeyService API](./API.md#keyservice) - Keycode translation
- [Keymap Types](./TYPES.md#keymap-types) - Key definitions
- [Key Component](./COMPONENTS.md#key) - Key visualization

#### QMK Settings
- [QMKService API](./API.md#qmkservice) - Settings management
- [QMK Types](./TYPES.md#qmk-settings-types) - Settings structure
- [QMKSettings Component](./COMPONENTS.md#qmksettings) - Settings UI

#### Svalboard Features
- [SvalService API](./API.md#svalservice) - Svalboard protocol
- Layer color management
- Custom layer names

## 📁 Project Structure

```
keybard-ng/
├── docs/                      # This documentation
│   ├── INDEX.md              # This index file
│   ├── ARCHITECTURE.md       # System architecture
│   ├── API.md                # Service APIs
│   ├── COMPONENTS.md         # Component guide
│   └── TYPES.md              # Type definitions
├── src/
│   ├── components/           # React components
│   │   ├── KeyboardConnector.tsx
│   │   ├── Keyboard.tsx
│   │   ├── Key.tsx
│   │   └── QMKSettings.tsx
│   ├── services/            # Business logic
│   │   ├── vial.service.ts # [Line 221](../src/services/vial.service.ts#L221)
│   │   ├── qmk.service.ts  # [Line 95](../src/services/qmk.service.ts#L95)
│   │   ├── sval.service.ts # [Line 130](../src/services/sval.service.ts#L130)
│   │   ├── key.service.ts  # [Line 323](../src/services/key.service.ts#L323)
│   │   └── usb.ts          # [Line 363](../src/services/usb.ts#L363)
│   ├── contexts/           # React contexts
│   │   └── VialContext.tsx
│   ├── types/              # TypeScript types
│   │   ├── vial.types.ts
│   │   ├── keymap.d.ts
│   │   └── qmk.d.ts
│   └── constants/          # Static data
│       └── keygen.ts
└── tests/                  # Test suites
    ├── services/
    ├── contexts/
    └── fixtures/
```

## 🔗 Cross-References

### Service Dependencies
```
VialService
├── Depends on: VialUSB, SvalService, utils
├── Used by: VialContext, KeyboardConnector
└── Related docs: [API](./API.md#vialservice), [Architecture](./ARCHITECTURE.md#service-layer)

QMKService
├── Depends on: VialUSB, utils, QMK_SETTINGS
├── Used by: VialContext, QMKSettings component
└── Related docs: [API](./API.md#qmkservice), [Types](./TYPES.md#qmk-settings-types)

SvalService
├── Depends on: VialUSB
├── Used by: VialService
└── Related docs: [API](./API.md#svalservice)

KeyService
├── Depends on: KEYMAP, CODEMAP, KEYALIASES
├── Used by: Keyboard component
└── Related docs: [API](./API.md#keyservice), [Types](./TYPES.md#keymap-types)
```

### Component Dependencies
```
App
└── VialProvider (context)
    └── KeyboardConnector
        ├── Uses: VialContext hooks
        ├── Renders: Keyboard, QMKSettings
        └── Related: [Components](./COMPONENTS.md#keyboardconnector)

Keyboard
├── Uses: VialContext, KeyService
├── Renders: Multiple Key components
└── Related: [Components](./COMPONENTS.md#keyboard)

QMKSettings
├── Uses: VialContext, QMKService
├── Data: QMK_SETTINGS constant
└── Related: [Components](./COMPONENTS.md#qmksettings)
```

## 🧪 Testing Documentation

### Test Coverage Areas
- [Service Tests](./API.md#usage-examples) - Service layer testing
- [Component Testing](./COMPONENTS.md#component-testing) - UI testing patterns
- Test fixtures in `tests/fixtures/`
- Mock implementations in `tests/mocks/`

### Running Tests
```bash
npm test              # Run all tests
npm run test:coverage # With coverage report
npm run test:watch   # Watch mode
npm run test:ui      # Vitest UI
```

## 🛠️ Development Guides

### Adding New Features
1. Define types in `src/types/`
2. Implement service in `src/services/`
3. Create component in `src/components/`
4. Add tests in `tests/`
5. Update documentation

### Protocol Implementation
1. Add command constants to types
2. Implement in VialUSB service
3. Create higher-level service method
4. Expose via VialContext
5. Build UI component

## 📚 Additional Resources

### External Links
- [Vial Documentation](https://get.vial.today/)
- [QMK Documentation](https://docs.qmk.fm/)
- [WebHID API Spec](https://wicg.github.io/webhid/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Related Projects
- [Vial GUI](https://github.com/vial-kb/vial-gui) - Desktop Vial application
- [QMK Firmware](https://github.com/qmk/qmk_firmware) - Keyboard firmware
- [VIA](https://www.caniusevia.com/) - VIA keyboard configurator

## 🔍 Search Keywords

**Architecture**: layers, system design, data flow, WebHID, USB protocol
**Services**: VialService, QMKService, SvalService, KeyService, VialUSB
**Components**: KeyboardConnector, Keyboard, Key, QMKSettings, VialProvider
**Types**: KeyboardInfo, USBSendOptions, KeyMapEntry, QMKSettings
**Features**: keymap, macro, combo, tapdance, layer colors, QMK settings
**Testing**: Vitest, coverage, mocks, fixtures
**Protocols**: VIA, Vial, QMK, Svalboard

## 📝 Documentation Maintenance

Last updated: Generated by /sc:index command
Documentation format: Markdown
Target audience: Developers, Contributors, Users

### Contributing to Documentation
1. Keep examples up-to-date with code
2. Update cross-references when refactoring
3. Add new sections for new features
4. Maintain consistent formatting
5. Test all code examples

## 🎯 Quick Links

- [Connect to Keyboard](./API.md#basic-connection-flow)
- [Update a Key](./API.md#updatekey)
- [Component Props](./TYPES.md#component-props-types)
- [USB Protocol](./TYPES.md#protocol-constants)
- [Testing Guide](./COMPONENTS.md#component-testing)
- [Browser Support](./ARCHITECTURE.md#browser-compatibility)