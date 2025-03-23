import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
  // Refresh data every second (1000ms)
  const { data, error } = useSWR('/api/sensordata', fetcher, { refreshInterval: 1000 });

  if (error) return <div>Failed to load sensor data.</div>;
  if (!data) return <div>Loading sensor data...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Real-Time Sensor Data</h1>
      <p>{data.data}</p>
    </div>
  );
}
