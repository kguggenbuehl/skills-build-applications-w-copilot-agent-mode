import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponseItems } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Users request failed with ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeResponseItems(payload));
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {status === 'loading' && <p>Loading users...</p>}
      {status === 'error' && <p>Could not load users.</p>}
      {status === 'ready' && (
        <ul className="resource-list">
          {users.map((user) => (
            <li key={user._id || user.id}>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
