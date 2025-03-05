import {PHONE_LOCALHOST} from '@env';
const searchUrl = `http://${PHONE_LOCALHOST}/api/v1/search`;

const getSearchHistoryAsync = async token => {
  try {
    const response = await fetch(`${searchUrl}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data.content);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch search history');
    }

    return data.content;
  } catch (error) {
    console.error('Error in getSearchHistoryAsync:', error);
    return {error: error.message};
  }
};

const removeItemFromSearchHistoryAsync = async (id, token) => {
  try {
    const response = await fetch(`${searchUrl}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(
        data.message || 'Failed to remove item from search history',
      );
    }

    return data;
  } catch (error) {
    console.error('Error in removeItemFromSearchHistoryAsync:', error);
    return {error: error.message};
  }
};

export {getSearchHistoryAsync, removeItemFromSearchHistoryAsync};
