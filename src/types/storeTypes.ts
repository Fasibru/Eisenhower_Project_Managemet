export interface Task {
  rank: number;
  category: string;
  completed: boolean;
  _id: string;
  title: string;
  description: string;
  date: string;
  __v: number;
}

export interface NewTask {
  title?: string;
  description?: string;
  category?: string;
  completed?: boolean;
}

export interface Filter {
  showTasks: string;
  dateRangeStart: Date;
  dateRangeEnd: Date;
  dateRangeEndDefaultToday: boolean;
}

export interface Filters {
  filters: Filter;
  isFetchingFilters: boolean;
  fetchingError: string;
}

export interface Tasks {
  tasks: Task[];
  newTaskPopup: false;
  newTask: NewTask;
  editTaskPopup: boolean;
  editTask: Task;
  isFetchingTasks: boolean;
  fetchingError: string;
}

export interface User {
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
