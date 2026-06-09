# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cloud Document Converter is a browser extension that downloads/copies Lark (Feishu) cloud documents as Markdown. It supports Chrome, Edge, and Firefox.

## Repository Structure

This is a pnpm + Turborepo monorepo with the `@dolphin/*` package scope:

- **`packages/lark/`** — Core transformer: Lark Doc/Docx → Markdown AST (mdast) → Markdown string. Exports `docx`, `env`, `image` subpaths.
- **`packages/common/`** — Shared utilities (DOM helpers, SVG conversion, image processing, messaging).
- **`apps/chrome-extension/`** — Vue 3 browser extension (popup UI, options page, content scripts, background service worker).
- **`apps/chrome-extension-e2e/`** — Playwright E2E tests for the extension.
- **`packages/typescript-config/`** — Shared tsconfig presets.

## Development Commands

```bash
# Install dependencies
pnpm install

# Build all workspaces
pnpm run build

# Type-check all
pnpm run type-check

# Test all workspaces
pnpm run test

# Lint
pnpm run lint

# Format check / fix
pnpm run format-check
pnpm run format

# Run tests for a specific package
pnpm --filter @dolphin/lark test
pnpm --filter @dolphin/chrome-extension test

# Extension development
pnpm --filter @dolphin/chrome-extension dev:pages    # Dev server for UI pages
pnpm --filter @dolphin/chrome-extension build         # Build extension
pnpm -C apps/chrome-extension exec web-ext run --source-dir dist --target chromium  # Run in browser

# E2E tests
pnpm run test:e2e:unit      # Env/config unit tests (node:test)
pnpm run test:e2e:install   # Install Playwright browsers
pnpm run test:e2e           # Run extension E2E
pnpm run test:e2e:debug     # E2E in headed debug mode
```

## Architecture Details

### Lark Package (`packages/lark/`)

The core conversion pipeline:

1. **`env.ts`** — Interfaces with the Lark page runtime (`window.User`, `window.PageMain`, `window.Toast`). Reads the document's block tree from the live DOM environment.
2. **`docx.ts`** — Main transformer. Converts Lark block types (headings, tables, code blocks, images, etc.) to mdast nodes, then serializes to Markdown using `mdast-util-to-markdown`. Handles GFM extensions (strikethrough, tables, task lists, math).
3. **`image.ts`** — Image URL resolution and download logic for Lark-hosted images.
4. **`file.ts`** — File download URL resolution for attachments.

### Chrome Extension (`apps/chrome-extension/`)

- **`src/scripts/`** — Entry points for the three main actions: `copy-lark-docx-as-markdown.ts`, `download-lark-docx-as-markdown.ts`, `view-lark-docx-as-markdown.ts`.
- **`src/pages/`** — Vue pages (popup, options) with shared i18n, settings, and theme.
- **`src/common/`** — Extension utilities: settings management, i18n (en/zh_CN), message passing, notifications.
- **`src/components/ui/`** — Reka UI + Tailwind CSS component library.
- **`src/background.ts`** — Service worker handling context menus and extension lifecycle.
- **`src/content.ts`** — Content script injected into Lark pages.
- **`scripts/cli.ts`** — Custom build CLI using `rolldown-vite`.

### Key Technologies

- **Markdown processing**: mdast (Markdown AST) ecosystem — `mdast-util-to-markdown`, `mdast-util-gfm-table`, `mdast-util-math`, etc.
- **UI**: Vue 3, Vue Router, Vue Query, Vue I18n, Reka UI, Tailwind CSS
- **Build**: `tsdown` for packages, custom rolldown-vite CLI for extension
- **Testing**: Vitest (unit), Playwright (E2E), node:test (env unit tests)

## Code Style

- TypeScript ESM throughout — prefer small, typed functions with explicit exports.
- **Formatting**: No semicolons, single quotes, 2-space indent, arrow parens avoided (see `.prettierrc`).
- **Linting**: ESLint with `typescript-eslint` strict + stylistic type-checked configs. Run `pnpm run lint` before PRs.
- **Naming**: Tests use `*.test.ts` suffix in `tests/` directories.

## Commit & Release

- **Conventional Commits**: `feat(scope): ...`, `fix(scope): ...`, `chore: ...`, `refactor(scope): ...`
- **Changesets**: For user-facing changes, add a changeset with `pnpm exec changeset add`. This triggers version bumps and changelog generation.
- **CI checks** (all must pass): `test`, `lint`, `format-check`, `type-check`

## E2E Testing

Live E2E tests validate against a real Feishu document. Default target: `https://my.feishu.cn/wiki/Ez2WwNvB2iMjd9kXMw3cfbqDnTe` with expected text `源内容`. Override via `CDC_E2E_TARGET_URL` and `CDC_E2E_EXPECTED_TEXT` environment variables.

## Important Notes

- The extension supports both Lark Doc (legacy) and Lark Docx formats — `isDoc()` / `isDocx()` guards in `env.ts`.
- Image URLs from copy operations expire after 2 hours (documented limitation).
- Node.js version: 22.12.0 (see `.node-version`). pnpm version: 10.15.0.
