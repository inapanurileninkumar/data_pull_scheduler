<template>
  <div
    class="width-100 modal-container flex-box"
    :class="[getModalContainerClasses]"
    @click="handleBackDrop"
  >
    <div
      @clikc.stop
      class="bg-white border-radius-5"
    >
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: {
      vAlign: {
        type: String,
        default: 'center'
      },
      hAlign: {
        type: String,
        default: 'center'
      }
    },
    computed: {
      getModalContainerClasses: function () {
        let classes = [];
        let alignmentClassMap = {
          'center': 'center',
          'start': 'flex-start',
          'end': 'flex-end'
        };
        classes.push(`align-${ alignmentClassMap[this.vAlign] }`);
        classes.push(`justify-${ alignmentClassMap[this.hAlign] }`);
        return classes;
      },
    },
    methods: {
      handleBackDrop: function () {
      },
    }
  };
</script>

<style scoped lang="scss">
  .modal-container {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(82, 81, 81, 0.5);
  }
</style>