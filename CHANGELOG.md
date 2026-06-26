# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.3.1 - 2026-06-26

- Fix French translations typo

## 1.3.0 - 2026-06-25

- Add configurable summary heading level (h2–h6) on the parent Accordion block
- Add per-block auto-close setting to control whether multiple panels can stay open
- Fix `allowMultiple` block setting not overriding the global `beapi_accordion_block_config` filter when auto-close is disabled
- Add deprecated block migration for accordions saved before `data-allow-multiple` was always serialized
- Update `@beapi/be-a11y` to v2 and rename the frontend script entry to `view.js`
- Fix CSS custom property typos in accordion styles (`font-weight`, `padding-with-background`)
- Refresh French translations for new editor strings

## 1.2.0 - 2026-04-21

- Clarify block inserter descriptions; refresh French translations (POT, PO, MO, and Jed JSON)
- Add WordPress Playground blueprint and README badge for the plugin directory
- Update block icons (`@beapi/icons`, `@wordpress/icons`) and block entry scripts
- Developer tooling: Volta Node pin; add `@typescript-eslint` packages for ESLint; run JS quality workflow when `package.json` changes

## 1.1.0 - 2026-02-18

- Support for `blockparty/icons` block
- Update accordion item icon

- Fix translations

## 1.0.9 - 2026-02-09

- Fix translations

## 1.0.8 - 2026-02-09

- Add option to open the first item by default

## 1.0.7 - 2026-02-02

- Update `@beapi/be-a11y` to `1.7.3`

## 1.0.6 - 2025-11-10

- Update block icons

## 1.0.5 - 2025-11-07

- Replacement of icon for the icon block
- Update `@beapi/a11y` to v1.7.0 and fix a11y issues

## 1.0.4 - 2025-09-05

- fix icon inserter

## 1.0.3 - 2024-09-10

- fix error in JS
- add `beapi_accordion_block_config` filter to config accordion from third party plugins/theme

## 1.0.2 - 2024-07-08

- fix composer php requirements

## 1.0.1 - 2024-04-02

- fix styles

## 1.0.0 - 2024-04-02

- initial release.
