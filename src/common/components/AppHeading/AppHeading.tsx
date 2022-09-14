import { defineComponent, VNode, PropType } from "vue";
import { HEADING_TYPE } from "@/types";
import "@/common/components/AppHeading/style.css";

export default defineComponent({
  name: "AppHeading",
  props: {
    tag: {
      type: String as PropType<HEADING_TYPE>,
      default: "h1",
    },
  },
  setup(props, { slots }) {
    return (): VNode => {
      const TagHeading = `${props.tag}`;
      return <TagHeading>{slots.default && slots.default()}</TagHeading>;
    };
  },
});
