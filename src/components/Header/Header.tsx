import Weather from "../WeatherComponent/Weather";

const Header: React.FC = () => {
  return (
    <header className=" flex flex-row items-center min-w-full min-h-14 justify-between bg-white px-5 shadow-md">
      <a href="/" className=" font-bold">
        Farm App
      </a>
      <Weather />
    </header>
  );
};

export default Header;
