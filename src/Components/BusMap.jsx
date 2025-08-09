import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import bus from '../assets/bus.jpg'; // Import bus icon

// ✅ Import marker images correctly (ESM-friendly)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// ✅ Apply to Leaflet's default marker settings
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const busIcon = L.icon({
    iconUrl: bus,
    iconSize: [42, 17], // Adjust size as needed
    iconAnchor: [16, 32], // Adjust anchor point
    popupAnchor: [0, -32], // Adjust popup position
})

const BusMap = ({ buses, selectedRoute, onBusClick }) => {
  const campusCenter = [5.6507, -0.1864]; // University of Ghana coordinates

  return (
    <MapContainer center={campusCenter} zoom={16} style={{ height: '256px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {buses.map(bus => (
        <Marker
          key={bus.id}
          position={[bus.lat, bus.lng]}
          icon = {busIcon}
          eventHandlers={{ click: () => onBusClick(bus) }}
        >
          <Popup>
            <div>
              <strong>{bus.route}</strong><br />
              Capacity: {bus.capacity}<br />
              Driver: {bus.driver}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BusMap;
