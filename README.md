# Blockparty Accordion

## Filters
Use `beapi_accordion_block_config` filter to override accordion config from your theme or plugin.
See https://github.com/BeAPI/be-a11y/tree/main/examples/accessible-accordion for available options.

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

## Changelog
### 1.0.4 - 2025-09-05
* fix icon inserter

### 1.0.3 - 2024-09-10
* fix error in JS
* add `beapi_accordion_block_config` filter to config accordion from third party plugins/theme

### 1.0.2 - 2024-07-08
* fix composer php requirements

### 1.0.1 - 2024-04-02
* fix styles

### 1.0.0 - 2024-04-02
* initial release.
