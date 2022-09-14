import { defineComponent, PropType, VNode } from "vue";
import { IColumn } from "@/types";

export default defineComponent({
  name: "AppTableColumns",
  props: {
    columns: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
  },
  setup(props) {
    return (): VNode => {
      return (
        <tbody>
          {props.columns.map((item: IColumn) => {
            const values = Object.values(item);
            const rowKey: string = `${item?.id}_${item?.email}`;
            return (
              <tr key={rowKey}>
                {values.map((i) => {
                  const colKey: string = `${i}_${Math.random()}`;
                  const text = i === "" ? "-" : i?.toString();
                  return <td key={colKey}>{text}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      );
    };
  },
});
