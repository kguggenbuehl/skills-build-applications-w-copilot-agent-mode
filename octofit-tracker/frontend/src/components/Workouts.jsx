import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponseItems } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Workouts request failed with ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeResponseItems(payload));
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      }
    }

    loadWorkouts();

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {status === 'loading' && <p>Loading workouts...</p>}
      {status === 'error' && <p>Could not load workouts.</p>}
      {status === 'ready' && (
        <ul className="resource-list">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id}>
              <strong>{workout.title}</strong>
              <span>{workout.durationMinutes} min</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
