export const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  
    const data: T = await response.json();
    return data;
};