import {PHONE_LOCALHOST} from '@env';
const personUrl = `http://${PHONE_LOCALHOST}/api/v1/search/person`;

export const searchPeopleAsync = async (searchQuery, token) => {
  try {
    const response = await fetch(`${personUrl}/${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch person details');
    }
    console.log('artists :', data.content);
    return data.content;
  } catch (error) {
    console.error('Error in getPersonDetailsByIdAsync:', error);
    return {error: error.message};
  }
};
