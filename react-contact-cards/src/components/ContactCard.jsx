export default function ContactCard({ user }) {
  return <article className="card"><h3>{user.name}</h3><p>📧 {user.email}</p><p>📱 {user.phone || "Not provided"}</p></article>;
}
