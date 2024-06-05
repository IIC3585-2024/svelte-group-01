const getExampleTask = async () => {
  try {
    const randomId = Math.floor(Math.random() * 200) + 1;
    const randomUserResponse = await fetch(`https://dummyjson.com/users/${randomId}`);
    const randomUser = await randomUserResponse.json();

    const randomTodoResponse = await fetch('https://dummyjson.com/todos/random');
    const randomTodo = await randomTodoResponse.json();

    return {
      project: randomUser.company.name,
      task: randomTodo.todo,
      goalTime: Math.floor(Math.random() * 600) + 1,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default getExampleTask;
