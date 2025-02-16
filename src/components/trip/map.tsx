import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude (San Francisco)
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
    </LoadScript>
  );
};

export default Map;
