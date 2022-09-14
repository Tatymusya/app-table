import { defineComponent, PropType, VNode, computed } from "vue";
import { INPUT_TYPE } from "@/types";
import "@/common/components/AppButton/style.css";

export default defineComponent({
  name: "AppInput",
  props: {
    type: {
      type: String as PropType<INPUT_TYPE>,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    onInput: {
      type: Function,
    },
  },
  setup(props, { emit }) {
    const classes = computed(() => {
      return {
        input: true,
      };
    });
    const inputHandler = (e: Event): void => {
      emit("input", e);
    };
    return (): VNode => {
      return (
        <input
          type={props.type}
          value={props.value}
          onInput={inputHandler}
          onChange={inputHandler}
          class={classes.value}
        />
      );
    };
  },
});
