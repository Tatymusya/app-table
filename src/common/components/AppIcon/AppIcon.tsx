import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "AppIcon",
  inheritAttrs: false,
  props: {
    size: {
      type: [String, Number],
      default: 24,
    },
    role: {
      type: String,
      default: "img",
    },
    alternateText: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { slots, emit }) {
    const styles = computed(() => {
      if (typeof props.size === "string") {
        return {
          width: props.size,
        };
      }
      return {
        width: `${props.size}px`,
      };
    });

    const clickHandler = (e: Event) => {
      if (props.disabled) {
        return false;
      }
      emit("click", e);
    };

    return () => {
      const IconProps = {
        ...props,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        "aria-hidden": true,
        role: props.role,
      };
      return (
        <div onClick={clickHandler} style={styles.value}>
          <svg {...IconProps}>{slots.default && slots.default()}</svg>
        </div>
      );
    };
  },
});
