// src/services/api.js

const apiUrl = 'http://localhost:5000/api';

// Function to add a new institution
export const addInstitution = async (institution) => {
  try {
    const response = await fetch(`${apiUrl}/institutions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(institution),
    });

    if (!response.ok) {
      throw new Error('Failed to add institution');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding institution:', error);
  }
};

// Similarly, you can create functions for adding faculties, courses, etc.
