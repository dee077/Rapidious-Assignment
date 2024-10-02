import Logo from "../images/Logo.png";

const Header = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center mx-5 shadow-xl text-blue-600 hover:text-blue-500">
      <div className="flex items-center transition-transform transform hover:scale-105">
        <img className="w-32 m-4 rounded-md" src={Logo} alt="Logo" />
        <h1 className="hidden sm:flex text-2xl font-semibold items-center">
            Assignment
        </h1>
      </div>
    </div>
  );
};

export default Header;