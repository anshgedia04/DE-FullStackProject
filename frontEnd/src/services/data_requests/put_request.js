export const makePutRequest = async(url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
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
      console.error('Error making PUT request:', error);
      throw error;
    }
  }
  