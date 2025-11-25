import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // Fetch all media items
        const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
        const mediaItems = await fetchData(mediaUrl);

        // Fetch user info for each media item
        const mediaWithUsers = await Promise.all(
          mediaItems.map(async (item) => {
            const userUrl =
              import.meta.env.VITE_AUTH_API + `/users/${item.user_id}`;
            const userData = await fetchData(userUrl);
            return {...item, username: userData.username};
          }),
        );

        setMediaArray(mediaWithUsers);
      } catch (error) {
        console.error('Error fetching media with user info:', error);
      }
    };

    getMedia();
  }, []);
  return {mediaArray};
};

export const postLogin = async (inputs) => {
  console.log('Posting login with:', inputs);
  return await fetchData(`${import.meta.env.VITE_AUTH_API}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(inputs), // inputs يجب أن يكون {username, password}
  });
};

export const postRegister = async (inputs) => {
  console.log('Posting register with:', inputs); // debug

  return await fetchData(`${import.meta.env.VITE_AUTH_API}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(inputs),
  });
};

export const useAuthentication = () => {
  return {postLogin, postRegister};
};

export const useUser = () => {
  const getUserByToken = async (token) => {
    return await fetchData(`${import.meta.env.VITE_AUTH_API}/users/user`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  };
  return {getUserByToken};
};

export {useMedia};
