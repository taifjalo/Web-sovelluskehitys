import {fetchData} from '../utils/fetchData';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useEffect, useState} from 'react';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
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

  console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>

      {/* Conditional rendering */}
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
