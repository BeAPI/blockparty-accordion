=== Blockparty Accordion ===
Contributors:      Be API Technical team
Tags:              block
Tested up to:      6.0
Stable tag:        1.3.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Accessible Accordion block for WordPress gutenberg.

== Description ==

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/blockparty-accordion` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 1.3.1 =

* Fix French translations typo

= 1.3.0 =

* Add configurable summary heading level (h2–h6) on the parent Accordion block
* Add per-block auto-close setting to control whether multiple panels can stay open
* Fix `allowMultiple` block setting not overriding the global `beapi_accordion_block_config` filter when auto-close is disabled
* Add deprecated block migration for accordions saved before `data-allow-multiple` was always serialized
* Update `@beapi/be-a11y` to v2 and rename the frontend script entry to `view.js`
* Fix CSS custom property typos in accordion styles
* Refresh French translations for new editor strings

= 1.2.0 =

* Clarify block inserter descriptions and refresh French translations
* Add WordPress Playground blueprint and README badge for wordpress.org
* Update block icons (`@beapi/icons`, `@wordpress/icons`) and related scripts
* Developer: Volta Node pin, TypeScript ESLint packages for ESLint, JS workflow triggers on `package.json` changes

= 1.1.0 =

* Support for `blockparty/icons` block
* Update accordion item icon

= 1.0.9 =

* Fix translations

= 1.0.8 =

* Add option to open the first item by default

= 1.0.7 =

* Update block icons

= 1.0.5 =

* Replacement of icon for the icon block
* Update `@beapi/a11y` to v1.7.0 and fix a11y issues

= 1.0.4 =

* fix icon inserter

= 1.0.3 =

* fix error in JS
* add `beapi_accordion_block_config` filter to config accordion from third party plugins/theme

= 1.0.2 =

* fix composer php requirements

= 1.0.1 =

* fix styles

= 1.0.0 =

* initial release.
