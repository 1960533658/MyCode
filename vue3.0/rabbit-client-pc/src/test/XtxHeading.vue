<script>
import { h } from "vue";

export default {
  name: "XtxHeading",
  props: {
    level: {
      type: Number,
      default: 5,
    },
  },
  render() {
    return h(`h${this.level}`, null, this.$slots.default());
  },
};
</script>

<style scoped></style>
