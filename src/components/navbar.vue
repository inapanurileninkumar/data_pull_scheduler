<template>
  <div
    class="width-100 flex-box align-center justify-space-between navbar-container"
  >
    <div
      class="flex-col-6 flex-box font-large width-100 ph-10 align-flex-end"
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
      class="flex-col-5 pr-10"
    >
      <div
        class="flex-box align-center justify-flex-end"
      >
        <span
          class="payment-due-button text-white ph-10 pv-5 border-radius-2"
        >
          Payment due! Fit now!
        </span>
        <span
          class="ml-15"
        >
          <i class="far fa-bell font-regular" />
        </span>
        <span
          class="ml-15"
        >
          <i class="far fa-question-circle font-regular" />
        </span>
        <span
          style="height: 26px;"
          class="bordered-left-dark ml-15"
        />
        <span
          class="ml-15"
        >
          <i class="far fa-user-circle font-regular" />
        </span>
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

  .payment-due-button {
    background-color: #404d5d;
  }
</style>