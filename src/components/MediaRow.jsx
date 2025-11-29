import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {deleteMedia, modifyMedia} from '../hooks/apiHooks';

const MediaRow = ({item, setSelectedItem}) => {
  console.log(MediaRow);
  const {user} = useUserContext();
  const navigate = useNavigate();

  const canEdit = user && (user.isAdmin || user.id === item.user_id);

  const handleDelete = async (item, token) => {
    try {
      await deleteMedia(item._id, token);
      navigate(0);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleUpdate = async (item, updatedData, token) => {
    try {
      await modifyMedia(item._id, updatedData, token);
      navigate();
    } catch (e) {
      console.error(e.message);
    }
    setSelectedItem(item);
  };

  return (
    <tr className="border-b border-b-sky-950 ">
      <td className="px-2 py-1">{item.username}</td>
      <td className="px-2 py-1">
        <img
          className="w-20 h-20 object-cover rounded"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>
      <td className="px-2 py-1">{item.title}</td>
      <td className="px-2 py-1">{item.description}</td>
      <td className="px-2 py-1">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="px-2 py-1">{item.filesize}</td>
      <td className="px-2 py-1">{item.media_type}</td>
      <td className="px-2 py-1 flex gap-8">
        <Link
          to="/single"
          state={{item}}
          className="px-2 py-1 bg-sky-950 text-white rounded hover:bg-sky-900"
        >
          Show
        </Link>
        {canEdit && (
          <>
            <button
              onClick={handleUpdate}
              className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Modify
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
