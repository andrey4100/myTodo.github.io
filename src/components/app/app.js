import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

const App = () => {

  const todoData = [
    { label: "Drink Coffe", important: false, id: 1 },
    { label: "Make Awesome App", important: true, id: 2 },
    { label: "Have a lunch", important: false, id: 3 },
  ];

  return (
    <div>
      <AppHeader />
      <SearchPanel />
      <TodoList todos={ todoData }/>
    </div>
  );
};

export default App;