import { defineComponent, computed, VNode } from "vue";
import "@/layouts/TheHeader/style.css";

export default defineComponent({
  name: "TheHeader",
  props: {
    classes: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { slots }) {
    const headerClasses = computed(() => {
      return {
        [`${props.classes}`]: props.classes,
        header: true,
      };
    });
    return (): VNode => {
      return (
        <header class={headerClasses.value}>
          {slots.default && slots.default()}
        </header>
      );
    };
  },
});
