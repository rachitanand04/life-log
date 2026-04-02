const baseURL = "http://localhost:3000";

export async function dashboard() {
  const res = await fetch(`${baseURL}/dashboard`, {
    credentials: "include",
  });
  return await res.json();
}

export async function logsFetch() {
  const res = await fetch(`${baseURL}/logs`, {
    credentials: "include",
  });
  return await res.json();
}

export async function addEntryCall(newEntry) {
  const res = await fetch(`${baseURL}/logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newEntry),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error adding log");
  }

  const data = await res.json();
  return data;
}

export async function deleteEntryCall(id) {
  const res = await fetch(`${baseURL}/logs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error deleting log");
  }
}

export async function updateStatus(id, newStatus) {
  const res = await fetch(`${baseURL}/status/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newStatus),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error updating log");
  }
}

export async function updateEntry(entry){
  const res = await fetch(`${baseURL}/update`,{
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(entry)
  });

  if(!res.ok){
    const data = await res.json();
    throw new Error(data.message || "Error updating log");
  }
}