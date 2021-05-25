<template>
  <div class="global-table">
    <l-create-refresh
        :load-or-refresh="loadData"
        :route="createRouteToName"
    />
    <b-table
        :items="tableDatas"
        :fields="tableFields"
        :busy="tableBusy"
        stacked="md"
        small
        show-empty
        hover
        bordered
        fixed
        class="text-center mt-3"
    >
      <template #table-busy>
        <l-table-busy/>
      </template>
      <template #empty>
        <l-table-empty/>
      </template>
      <template v-for="(_, slotName) of $scopedSlots" v-slot:[slotName]="scope">
        <slot :name="slotName" v-bind="scope"/>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "LTableView",
  props: {
    loadData: {},
    createRouteToName: {},
    tableDatas: {},
    tableFields: {},
    tableBusy: {}
  }
}
</script>

<style scoped>

</style>