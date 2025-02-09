export const makeDeleteRequest = async(url, data) =>  {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const result = await response.json();
      return result;
  
    } catch (error) {
      console.error('Error making DELETE request:', error);
      throw error;
    }
  }
  