import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

// ---- Media Hooks ----
export const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
        const mediaItems = await fetchData(mediaUrl);

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

// ---- Authentication ----
export const postLogin = async (inputs) => {
  return await fetchData(`${import.meta.env.VITE_AUTH_API}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(inputs),
  });
};

export const postRegister = async (inputs) => {
  return await fetchData(`${import.meta.env.VITE_AUTH_API}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(inputs),
  });
};

export const useAuthentication = () => ({postLogin, postRegister});

// ---- User ----
export const useUser = () => {
  const getUserByToken = async (token) => {
    return await fetchData(`${import.meta.env.VITE_AUTH_API}/users/user`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  };
  return {getUserByToken};
};

// ---- File Upload ----
export const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    formData.append('file', file, sanitizedFilename);

    const fileData = await fetchData(
      `${import.meta.env.VITE_UPLOAD_SERVER}/upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    return fileData;
  };

  return {postFile};
};

// ---- Media Metadata ----
export const postMedia = async (fileData, inputs, token) => {
  const mediaPayload = {
    title: inputs.title,
    description: inputs.description,
    filename: fileData.filename.replace(/[^a-zA-Z0-9.-]/g, '_'),
    media_type: fileData.media_type,
    filesize: Number(fileData.filesize),
  };

  const response = await fetch(`${import.meta.env.VITE_MEDIA_API}/media`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mediaPayload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error('MEDIA API ERROR:', error);
    throw new Error('Media metadata upload failed');
  }

  return await response.json();
};

export const deleteMedia = async (id, token) => {
  try {
    const response = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to delete media');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching media with user info:', error);
  }
};

export const modifyMedia = async (id, newData, token) => {
  try {
    const response = await fetchData(
      `${import.meta.env.VITE_MEDIA_API}/media/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to Update media');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching media with user info:', error);
  }
};
