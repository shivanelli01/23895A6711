export function Log(source, level, component, message) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    source,
    level,
    component,
    message,
  };

  // Save logs to localStorage (instead of console.log)
  let logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(logEntry);
  localStorage.setItem("logs", JSON.stringify(logs));
}
