import React, {useState} from 'react';
import {TaskApi} from "../../type";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTasks, sendTasks} from "../../containers/Tasks/TaskSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";


const CardForm = () => {

  const dispatch = useAppDispatch();
  const updateLoading = useAppSelector(state => state.task.updateLoading);

  const [task, setTask] = useState<TaskApi>({checked: false, text: ''});

  const onTakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, checked} = e.target;
    setTask((prev) => ({...prev, [name]: name === 'checked' ? checked : value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      await dispatch(sendTasks(task));
      await dispatch(fetchTasks());
    }
  };


  return (
    <form onSubmit={onFormSubmit} className="d-flex flex-column gap-3 align-items-center mt-3">
      <div className="form-group text-center">
        <label htmlFor="text" className="fw-bold fs-4">Add Task</label>
        <input
          id="text" name="text" type="text"
          className="form-control mt-2"
          onChange={onTakeChange}
          value={task.text}
        />
        <div className="mt-2">
          <label htmlFor="checked" className="me-3">Done</label>
          <input
            name="checked" id="checked" type="checkbox"
            onChange={onTakeChange}
            checked={task.checked}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success" disabled={updateLoading}>
        {updateLoading ? <ButtonSpinner/> : "Send"}</button>
    </form>
  );
};

export default CardForm;