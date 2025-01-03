const BASE_URL = 'http://localhost:5002/api'; // Backend base URL

export const fetchQuestions = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${BASE_URL}/questions?${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};
