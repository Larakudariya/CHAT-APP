const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

export const login = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("Login Response:", result); // DEBUG
  return result;
};

export const signup = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("Signup Response:", result); // DEBUG
  return result;
};

