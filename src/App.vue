<template lang="pug">
.main
  Header
  Content
</template>

<script>
import Header from "@/components/header";
import Content from "@/components/content";

export default {
  name: "App",
  components: {
    Header,
    Content,
  },
};
</script>

<style lang="scss" scoped></style>
