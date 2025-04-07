import OliveMarker from "../OliveMarker/OliveMarker";

const OlivesLayer = ({ olives }) => {
  return (
    <>
      {olives.map((o, i) => {
        if (!o.location?.coordinates) return null;

        const [lng, lat] = o.location.coordinates;

        return (
          <OliveMarker
            key={o._id || i}
            lat={lat}
            lng={lng}
            createdAt={o.createdAt}
          />
        );
      })}
    </>
  );
};

export default OlivesLayer;
