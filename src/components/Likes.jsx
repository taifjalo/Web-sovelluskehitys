import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {useLike} from '../hooks/apiHooks';

const Likes = ({mediaId}) => {
  const {user} = useUserContext();
  const {
    getLikeCountByMediaId,
    getLikeByUser,
    getLikeByMedia,
    postLike,
    deleteLike,
  } = useLike();

  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const countRes = await getLikeCountByMediaId(mediaId);
        setLikeCount(countRes?.count || 0);

        if (user) {
          const userLikes = await getLikeByUser(user.id);
          const existingLike =
            Array.isArray(userLikes) &&
            userLikes.find((like) => like.media_id === mediaId);
          setUserLike(existingLike || null);
        }
      } catch (err) {
        console.error('Error fetching likes:', err);
      }
    };

    fetchLikes();
  }, [mediaId, user]);

  const handleLike = async () => {
    if (!user) return;

    try {
      if (userLike) {
        const res = await deleteLike(userLike.like_id);
        if (res) {
          setUserLike(null);
          setLikeCount((prev) => Math.max(prev - 1, 0));
        }
      } else {
        const res = await postLike(mediaId);
        if (res) {
          setUserLike(res);
          setLikeCount((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.error('Error updating like:', err);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        disabled={!user}
        onClick={handleLike}
        className={`px-3 py-1 rounded text-white ${
          userLike ? 'bg-red-600' : 'bg-gray-600'
        } disabled:bg-gray-400`}
      >
        {userLike ? '❤️ Liked' : '🤍 Like'}
      </button>

      <span className="text-gray-700 font-semibold">{likeCount} likes</span>
    </div>
  );
};

Likes.propTypes = {
  mediaId: PropTypes.number.isRequired,
};

export default Likes;
