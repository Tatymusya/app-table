import { defineComponent, VNode } from "vue";
import AppButton from "@/common/components/AppButton/AppButton";
import AppInput from "@/common/components/AppInput/AppInput";

export default defineComponent({
  name: "AppTableFooter",
  props: {
    countColSpan: {
      type: Number,
      default: 0,
    },
    searchText: {
      type: String,
    },
    onInput: {
      type: Function,
    },
  },
  setup(props, { emit, attrs }) {
    const inputHandler = (e: Event): void => {
      emit("input", e);
    };
    console.log(attrs);
    return (): VNode => {
      return (
        <tfoot>
          <tr>
            <td colspan={props.countColSpan}>
              <AppInput onInput={inputHandler} value={props.searchText} />
              <AppButton class="button button--primary">Искать</AppButton>
            </td>
          </tr>
        </tfoot>
      );
    };
  },
});
