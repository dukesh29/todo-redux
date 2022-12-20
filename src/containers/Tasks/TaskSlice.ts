import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiTasksList, Task, TaskApi} from "../../type";
import axiosApi from "../../axiosApi";


export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async () => {
    try {
      const tasksResponse = await axiosApi.get<ApiTasksList | null>('/tasks.json');
      const tasks = tasksResponse.data;

      let newTasks: Task[] = [];

      if (tasks) {
        newTasks = Object.keys(tasks).map(id => {
          const task = tasks[id];
          return {
            ...task,
            id
          }
        });
      }
      return (newTasks);
    } finally {

    }

  }
);

export const sendTasks = createAsyncThunk(
  'tasks/post',
  async (task: TaskApi) => {
    await axiosApi.post('/tasks.json', task);
  }
);

export const deleteTasks = createAsyncThunk(
  'tasks/delete',
  async (id: string) => {
    await axiosApi.delete('/tasks/' + id + '.json');
  }
);


interface TaskState {
  tasks: Task[];
  fetchLoading: 'idle' | 'pending' | 'success' | 'failure';
  loading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  fetchLoading: 'idle',
  loading: false,
  updateLoading: false,
  deleteLoading: false,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.fetchLoading = 'pending';
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.fetchLoading = 'success';
      state.loading = false;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.fetchLoading = 'failure';
    });
    builder.addCase(sendTasks.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(sendTasks.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(deleteTasks.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteTasks.fulfilled, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const taskReducer = taskSlice.reducer;