export async function fetchAPI(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown
): Promise<unknown> {
  const url = `http://localhost:3000/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...(typeof body !== 'undefined' ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
}