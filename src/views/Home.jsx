import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {mediaArray} = useMedia();
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
