import { defineComponent, PropType, VNode } from "vue";
import AppButton from "@/common/components/AppButton/AppButton";

export default defineComponent({
  name: "AppTableHeader",
  props: {
    headers: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    hasSortButton: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    return (): VNode => {
      return (
        <thead>
          <tr>
            {props.headers.map((item: string) => {
              if (props.hasSortButton) {
                return (
                  <th scope="col">
                    <AppButton>
                      {item}
                      <span>&#8595;&#8593;</span>
                    </AppButton>
                  </th>
                );
              }
              return <th scope="col">{item}</th>;
            })}
          </tr>
        </thead>
      );
    };
  },
});
