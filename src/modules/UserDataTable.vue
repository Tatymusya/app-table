<template>
  <AppTable
    :headers="headers"
    :columns="resultData"
    :isHideCaption="true"
    :isSortable="true"
    :activeSortedBy="activeSortedBy"
    @search="getSearchParam"
    caption="Информация о пользователях"
  >
    <!--используем либо слоты либо пропсы-->
    <template #header>
      <thead>
        <tr>
          <th scope="col">
            <AppButton
              @click.capture="onSort($event, 'id')"
              :class="{
                'button--active': activeSortedBy === 'id',
                [`button--sort-${sortDir}`]: sortDir && activeSortedBy === 'id',
              }"
            >
              ID
              <template #icons>
                <AppIcon class="button__icon" :size="14">
                  <path
                    d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                  ></path>
                </AppIcon>
              </template>
            </AppButton>
          </th>
          <th scope="col">
            <AppButton
              @click.capture="onSort($event, 'email')"
              :class="{
                'button--active': activeSortedBy === 'email',
                [`button--sort-${sortDir}`]:
                  sortDir && activeSortedBy === 'email',
              }"
            >
              EMAIL
              <template #icons>
                <AppIcon class="button__icon" :size="14">
                  <path
                    d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                  ></path>
                </AppIcon>
              </template>
            </AppButton>
          </th>
          <th scope="col">
            <AppButton
              @click.capture="onSort($event, 'first_name')"
              :class="{
                'button--active': activeSortedBy === 'first_name',
                [`button--sort-${sortDir}`]:
                  sortDir && activeSortedBy === 'first_name',
              }"
            >
              FIRST NAME
              <template #icons>
                <AppIcon class="button__icon" :size="14">
                  <path
                    d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                  ></path>
                </AppIcon>
              </template>
            </AppButton>
          </th>
          <th scope="col">
            <AppButton
              @click.capture="onSort($event, 'pay_status')"
              :class="{
                'button--active': activeSortedBy === 'pay_status',
                [`button--sort-${sortDir}`]:
                  sortDir && activeSortedBy === 'pay_status',
              }"
            >
              PAY STATUS
              <template #icons>
                <AppIcon class="button__icon" :size="14">
                  <path
                    d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                  ></path>
                </AppIcon>
              </template>
            </AppButton>
          </th>
          <th scope="col">
            <AppButton
              @click.capture="onSort($event, 'last_name')"
              :class="{
                'button--active': activeSortedBy === 'last_name',
                [`button--sort-${sortDir}`]:
                  sortDir && activeSortedBy === 'last_name',
              }"
            >
              LAST NAME
              <template #icons>
                <AppIcon class="button__icon" :size="14">
                  <path
                    d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                  ></path>
                </AppIcon>
              </template>
            </AppButton>
          </th>
          <th scope="col">
            <AppButton
              @click.capture="onSort($event, 'username')"
              :class="{
                'button--active': activeSortedBy === 'username',
                [`button--sort-${sortDir}`]: sortDir,
              }"
            >
              USERNAME
              <template #icons>
                <AppIcon class="button__icon" :size="14">
                  <path
                    d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
                  ></path>
                </AppIcon>
              </template>
            </AppButton>
          </th>
          <th scope="col">PROFILE LINK</th>
        </tr>
      </thead>
    </template>
  </AppTable>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, watch, computed } from "vue";
import { IUser } from "@/types";
import AppTable from "@/common/components/AppTable/AppTable";
import AppButton from "@/common/components/AppButton/AppButton";
import AppIcon from "@/common/components/AppIcon/AppIcon";

export default defineComponent({
  name: "UserDataTable",
  components: {
    AppTable,
    AppButton,
    AppIcon,
  },
  props: {
    users: {
      type: Array as PropType<IUser[]>,
      default: () => [],
    },
  },
  setup(props) {
    const headers: string[] = reactive(Object.keys(props.users[0]));
    let sortingUsers = reactive(Object.assign({}, props.users));
    let searchString = ref<string>();
    let searchingUserList = ref<IUser[]>([]);
    let activeSortedBy = ref("");
    let sortDir = ref<"asc" | "desc">("asc");

    let resultData = computed<IUser[]>(() => {
      let hasSearchingUserList;
      if (searchingUserList.value.length) {
        hasSearchingUserList = searchingUserList.value;
      }
      return hasSearchingUserList || props.users;
    });
    const compareNumber = (a: number, b: number): number => {
      return a - b;
    };
    const compareString = (a: string, b: string): number => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    };
    const compareBoolean = (a: boolean, b: boolean): number => {
      return a === b ? 0 : a ? -1 : 1;
    };
    const useSorted = (data: IUser[], orderBy: string): IUser[] => {
      sortingUsers = data.sort((a: IUser, b: IUser): number => {
        const compared1 = a[orderBy];
        const compared2 = b[orderBy];
        let modifier = 1;
        if (sortDir.value === "desc") {
          modifier = -1;
        }
        if (typeof compared1 === "number" && typeof compared2 === "number") {
          return compareNumber(compared1, compared2) * modifier;
        }
        if (typeof compared1 === "string" && typeof compared2 === "string") {
          return compareString(compared1, compared2) * modifier;
        }
        if (typeof compared1 === "boolean" && typeof compared2 === "boolean") {
          return compareBoolean(compared1, compared2) * modifier;
        }
        return 0;
      });
      return sortingUsers;
    };
    const onSort = (e: Event, sortBy: string): void => {
      activeSortedBy.value = sortBy;
      useSorted(props.users, sortBy);
      sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
    };

    const getSearchParam = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const { value } = target;
      searchString.value = value;
    };

    watch<string | undefined>(
      () => searchString.value,
      (oldVal, newVal) => {
        console.log(newVal);
        if (newVal && newVal.length < 3) {
          searchingUserList.value = [];
        }
        if (newVal !== oldVal && newVal && newVal.length >= 3) {
          const users = props.users.filter((v: IUser): any => {
            const email = v?.email;
            const fName = v?.first_name;
            const lName = v?.last_name;
            const uName = v?.username;
            return (
              email.match(newVal) ||
              (fName && fName.match(newVal)) ||
              (lName && lName.match(newVal)) ||
              uName.match(newVal)
            );
          });
          if (users) {
            searchingUserList.value = users;
          }
        }
      }
    );

    return {
      activeSortedBy,
      headers,
      onSort,
      sortDir,
      getSearchParam,
      resultData,
      searchingUserList,
    };
  },
});
</script>
