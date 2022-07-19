<template lang="pug">
.header-global-component.flex.a-center.j-between
  router-link(to="/")
    h1 OKENIT SPA
  
</template>

<script>
export default {
  name: "GlobalHeader",
};
</script>

<style lang="scss" scoped>
.header-global-component {
  padding: 20px;
  border-bottom: 4px solid #fff;
  background: #222222;
  gap: 100px;
}
h1 {
  font-size: 18px;
  line-height: 18px;
  color: #fff;
}

</style>
