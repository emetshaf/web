import { Link } from "react-router-dom";
import { logo } from "../assets";

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto py-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 w-16 h-16">
            <Link to="/">
              <img src={logo} alt="EMetshaf Logo" />
            </Link>
          </div>
          <div>
            <Link to="/" className="text-lg font-semibold text-gray-900">
              Home
            </Link>
          </div>
        </div>
        <div>
          <Link to="/discover" className="text-gray-900 hover:text-gray-600">
            Discover
          </Link>
        </div>
        <div>
          <Link to="/" className="text-gray-900 hover:text-gray-600">
            Library
          </Link>
        </div>
        <Custome />
      </div>
    </div>
  </header>
);

const Custome = () => {
  return (
    <div className="flex items-center">
      <div>
        <Link to="/signout" className="text-gray-900 hover:text-gray-600">
          Signout
        </Link>
      </div>
    </div>
  );
};

export default Header;
