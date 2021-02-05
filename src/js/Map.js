import mapboxgl from 'mapbox-gl';
import { fetchData } from './helperFunctions';
export default class {
  constructor(mapData) {
    this.geojson = mapData;
    this.accessToken =
      'pk.eyJ1Ijoic2Fzc2NyYWZ0ZXIiLCJhIjoiY2trcjViaHliMGV3NjJ3bzY2ejJhaXl5ZSJ9.WAi7tQD9qV_Xj4eDwZWRaQ';
    this.markers = [];
    this.popups = [];
    this.initMap();
    this.setMarkers();
  }

  setGeojson(value) {
    this.geojson = value;
  }

  setCenter(value) {
    this.map.center = value;
  }

  setMarkers() {
    //const [ lat, lng ] = this.geojson.events[0].geometries[0].coordinates;
    //console.log(lat, lng)
    const firstPoint = this.geojson.events[0].geometries[0].coordinates;
    this.map.flyTo({
      center: firstPoint,
      essential: true,
    });
    if (!this.geojson.events) return;
    this.geojson.events.forEach((marker, idx) => {
      // Create Popup
      const popup = new mapboxgl.Popup({offset: 25}).setText(marker.title);
      const [lng, lat] = marker.geometries[0].coordinates;
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `
                <img src="./images/marker.svg">
            `;
      if (lng && lat) {
        this.markers.push(
          new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map)
        );
      }
    });
  }

  clearMarkers() {
    this.markers.forEach((marker) => marker.remove());
  }

  addControlls() {
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');
    const geolocateControll = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    this.map.addControl(geolocateControll);
  }

  initMap() {
    mapboxgl.accessToken = this.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-20, -50],
      zoom: 1,
    });
    this.addControlls();
  }
}
