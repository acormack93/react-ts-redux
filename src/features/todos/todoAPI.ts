import { Todo } from "./todoSlice";

export function fetchTodos(): Promise<Todo[]> {
  return fetch("http://localhost:3004/todos")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => {
      return responseJson
    })
    .catch((error) => {
      console.log(error)
    });
}
