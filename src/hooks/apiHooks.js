import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

// TODO: add necessary imports
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState;

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
  });
  return {mediaArray};
};

export {useMedia};
