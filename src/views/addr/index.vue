<template>
  <div>
    <div class="wrap">
      <addrTop />
      <AddAddr />
    </div>
  </div>
</template>

<script>
import AddAddr from "./addAddr";
import addrTop from "./addrTop";
export default {
  components: {
    addrTop,
    AddAddr
  }
};
</script>

<style lang="stylus" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
