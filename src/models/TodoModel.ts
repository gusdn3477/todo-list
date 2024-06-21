export interface TodoModel {
  id: number;
  checked: boolean;
  title: string;
  date?: string;
  isBookMarked: boolean;
  tagColor: string;
}
