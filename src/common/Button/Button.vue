<template>
  <button
  v-bind:class="[{
    'button-small': size === 'small',
    'button-large': size === 'large'
    }, 'button']"
  @click="$emit('click')">
    {{value}}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'large',
      required: false
    }

  }
}
</script>

<style lang="scss" scoped>
  .button {
    border: 0;
    background-color: #1783ff;
    color: #fff;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.1s;
    min-width: 50px;
  }

  .button-small {
    padding: 10px 12px;
    font-size: 14px;
  }

  .button-large {
    font-size: 15px;
    padding: 12px 15px;
  }

  @media screen and (max-width: 440px) {
    .button-small {
      padding: 8px 13px;
      font-size: 12px;
    }

  }

</style>