import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Flood Detector</h1>
        <div>
          <Link to="/" className="mx-4">Home</Link>
          <Link to="/dashboard" className="mx-4">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
