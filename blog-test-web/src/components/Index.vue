<template>
  <div id="blog-list">
    <p v-for="(item, index) in list" :key="index" @click="detail(item.id)">
      {{ item.title }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  async created() {
    const res = await this.$fetch({
      url: "/blogList",
    })
    console.log(res)
    this.list = res.data
  },
  methods: {
    detail(id) {
      this.$router.push({ path: `/detail/${id}` })
    },
  },
}
</script>

<style></style>
