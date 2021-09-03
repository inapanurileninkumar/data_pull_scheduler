<template>
  <label class="container">{{ label }}
    <input
      type="radio"
      :name="name"
    >
    <span class="checkmark"></span>
  </label>
</template>

<script>
  export default {
    name: 'RadioInput',
    props: {
      label: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
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
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: white;
    border: 2px solid green;
    border-radius: 50%;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 2px;
    top: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: green;
  }
</style>