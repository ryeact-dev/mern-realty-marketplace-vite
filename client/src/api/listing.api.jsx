export async function saveListing(formData) {
  const response = await fetch('/api/listing/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  return data;
}

export async function getUserListings({ userId }) {
  const res = await fetch(`/api/user/listings/${userId}`);
  const data = await res.json();
  return data;
}

export async function deleteUserListing(listingId) {
  const res = await fetch(`/api/listing/delete/${listingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}
