import {useContext, useEffect} from 'react';
import {UserContext} from '../contexts/UserContext';

const Profile = () => {
  const {user, handleAutoLogin} = useContext(UserContext);

  // Auto login when component mounts
  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-blue-100">
        <p className="text-blue-800 text-lg font-semibold">
          Loading user data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-yellow-50 rounded-lg shadow-lg border-2 border-yellow-300">
      {/* Header */}
      <div className="flex items-center gap-6 bg-blue-100 p-4 rounded-lg border border-blue-300">
        <img
          src={user.avatarUrl || 'https://placehold.co/96'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h1 className="text-3xl font-bold text-blue-900">{user.username}</h1>
          <p className="text-blue-700">{user.email}</p>
        </div>
      </div>

      {/* About Section */}
      <section className="mt-6 bg-green-50 p-4 rounded-lg border border-green-300">
        <h2 className="text-xl font-semibold text-green-800">About</h2>
        <p className="mt-2 text-green-700">
          {user.description || 'No description available.'}
        </p>
      </section>

      {/* Extra Info */}
      <section className="mt-6 bg-purple-50 p-4 rounded-lg border border-purple-300">
        <h2 className="text-lg font-medium text-purple-800">Account Info</h2>
        <ul className="mt-2 text-purple-700 space-y-1">
          <li>
            <span className="font-semibold">Joined:</span>{' '}
            {user.createdAt || 'Unknown'}
          </li>
          <li>
            <span className="font-semibold">Role:</span> {user.role || 'User'}
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;
