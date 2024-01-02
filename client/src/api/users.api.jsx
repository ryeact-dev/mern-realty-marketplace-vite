export async function signin(formData) {
  const res = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function signup(formData) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function googleAuth(formData) {
  const res = await fetch('/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function updateUser(formData) {
  const res = await fetch(`/api/user/update/${formData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  return data;
}

export async function deleteUser(id) {
  const res = await fetch(`/api/user/delete/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  return data;
}

export async function logoutUser() {
  const res = await fetch(`/api/auth/logout`);
  const data = await res.json();
  return data;
}

export async function getUser(userId) {
  const res = await fetch(`/api/user/${userId}`);
  const data = await res.json();
  return data;
}
