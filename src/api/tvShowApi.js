import {PHONE_LOCALHOST} from '@env';
const tvUrl = `http://${PHONE_LOCALHOST}/api/v1/tv`;

const getTrendingTvShowsAsync = async () => {
  try {
    const response = await fetch(`${tvUrl}/trending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch trending TV shows');
    }

    return data;
  } catch (error) {
    console.error('Error in getTrendingTvShowsAsync:', error);
    return {error: error.message};
  }
};

const getTvShowDetailsByIdAsync = async tvShowId => {
  try {
    const response = await fetch(`${tvUrl}/${tvShowId}/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch TV show details');
    }

    return data;
  } catch (error) {
    console.error('Error in getTvShowDetailsByIdAsync:', error);
    return {error: error.message};
  }
};

const getTvShowTrailersByIdAsync = async (tvShowId, token) => {
  try {
    const response = await fetch(`${tvUrl}/${tvShowId}/trailers`, {
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
      throw new Error(data.message || 'Failed to fetch TV show trailers');
    }

    return data;
  } catch (error) {
    console.error('Error in getTvShowTrailersByIdAsync:', error);
    return {error: error.message};
  }
};

const getSimilarTvShowsByIdAsync = async (tvShowId, token) => {
  try {
    const response = await fetch(`${tvUrl}/${tvShowId}/similar`, {
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
      throw new Error(data.message || 'Failed to fetch similar TV shows');
    }

    return data;
  } catch (error) {
    console.error('Error in getSimilarTvShowsByIdAsync:', error);
    return {error: error.message};
  }
};

const getTvShowsByCategoryAsync = async (category, token) => {
  try {
    const response = await fetch(`${tvUrl}/${category}`, {
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
      throw new Error(data.message || 'Failed to fetch TV shows by category');
    }

    return data;
  } catch (error) {
    console.error('Error in getTvShowsByCategoryAsync:', error);
    return {error: error.message};
  }
};

const searchTvShowsAsync = async (query, token) => {
  try {
    const response = await fetch(
      `http://${PHONE_LOCALHOST}/api/v1/search/tv/${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to search TV shows');
    }

    return data.content;
  } catch (error) {
    console.error('Error in searchTvShowsAsync:', error);
    return {error: error.message};
  }
};

export {
  getTrendingTvShowsAsync,
  getTvShowDetailsByIdAsync,
  getTvShowTrailersByIdAsync,
  getSimilarTvShowsByIdAsync,
  getTvShowsByCategoryAsync,
  searchTvShowsAsync,
};
