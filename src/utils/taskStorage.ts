export default class TaskStorage {
  static getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  static saveTasks(tasks: any[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
