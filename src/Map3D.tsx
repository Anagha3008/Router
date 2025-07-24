// IMPORTANT: Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token for the 3D map to display.
// You can get a free token at https://account.mapbox.com/
import React, { useRef, useEffect } from 'react';
// @ts-ignore
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

const Map3D: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-87.6298, 41.8781], // Chicago
      zoom: 10,
      pitch: 60,
      bearing: -60,
      antialias: true,
    });
    mapRef.current.on('load', () => {
      mapRef.current.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
      });
    });
    return () => mapRef.current && mapRef.current.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-64 rounded-lg border-2 border-blue-500"
    />
  );
};

export default Map3D;