import { defineComponent, PropType, VNode, computed } from "vue";
import { BUTTON_TYPE } from "@/types";
import "@/common/components/AppButton/style.css";

export default defineComponent({
  name: "AppButton",
  props: {
    type: {
      type: String as PropType<BUTTON_TYPE>,
      default: "button",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, slots }) {
    const classes = computed(() => {
      return {
        button: true,
        "button--active": props.isActive,
        "button--with-icons": slots.icons,
      };
    });
    const clickHandler = (e: Event): void => {
      emit("click", e);
    };
    const keyUpHandler = (e: KeyboardEvent): void => {
      emit("keyup", e);
    };
    return (): VNode => {
      return (
        <button
          type={props.type}
          onClick={clickHandler}
          onKeyup={keyUpHandler}
          class={classes.value}
        >
          {slots.default ? slots.default() : "Отправить"}
          {slots.icons && slots.icons()}
        </button>
      );
    };
  },
});
