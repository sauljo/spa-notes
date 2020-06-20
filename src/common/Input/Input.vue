<template>
  <input
  required
  v-bind:class="[{
    'input-small': size === 'small',
    'input-large': size === 'large',
    'input-error': error
  }, 'input']"
  :placeholder="placeholder"
  :type="type"
  v-model="inputVal"/>
</template>

<script>
export default {
  name: 'Input',
  props: {
    placeholder: {
      type: String,
      required: false
    }, 

    type: {
      type: String,
      required: false,
      default: 'text'
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    size: {
      type: String,
      required: false,
      default: 'large'
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}

</script>

<style lang="scss">
  @import './input.scss';
</style>