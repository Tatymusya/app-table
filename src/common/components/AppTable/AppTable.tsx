import { IColumn } from "@/types";
import { defineComponent, computed, PropType, VNode, reactive } from "vue";
import AppTableHeader from "@/common/components/AppTable/AppTableHeader";
import AppTableColumns from "@/common/components/AppTable/AppTableColumn";
import AppTableFooter from "@/common/components/AppTable/AppTableFooter";
import "@/common/components/AppTable/style.css";

export default defineComponent({
  name: "AppTable",
  inheritAttrs: false,
  props: {
    headers: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
    caption: {
      type: String,
      require: true,
    },
    isHideCaption: {
      type: Boolean,
      default: false,
    },
    isSortable: {
      type: Boolean,
      default: true,
    },
    activeSortedBy: {
      type: String,
    },
  },
  setup(props, { slots, emit }) {
    const captionClasses = computed(() => {
      return {
        "visually-hidden": props.isHideCaption,
      };
    });
    const inputHandler = (e: Event): void => {
      emit("search", e);
    };
    const colsCount = reactive(Array.from(Array(props.headers.length)));
    return (): VNode => {
      return (
        <table class="table">
          <caption class={captionClasses.value}>{props.caption}</caption>
          <colgroup>
            {props.headers.map((v) => {
              const htmlRef = `col-${v}`;
              const classes = {
                "cols-active": props.activeSortedBy === v,
              };
              return <col ref={htmlRef} class={classes}></col>;
            })}
          </colgroup>
          {slots.header ? (
            slots.header()
          ) : (
            <AppTableHeader
              headers={props.headers}
              hasSortButton={props.isSortable}
            />
          )}
          {slots.body ? (
            slots.body()
          ) : (
            <AppTableColumns columns={props.columns} />
          )}
          <AppTableFooter
            onInput={inputHandler}
            countColSpan={props.headers.length}
          />
        </table>
      );
    };
  },
});
