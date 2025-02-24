export type PlaceInfo = {
  id: string;
  position: google.maps.LatLng;
  name: string;
  address?: string;
};

export type SelectedPlace = {
  name: string;
  address: string;
  photoUrl?: string;
};
