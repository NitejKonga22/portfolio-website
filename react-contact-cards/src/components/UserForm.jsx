import { useState } from 'react';
export default function UserForm({ onAdd }) {
  const [form, setForm] = useState({name:'', email:'', phone:''});
  const change = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = e => { e.preventDefault(); if (!form.name || !form.email) return; onAdd({...form, id: Date.now()}); setForm({name:'',email:'',phone:''}); };
  return <form onSubmit={submit}><input name="name" value={form.name} onChange={change} placeholder="Name" required/><input name="email" type="email" value={form.email} onChange={change} placeholder="Email" required/><input name="phone" value={form.phone} onChange={change} placeholder="Phone"/><button>Add Contact</button></form>;
}
