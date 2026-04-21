[![Be API Github Banner](.github/banner-github.png)](https://beapi.fr)

# Blockparty Accordion

[![Test with WordPress Playground](https://img.shields.io/badge/Test%20with-WordPress%20Playground-0073aa?style=for-the-badge&logo=wordpress&logoColor=white)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/beapi/blockparty-accordion/refs/heads/main/.wordpress-org/blueprints/blueprint.json)

## Filters

Use `beapi_accordion_block_config` filter to override accordion config from your theme or plugin.
See <https://github.com/BeAPI/be-a11y/tree/main/examples/accessible-accordion> for available options.

```php
add_filter( 'beapi_accordion_block_config', function( $config ) {
    $config = [
        'allowMultiple' => true,
        'closedDefault' => true,
        'forceExpand'   => false,
        'hasAnimation'  => true,
        'openMultiple'  => false,
    ];

    return $config;
});
```
