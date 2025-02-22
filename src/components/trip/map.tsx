"use client";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import { PlaceInfo, SelectedPlace } from "@/types/place";

const libraries: "places"[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude (San Francisco)
};

const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<PlaceInfo[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle place search
  const handlePlaceSearch = () => {
    if (!searchBoxRef.current) return;
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const newMarkers: PlaceInfo[] = places.map((place) => ({
      id: place.place_id!,
      position: place.geometry!.location!,
      name: place.name!,
      address: place.formatted_address || "",
    }));

    setMarkers(newMarkers);
    setSelectedPlace(null);

    if (newMarkers.length > 0 && map) {
      map.panTo(newMarkers[0].position);
      map.setZoom(14);
    }
  };

  // Fetch place details when clicking a marker
  const fetchPlaceDetails = (placeId: string) => {
    if (!map) return;
    const service = new window.google.maps.places.PlacesService(map);

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace({
          name: place?.name!,
          address: place?.formatted_address || "N/A",
          phone: place?.formatted_phone_number || "N/A",
          rating: place?.rating || "N/A",
          website: place?.website || "N/A",
          position: place?.geometry!.location!,
        });
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || ""}
      libraries={libraries}
    >
      <div className="relative w-full">
        {/* Search Box - Positioned at the top */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={handlePlaceSearch}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for a place"
              className="w-96 p-3 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            />
          </StandaloneSearchBox>
        </div>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => setMap(map)}
        >
          {/* Markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => fetchPlaceDetails(marker.id)}
            />
          ))}

          {/* Info Window for selected place */}
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.position}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="p-3 bg-white rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{selectedPlace.name}</h3>
                <p className="text-sm text-gray-700">
                  <strong>Address:</strong> {selectedPlace.address}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Phone:</strong> {selectedPlace.phone}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Rating:</strong> {selectedPlace.rating}
                </p>
                {selectedPlace.website && (
                  <p className="text-sm">
                    <strong>Website:</strong>{" "}
                    <a
                      href={selectedPlace.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {selectedPlace.website}
                    </a>
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
