const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://web-production-8d47.up.railway.app";

export async function analyzeDatabase(config: {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  demo_mode?: boolean;
}) {
  const response = await fetch(`${API_BASE_URL}/analyze-database`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze database");
  }

  return response.json();
}
