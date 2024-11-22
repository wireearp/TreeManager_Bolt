import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN, TUSTIN_COORDINATES, MAP_STYLE, INITIAL_ZOOM } from '../config/mapbox';
import TreeForm from './map/TreeForm';
import MapControls from './map/MapControls';
import { useTrees } from '../hooks/useTrees';

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<mapboxgl.LngLat | null>(null);
  const { trees, loading } = useTrees();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: TUSTIN_COORDINATES,
      zoom: INITIAL_ZOOM
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-right');

    map.current.on('click', (e) => {
      setSelectedLocation(e.lngLat);
      setShowForm(true);
    });

    return () => {
      Object.values(markersRef.current).forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || loading) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for all trees
    trees.forEach(tree => {
      const [lng, lat] = tree.location;
      const el = document.createElement('div');
      el.className = 'w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg cursor-pointer';
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold">${tree.common_name}</h3>
            <p class="text-sm text-gray-600">${tree.tag_number || 'No tag'}</p>
          </div>
        `))
        .addTo(map.current!);

      markersRef.current[tree.id] = marker;
    });
  }, [trees, loading]);

  return (
    <div className="h-screen w-screen relative">
      <div ref={mapContainer} className="h-full w-full" />
      <MapControls onAddTree={() => setShowForm(true)} />
      {showForm && (
        <TreeForm 
          onClose={() => {
            setShowForm(false);
            setSelectedLocation(null);
          }}
          location={selectedLocation}
          onSave={() => {
            setShowForm(false);
            setSelectedLocation(null);
          }}
        />
      )}
    </div>
  );
};

export default MapView;