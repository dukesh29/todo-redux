export interface TaskApi {
  text: string;
  checked: boolean;
}

export interface Task extends TaskApi {
  id: string;
}

export interface ApiTasksList {
  [id: string]: TaskApi;
}
