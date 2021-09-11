# \<hui-switch />

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
yarn add @hui/switch
```

## Usage

```html
<!-- Import the module -->
<script type="module">
  import '@hui/switch';
</script>

<!-- Use the component -->
<hui-switch
  class="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-500 transition-colors"
  checked-class="bg-blue-500"
  unchecked-class="bg-gray-500"
>
  <span
    class="translate-x-1 inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
    checked-class="translate-x-6"
    unchecked-class="translate-x-1"
  >
  </span>
</hui-switch>
```

## Local Demo with `web-dev-server`

```bash
yarn start
```

To run a local development server that serves the basic demo located in [demo/index.html](demo/index.html).
