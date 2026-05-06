export async function fetchSensorData() {
  const res = await fetch("http://localhost:5000/api/sensors");
  return res.json();
}