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

const postLogin = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };

  const loginResult = await fetchData(
    import.meta.env.VITE_AUTH_API + '/auth/login',
    fetchOptions,
  );
  return loginResult;
};

const postRegister = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };

  const registerResult = await fetchData(
    import.meta.env.VITE_AUTH_API + '/users',
    fetchOptions,
  );
  return registerResult;
};

// تصدير الدوال بشكل صحيح
export {useMedia, postLogin, postRegister};
