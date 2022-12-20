import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import CardBody from "../../components/CardBody/CardBody";
import CardForm from "../../components/CardForm/CardForm";
import {deleteTasks, fetchTasks} from "./TaskSlice";
import Spinner from "../../components/Spinner/Spinner";

const Tasks = () => {

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.task.tasks);
  const loading = useAppSelector(state => state.task.loading);

  const onDeleteTask = async (id: string) => {
    await dispatch(deleteTasks(id));
    await dispatch(fetchTasks());
  };

// const loadingState = useAppSelector(state => state.dishes.fetchLoading);


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container d-flex flex-column gap-3">
      <CardForm/>
      <div className="d-flex flex-column gap-2">
        {loading ? <Spinner/> : tasks.map(task => (
          <CardBody task={task} onDelete={() => onDeleteTask(task.id)} key={task.id}/>
        ))}
      </div>
    </div>
  );
};

export default Tasks;