import { Link } from "react-router-dom";
import { logo } from "../assets";

const Footer = () => (
  <footer className="bg-white shadow-md">
    <div className="container mx-auto py-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 w-16 h-16">
            <img src={logo} alt="EMetshaf Logo" />
          </div>
          <div>
            <p className="text-gray-500">© 2021 EMetshaf</p>
          </div>
        </div>
        <div>
          <Link to="/about" className="text-gray-900 hover:text-gray-600">
            About
          </Link>
        </div>
        <div>
          <Link to="/contact" className="text-gray-900 hover:text-gray-600">
            Contact
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
