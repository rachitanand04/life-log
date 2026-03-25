const baseURL = "http://localhost:3000";

export async function login(formData) {
  const res = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }
}

export async function register(formData) {
  const res = await fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username: formData.username,
      password: formData.password,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
}

export async function me() {
  const res = await fetch(`${baseURL}/me`, {
    credentials: "include",
  });

  if(res.status === 401){
    throw new Error("Unauthorised")
  }
}

export async function logout() {
  fetch("http://localhost:3000/logout", {
    method: "POST",
    credentials: "include",
  });
}
