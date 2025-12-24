import Timer from "./Timer";
import Streak from "./Streak";
import TaskList from "./TaskList";

export default function App() {
  return (
    <div className="app">
      <h1>🎯 Focus & Streak</h1>
      <TaskList />
      <Timer />
      <Streak />
    </div>
  );
}
