import Map from "../components/Map";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-4">Live Sensor Data</h1>
      <Map />
    </div>
  );
};

export default Home;
