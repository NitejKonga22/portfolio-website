import ContactCard from './ContactCard';
export default function UserList({ users }) {
  return <section><h2>User List</h2><div className="grid">{users.map(user => <ContactCard key={user.id} user={user} />)}</div></section>;
}
