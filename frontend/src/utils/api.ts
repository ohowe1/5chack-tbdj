export function fetchAPI(endpoint: string, method: string = 'GET', body: any = null) {
  const url = `http://localhost:3000/api/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies in the request
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error fetching API:', error);
      throw error;
    });
}