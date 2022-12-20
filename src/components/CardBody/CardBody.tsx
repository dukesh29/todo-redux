import React from 'react';
import {Task} from "../../type";
import {useAppSelector} from "../../app/hooks";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
}

const CardBody: React.FC<Props> = ({task, onDelete}) => {

  const deleteLoading = useAppSelector(state => state.task.updateLoading);

  return (
    <div className="card">
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="m-0">{task.text}</p>
        <div className="d-flex justify-content-between  gap-5">
          <input type="checkbox" name="task" checked={task.checked}/>
          <button className="btn btn-danger"
                  onClick={() => onDelete(task.id)} disabled={deleteLoading}>
            {deleteLoading? <ButtonSpinner/>: "X"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBody;