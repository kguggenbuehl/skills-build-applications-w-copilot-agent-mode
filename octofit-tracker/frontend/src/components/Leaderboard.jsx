import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponseItems } from './api';

function Leaderboard() {
  const [boards, setBoards] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Leaderboard request failed with ${response.status}`);
        }

        const payload = await response.json();
        setBoards(normalizeResponseItems(payload));
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      }
    }

    loadLeaderboard();

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {status === 'loading' && <p>Loading leaderboard...</p>}
      {status === 'error' && <p>Could not load leaderboard.</p>}
      {status === 'ready' && (
        <ul className="resource-list">
          {boards.flatMap((board) => board.entries || []).map((entry) => (
            <li key={`${entry.user?._id || entry.user}-${entry.rank}`}>
              <strong>{entry.user?.name || 'Unknown User'}</strong>
              <span>{entry.points} points</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Leaderboard;
