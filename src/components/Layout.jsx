import {useEffect} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  // Auto login when page loads
  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <nav className="p-4 bg-white shadow">
        <ul className="flex items-center list-none m-0 p-0 space-x-4">
          <li className="group">
            <Link
              to="/"
              className="text-gray-800 px-2 py-1 hover:text-teal-400"
            >
              Home
            </Link>
          </li>

          {user && (
            <>
              <li className="group">
                <Link
                  to="/profile"
                  className="text-gray-800 px-2 py-1 hover:text-teal-400"
                >
                  Profile
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/upload"
                  className="text-gray-800 px-2 py-1 hover:text-teal-400"
                >
                  Upload
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/logout"
                  className="text-gray-800 px-2 py-1 hover:text-teal-400"
                >
                  Logout
                </Link>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="group">
                <Link
                  to="/login"
                  className="text-gray-800 px-2 py-1 hover:text-teal-400"
                >
                  Login
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/register"
                  className="text-gray-800 px-2 py-1 hover:text-teal-400"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
