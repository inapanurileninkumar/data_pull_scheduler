<template>
  <div
    class="width-100 flex-box align-center justify-space-between"
  >
    <div
      class="flex-col-6 flex-box font-large width-100 ph-10"
    >
      <p
        v-for="(breadcrumb,breadcrumbIndex) in breadcrumbs"
        :key="breadcrumb['label']+'_'+breadcrumbIndex"
        :class="[breadcrumb['active']?'active':'']"
        class="breadcrumb-item pr-5"
      >
        {{ breadcrumb['label'] }}

        <i
          v-if="(breadcrumbIndex<(breadcrumbs.length-1))"
          class="fas fa-angle-right"
        />
      </p>
    </div>
    <div
      class="flex-col-5"
    >
      <div
        class="flex-box align-center justify-flex-end"
      >
        <p>Hello world</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data: function () {
      return {
        'breadcrumbs': [{
          'label': 'Data Library',
          'active': false
        }, {
          'label': 'Postgre',
          'active': true
        }]
      };
    },
  };
</script>

<style scoped lang="scss">
  .breadcrumb-item {
    &.active {
      color: green;
    }
  }
</style>