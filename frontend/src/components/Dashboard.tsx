import React, { useEffect, useState } from "react";
import { fetchSensorData } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface SensorData {
  temperature: number;
  moisture: number;
  humidity: number;
  machineStatus: string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<SensorData | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const result = await fetchSensorData();

    const formatted = {
      ...result,
      temperature: Number(result.temperature),
      moisture: Number(result.moisture),
      humidity: Number(result.humidity),
      time: new Date().toLocaleTimeString()
    };

    setData(formatted);
    setHistory(prev => [...prev.slice(-9), formatted]); // keep last 10
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container mt-4">

      <div className="row mb-4">
        <Card title="Temperature" value={`${data.temperature} °C`} />
        <Card title="Moisture" value={`${data.moisture} %`} />
        <Card title="Humidity" value={`${data.humidity} %`} />
        <Card title="Machine" value={data.machineStatus} />
      </div>

      <h3 className="mb-3">📊 Sensor Trends</h3>

      <LineChart width={600} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" />
        <Line type="monotone" dataKey="moisture" />
        <Line type="monotone" dataKey="humidity" />
      </LineChart>

    </div>
  );
};

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="col-md-3">
    <div className="card text-center shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;