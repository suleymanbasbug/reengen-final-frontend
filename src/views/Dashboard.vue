<template>
  <div>
    <h4 class="mt-5">Factory List</h4>
    <unit-list class="mt-10"/>
    <factory-list class="mt-10"/>
    
  </div>
</template>

<script>

import FactoryList from "../components/FactoryList.vue"
import UnitList from "../components/UnitList.vue"
export default {
components:{
  FactoryList,
  UnitList
}
}
</script>

<style>

</style>