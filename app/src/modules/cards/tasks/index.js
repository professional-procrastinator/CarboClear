import styles from './index.module.scss';
import axios from '../../../utils/axios.js';
import { useEffect, useState } from 'react';
export default function TasksCard({}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [completedTasks, setCompletedTasks] = useState(0);

  const getTasks = async () => {
    if (window.localStorage.getItem('tasks') !== null) {
      //if all three tasks are not completed
      console.log(
        JSON.parse(window.localStorage.getItem('tasks')).filter(
          (task) => task.completed == true
        )
      );
      if (
        JSON.parse(window.localStorage.getItem('tasks')).filter(
          (task) => task.completed == true
        ).length == 3
      ) {
        const { data } = await axios.get('/tasks');

        data.tasks.map((task) => {
          task.completed = false;
        });

        setTasks(data.tasks);

        window.localStorage.setItem('tasks', JSON.stringify(data.tasks));

        return;
      }

      setTasks(JSON.parse(window.localStorage.getItem('tasks')));
      return setCompletedTasks(
        JSON.parse(window.localStorage.getItem('tasks')).filter(
          (task) => task.completed == true
        ).length
      );
    }

    const { data } = await axios.get('/tasks');

    data.tasks.map((task) => {
      task.completed = false;
    });

    setTasks(data.tasks);

    window.localStorage.setItem('tasks', JSON.stringify(data.tasks));
  };
  useEffect(() => {
    getTasks();
  }, []);

  const markTaskAsDone = async (task) => {
    //mark task as done in local storage

    if (completedTasks == 2) {
      const tasks = JSON.parse(window.localStorage.getItem('tasks'));

      tasks.map((t) => {
        if (t.id == task.id && t.completed == false) {
          t.completed = true;
        }
      });

      window.localStorage.setItem('tasks', JSON.stringify(tasks));

      setCompletedTasks((prev) => prev + 1);

      return getTasks();
    }
    const tasks = JSON.parse(window.localStorage.getItem('tasks'));

    tasks.map((t) => {
      if (t.id == task.id && t.completed == false) {
        t.completed = true;
      }
    });

    window.localStorage.setItem('tasks', JSON.stringify(tasks));

    return setCompletedTasks((prev) => prev + 1);
  };
  if (tasks.length > 0) {
    return (
      <div className={styles.card}>
        <div className={styles.card__header}>
          <div className={styles.card__header__title}>Tasks</div>
          <div className={styles.card__header__status}>
            <span className={styles.card__header__status__text}>
              {completedTasks}/{tasks.length}
            </span>
          </div>
        </div>
        <div className={styles.card__body}>
          {completedTasks == tasks.length ? (
            <div className={styles.card__body__completed}>
              <div className={styles.card__body__completed__title}>
                All done! Refresh the page tomorrow to get more tasks.
              </div>
            </div>
          ) : (
            <>
              {tasks.map((task) => {
                return (
                  <div className={styles.card__body__task}>
                    <div className={styles.card__body__task__info}>
                      <div className={styles.card__body__task__info__title}>
                        {task.name}
                      </div>
                      <div className={styles.card__body__task__info__points}>
                        {task.points} points
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        markTaskAsDone(task);
                      }}
                      className={styles.card__body__task__button}
                    >
                      Mark as done
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className={styles.card__footer}></div>
      </div>
    );
  }
}
