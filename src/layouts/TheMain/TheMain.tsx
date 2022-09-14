import { defineComponent, computed, VNode } from "vue";
import "@/layouts/TheMain/style.css";

export default defineComponent({
  name: "TheMain",
  props: {
    classes: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { slots }) {
    const mainClasses = computed(() => {
      return {
        [`${props.classes}`]: props.classes,
        main: true,
      };
    });
    return (): VNode => {
      return (
        <main class={mainClasses.value}>
          <div class="content">{slots.default && slots.default()}</div>
        </main>
      );
    };
  },
});
