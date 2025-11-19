import MediaRow from './MediaRow';

const mediaArray = [
  {
    media_id: 8,
    user_id: 5,
    filename: '...',
    thumbnail: '...',
    filesize: 170469,
    media_type: 'image/jpeg',
    title: 'Picture 1',
    description: 'This is a placeholder picture.',
    created_at: '2024-01-07T20:49:34.000Z',
  },
  {
    media_id: 9,
    user_id: 7,
    filename: '...',
    thumbnail: '...',
    filesize: 1002912,
    media_type: 'image/jpeg',
    title: 'Pic 2',
    description: '',
    created_at: '2024-01-07T21:32:27.000Z',
  },
  {
    media_id: 17,
    user_id: 2,
    filename: '...',
    thumbnail: '...',
    filesize: 1236616,
    media_type: 'video/mp4',
    title: 'Bunny',
    description: 'Butterflies fly around the bunny.',
    created_at: '2024-01-07T20:48:13.000Z',
  },
];

const Home = () => {
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created</th>
          <th>Size</th>
          <th>Type</th>
        </thead>
        <tbody>

          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}

        </tbody>
      </table>
    </>
  );
};

export default Home;
