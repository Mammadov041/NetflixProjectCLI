import {PHONE_LOCALHOST} from '@env';
const authUrl = `http://${PHONE_LOCALHOST}/api/v1/auth`;

const registerUser = async user => {
  try {
    console.log('Sending request to:', `${authUrl}/signup`);
    console.log('Request body:', JSON.stringify(user));

    const response = await fetch(`${authUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user),
    });

    console.log('Raw response:', response);

    const text = await response.text(); // Get raw response text
    console.log('Response text:', text);

    try {
      const data = JSON.parse(text);
      console.log('Parsed JSON:', data);
      return data;
    } catch (jsonError) {
      throw new Error('Failed to parse JSON. Response was not JSON.');
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    return {error: error.message};
  }
};

const loginUser = async user => {
  try {
    const response = await fetch(`${authUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data);

    console.log('login worked');
    return data;
  } catch (error) {
    console.error('Error in loginUser:', error);
    return {error: error.message};
  }
};

const logOutUser = async () => {
  try {
    const response = await fetch(`${authUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }

    return data;
  } catch (error) {
    console.error('Error in logOutUser:', error);
    return {error: error.message};
  }
};

export {registerUser, loginUser, logOutUser};
