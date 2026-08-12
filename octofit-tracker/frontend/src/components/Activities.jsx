import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeResponseItems } from './api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Activities request failed with ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeResponseItems(payload));
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error');
        }
      }
    }

    loadActivities();

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {status === 'loading' && <p>Loading activities...</p>}
      {status === 'error' && <p>Could not load activities.</p>}
      {status === 'ready' && (
        <ul className="resource-list">
          {activities.map((activity) => (
            <li key={activity._id || activity.id}>
              <strong>{activity.type}</strong>
              <span>{activity.durationMinutes} min</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
