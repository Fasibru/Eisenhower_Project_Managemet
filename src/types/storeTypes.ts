export interface ITask {
  rank: number;
  category: string;
  completed: boolean;
  _id: string;
  title: string;
  description: string;
  date: string;
  __v: number;
}

export interface NewTaskType {
  title: string;
  description: string;
  category?: string;
  completed?: boolean;
}

export interface Filter {
  showTasks: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  dateRangeEndDefaultToday: boolean;
}

export interface Filters {
  filters: Filter;
  isFetchingFilters: boolean;
  fetchingError: string;
}

export interface Tasks {
  tasks: ITask[];
  newTaskPopup: boolean;
  newTask: NewTaskType;
  editTaskPopup: boolean;
  editTask: ITask;
  isFetchingTasks: boolean;
  fetchingError: string;
}

export interface UserType {
  userId: string;
  isFetchingUser: boolean;
  userError: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  loginRegisterError: string;
  loginError: string;
  registerError: string;
}

export interface Store {
  filters: Filters;
  tasks: Tasks;
  user: UserType;
}
