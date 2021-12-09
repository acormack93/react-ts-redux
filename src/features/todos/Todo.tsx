import { useAppSelector } from '../../app/hooks';
import { selectTodos } from './todoSlice';

export function Todo() {
  const todos = useAppSelector(selectTodos)
  return (
    <div className="Todo">
      <h1>Have some todos:</h1>
      <br />
       {
        (todos && todos.todos) ? todos.todos.map(t => 
          <div className="todo__item">
            <h2>{t.title}</h2>
            <h3>{t.user}</h3>
            <p>{t.desc}</p>
          </div>
          )
        : 'nope'
      }
    </div>
  )
}