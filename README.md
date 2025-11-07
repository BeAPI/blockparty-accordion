# Blockparty Accordion

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
