import IColumn from "@/types/Column";

export default interface IUser extends Partial<IColumn> {
  id: number;
  email: string;
  first_name?: string;
  pay_status: boolean;
  last_name?: string;
  username: string;
  profile_link?: string;
}
