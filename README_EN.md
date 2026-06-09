<p align="center">
  <p align="center">
   <img width="150" height="150" src="apps/chrome-extension/design/logo.svg" alt="Logo">
  </p>
	<h1 align="center"><b>Cloud Document Converter</b></h1>
</p>

Cloud Document Converter is a browser extension that supports downloading/copying Lark Doc as Markdown.

[简体中文](./README.md) · **English**

# Install

Install Cloud Document Converter from [Chrome Web Store](https://chromewebstore.google.com/detail/cloud-document-converter/ehkomhhcinhikfddnmklbloahaakploh), [Microsoft Edge Store](https://microsoftedge.microsoft.com/addons/detail/pcjebkebnehplnpkpnhipagefaffiopp), and [Firefox Add-ons Store](https://addons.mozilla.org/addon/cloud-document-converter).

# Features

## Core Features

- **Download as Markdown**: Download Lark documents as Markdown files with images and attachments
- **Copy as Markdown**: Copy Lark documents to clipboard (⚠️ Image URLs expire after 2 hours)
- **View as Markdown**: Preview Markdown content in a new window

## Download Methods

The extension provides three download methods, configurable in settings:

1. **Direct Download**: Use browser's default download behavior
2. **Show Save File Picker**: Show a file picker dialog to choose save location
3. **Save to Folder**: Save directly to a specified folder without ZIP packaging (✨ New Feature)

### Save to Folder (New Feature)

When a document contains images or attachments, using "Save to Folder" can:

- 📁 Save Markdown file and images directly to a folder without unzipping ZIP
- 💾 Automatically remember the selected folder for future downloads
- 🌐 Save folder settings per website

**Usage:**
1. Select "Save to Folder" download method in extension settings
2. Open a Lark document and click "Download as Markdown"
3. First time: a folder picker will appear, select a folder (automatically saved)
4. Subsequent downloads on the same website will save directly to the set folder

## Settings Options

- **Language**: English and Simplified Chinese
- **Theme**: Light / Dark / System
- **Table Handling**: Filter non-phrasing content / Convert to HTML
- **Grid Handling**: Flatten / Convert to Table / Convert to HTML
- **Text Highlight**: Preserve font color and background color
- **Image Naming**: Use UUID for image filenames

# Compatibility

## Block

| **Lark Doc** | **Support** | **Markdown** |
| --- | --- | --- |
| Divider | ✅ | Thematic Break |
| Headings (Level 1 to level 6) | ✅ | ATX Headings (Level 1 to level 6) |
| Headings (Level 7 to level 9) | ✅ | Paragraph |
| Code Block | ✅ | Code Block |
| Quote | ✅ | Blockquote |
| Bullet list | ✅ | Bullet list |
| Ordered list | ✅ | Ordered list |
| Task list | ✅ | Task list |
| Table | ✅ | Table |
| Image | ✅ | Image |
| Inline Math | ✅ | Math Block |
| Call Out | ❌ | Blockquote |
| Synced Reference | ✅ | Inline content |
| Diagram (Flowcharts and UML diagrams) | ❌ | Image (Download only) |
| Grid | ✅ | Flatten/Table/HTML |
| Bitable | To be determined | |
| Chat Card | To be determined | |
| File | ❌ | Link (Download only) |
| Iframe | ✅ | HTML |
| ISV | To be determined | Text drawing → Code Block ✅ |
| Mind Note | To be determined | |
| Sheet | To be determined | |

## Inline

| **Lark Doc** | **Support** | **Markdown** |
| --- | --- | --- |
| Bold | ✅ | **Bold** |
| Delete | ✅ | ~~Delete~~ |
| Italic | ✅ | *Italic* |
| Inline code | ✅ | `Inline Code` |
| Link | ✅ | [Link](url) |
| Font Color | ✅ | HTML |
| Font Background Color | ✅ | HTML |
| Underline | ✅ | `<u>Underline</u>` |
| @Mention | ✅ | @username |

## Other

Indent and Align: To be determined

# Development

## Requirements

- Node.js >= 22.12.0
- pnpm >= 10.15.0

## Common Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Type check
pnpm run type-check

# Run tests
pnpm run test

# Lint
pnpm run lint

# Format code
pnpm run format

# Extension development
pnpm --filter @dolphin/chrome-extension dev:pages    # Start dev server
pnpm --filter @dolphin/chrome-extension build         # Build extension
pnpm -C apps/chrome-extension exec web-ext run --source-dir dist --target chromium  # Run extension

# E2E tests
pnpm run test:e2e:install   # Install Playwright browsers
pnpm run test:e2e           # Run E2E tests
```

## Project Structure

```
cloud-document-converter/
├── apps/
│   ├── chrome-extension/          # Vue 3 browser extension
│   │   ├── src/
│   │   │   ├── scripts/           # Core scripts (copy, download, view)
│   │   │   ├── pages/             # Vue pages (popup, settings)
│   │   │   ├── common/            # Shared utility modules
│   │   │   └── components/ui/     # UI component library
│   │   └── scripts/cli.ts         # Build CLI
│   └── chrome-extension-e2e/      # Playwright E2E tests
├── packages/
│   ├── lark/                      # Lark Doc to Markdown core engine
│   ├── common/                    # Shared utility library
│   └── typescript-config/         # TypeScript config presets
└── .changeset/                    # Version change records
```

# Contribution

If you are interested in fixing issues and contributing directly to the code base, please see the document [How to Contribute](./contributing.md).

## Commit Convention

Use Conventional Commits format:
- `feat(scope): ...` - New features
- `fix(scope): ...` - Fixes
- `chore: ...` - Miscellaneous
- `refactor(scope): ...` - Refactoring

For user-visible changes, add a changeset:
```bash
pnpm exec changeset add
```

# Support me

If you like this project, you are welcome to buy me a cup of coffee! Your support will help me continue to improve and maintain this project.

[Buy me a coffee ☕](https://lujunji.vercel.app/about)

# Disclaimer

This project (hereinafter referred to as the "Project") is intended for informational and educational purposes only. While the author endeavors to ensure the accuracy and reliability of the Project, no express or implied warranty is given, including, but not limited to, warranties of merchantability, fitness for a particular purpose, or non-infringement.

The author shall not be liable for any direct, indirect, incidental, special, punitive, or consequential damages arising out of the use of the program, including, but not limited to, lost profits, business interruption, or loss of data arising out of the use, misuse, or reliance on the information contained in the program.

All content in this project is based on the author's personal opinions and experience and does not represent the views of any organization or company.

The user shall bear all risks arising from the use of this program. Under no circumstances shall the author be liable for any loss or damage arising from the use of this program.
