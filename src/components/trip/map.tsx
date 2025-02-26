"use client";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import { PlaceInfo, SelectedPlace } from "@/types/place";
import PlaceModal from "./place-modal";
import { Day } from "@/types/trip";

const libraries: "places"[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

type props = {
  days: Day[];
  setDays: (value: Day[]) => void;
};

const Map = ({ days, setDays }: props) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

    setSelectedPlace(null);

    if (newMarkers.length > 0 && mapRef.current) {
      mapRef.current.panTo(newMarkers[0].position);
      mapRef.current.setZoom(14);
    }
  };

  const fetchPlaceDetails = (placeId: string) => {
    if (!mapRef.current) {
      console.log("OOPS");
      return;
    }
    const service = new window.google.maps.places.PlacesService(mapRef.current);

    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace({
          name: place?.name!,
          address: place?.formatted_address || "N/A",
        });
      }
    });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLE_MAPS_API || ""}
      libraries={libraries}
    >
      <div className="relative w-1/2">
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

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(googlemap) => {
            mapRef.current = googlemap;
            google.maps.event.addListener(
              googlemap,
              "click",
              (event: google.maps.MapMouseEvent & { placeId?: string }) => {
                const clickedPlaceId = event.placeId;
                if (clickedPlaceId) {
                  fetchPlaceDetails(clickedPlaceId);
                }
              }
            );

            googlemap.setOptions({
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "on" }],
                },
              ],
            });
          }}
        >
          {selectedPlace && (
            <PlaceModal
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              days={days}
              setDays={setDays}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
