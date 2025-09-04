const LOG_API = "http://20.244.56.144/evaluation-service/logs";

export async function Log(stack, level, pkg, message) {
  const payload = { stack, level, package: pkg, message };
  try {
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.info("✅ Log sent:", data);
  } catch (err) {
    console.error("❌ Log error:", err);
  }
}