<template>
  <div class="vddl-placeholder"
    :is="tag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-placeholder',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
  }
};
</script>
