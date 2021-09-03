<template>
  <label class="switch">
    <input
      v-model="inputValue"
      type="checkbox"
      :disabled="disabled"
      :checked="inputValue"
      @input="handleInput"
    >
    <span class="slider"></span>
  </label>
</template>

<script>
  export default {
    name: 'booleanInput',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },
    emits: ['input', 'change'],
    data: function () {
      return {
        inputValue: false,
      };
    },
    watch: {
      value: function () {
        this.inputValue = this.value;
      }
    },
    methods: {
      handleInput: function () {
        if (this.disabled) return;
        this.inuptValue = ! this.inputValue;
        this.$emit('input', this.inputValue);
        this.$emit('change', this.inputValue);
      },
    }
  };
</script>

<style scoped lang="scss">

  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 10px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;


    &:checked + .slider {
      background-color: #449466;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #449466;
    }

    &:checked + .slider:before {
      -webkit-transform: translateX(15px);
      -ms-transform: translateX(15px);
      transform: translateX(15px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 10px;

    &:before {
      border-radius: 50%;
      position: absolute;
      content: "";
      height: 15px;
      width: 15px;
      right: 13px;
      top: -3px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }
</style>