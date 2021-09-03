<template>
  <label class="container">{{ label }}
    <input
      type="radio"
      :name="name"
      :checked="isChecked"
      @input="handleInput"
    >
    <span
      :class="[disabled?'disabled':'']"
      class="checkmark"
    />
  </label>
</template>

<script>
  export default {
    name: 'RadioInput',
    emits: ['input'],
    props: {
      label: {
        type: String,
        default: ''
      },
      value: {
        type: [String, Number, Boolean],
        default: null,
      },
      data: {
        type: [String, Number, Boolean],
        default: undefined
      },
      name: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      isChecked: function () {
        return (this.value === this.data);
      }
    },
    methods: {
      handleInput: function () {
        this.$emit('input', this.data);
      }
    }
  };
</script>

<style scoped lang="scss">

  /* The container */
  .container {
    display: block;
    position: relative;
    padding-left: 20px;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark {
        background-color: white;
        border: 2px solid green;
        border-radius: 50%;

        &:after {
          display: block;
        }

        &.disabled {
          border: 2px solid lightgrey;
        }
      }
    }

    .checkmark {
      &:after {
        left: 2px;
        top: 2px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: green;
      }

      &.disabled:after {
        background-color: lightgrey !important;
      }
    }
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    border: 2px solid lightgray;
    border-radius: 50%;
    top: 0;
    left: 0;
    height: 10px;
    width: 10px;
    background-color: transparent;

    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
</style>