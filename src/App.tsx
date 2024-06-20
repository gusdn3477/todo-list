import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList';
import TodoCreate from './pages/TodoCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoCreate />} />
        <Route path=":id" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
