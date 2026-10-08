import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
export default function App() {
  const [users, setUsers] = useState([]);
  return <main><h1>React Contact Cards</h1><UserForm onAdd={user => setUsers(prev => [...prev, user])}/><UserList users={users}/></main>;
}
