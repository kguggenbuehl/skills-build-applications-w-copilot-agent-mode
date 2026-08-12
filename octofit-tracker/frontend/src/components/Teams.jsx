import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponseItems } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Teams request failed with ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeResponseItems(payload));
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      }
    }

    loadTeams();

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {status === 'loading' && <p>Loading teams...</p>}
      {status === 'error' && <p>Could not load teams.</p>}
      {status === 'ready' && (
        <ul className="resource-list">
          {teams.map((team) => (
            <li key={team._id || team.id}>
              <strong>{team.name}</strong>
              <span>{team.city}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
