function getSensorData() {
  return {
    temperature: (20 + Math.random() * 10).toFixed(1),
    moisture: (30 + Math.random() * 50).toFixed(1),
    humidity: (40 + Math.random() * 40).toFixed(1),
    machineStatus: Math.random() > 0.2 ? "Running" : "Stopped"
  };
}

module.exports = { getSensorData };