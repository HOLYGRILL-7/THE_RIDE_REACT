import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BusMap from "./BusMap";
import {
  MapPin,
  Navigation2,  
  Clock,
  Users,
  Navigation,
  Phone,
  AlertCircle,
  Menu,
  Bell,
  User,
  Settings,
  RefreshCw,
} from "lucide-react";

 

const StudentInterface = () => {
  const [currentView, setCurrentView] = useState("home"); //navigation state
  const [selectedRoute, setselectedRoute] = useState(null);
  const [driverStatus, setDriverstatus] = useState("offline"); //driver 
  // status
  const [selectedBus, setSelectedBus] = useState(null); //state to hold selected bus
  const location = useLocation();
  const fullName = location.state?.fullName || "";


  const initials = fullName
    ? `${fullName.split(" ")[0][0].toUpperCase()}${fullName
        .split(" ")[1][0]
        .toUpperCase()}`
    : "";

      const handleRouteSelect = (route) => {
    setselectedRoute(selectedRoute?.id === route.id ? null : route);
  };

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
    // Auto-select the route for this bus
    const matchingRoute = routes.find(r => r.name === bus.route);
    setselectedRoute(matchingRoute);
  };

  const routes = [
    {

      id: 1,
      route: "Commercial Area to KSB",
      color: "bg-blue-500",
      nextArrival: "5 min",
      capacity: "12/30",
    },
    {
      id: 2,
      route: "KSB to Brunei",
      color: "bg-green-500",
      nextArrival: "10 min",
      capacity: "15/30",
    },
    {
      id: 3,
      route: "Commercial Area to Main Library",
      color: "bg-red-500",
      nextArrival: "2 min",
      capacity: "20/30",
    },
    {
      id: 4,
      route: "Main Library to KSB",
      color: "bg-yellow-500",
      nextArrival: "8 min",
      capacity: "25/30",
    },
  ]; //array to hold routes

  const nearbyStops = [
    {
      id: 1,
      name: "Commercial Area",
      distance: "2 min walk",
      nextBus: "5 min",
    },
    { id: 2, name: "KSB", distance: "5 min walk", nextBus: "5 min" },
    { id: 3, name: "Brunei", distance: "3 min walk", nextBus: "5 min" },
    { id: 4, name: "Main Library", distance: "4 min walk", nextBus: "5 min" },
  ]; //array to hold nearby stops

    const buses = [
    {
      id: 1,
      route: "Main Library to KSB",
      color: "bg-blue-500",
      nextArrival: "3 min",
      capacity: "12/30",
      driver: "Kwame A.",
      speed: "25 km/h",
      lat: 5.6501,
      lng: -0.1861
    },
    {
      id: 2,
      route: "Commercial to Brunei", 
      color: "bg-green-500",
      nextArrival: "7 min",
      capacity: "18/30",
      driver: "Ama K.",
      speed: "30 km/h",
      lat: 5.6528,
      lng: -0.1844
    },
    {
      id: 3,
      route: "Library to Commercial",
      color: "bg-red-500", 
      nextArrival: "2 min",
      capacity: "25/30",
      driver: "Kofi M.",
      speed: "20 km/h",
      lat: 5.6477,
      lng: -0.1884
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* header */}
      <div className="navarea bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">PJ</span> 
            {/* // supposed to show initials so put {initals} here */}
          </div>
          <div>
            <h1 className="font-bold text-lg">THE RIDE</h1>
            <p className="text-sm text-gray-500">Good morining, Bismark!</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-gray-600" />
          <User className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* Quick Status */}
      <div className="px-4 py-3 bg-blue-50 border-b">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800">Near Main Library</span>
        </div>
      </div>

      {/* live Map Placeholder */}
       <div className="mx-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold">Live Bus Tracking</h2>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-200 rounded">
              <Navigation2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <BusMap 
          buses={buses}
          selectedRoute={selectedRoute}
          onBusClick={handleBusClick}
        />
      </div>

      {/* Selected Bus Info */}
      {selectedBus && (
        <div className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">Bus Details</h3>
            <button 
              onClick={() => setSelectedBus(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Route</p>
              <p className="font-medium">{selectedBus.route}</p>
            </div>
            <div>
              <p className="text-gray-500">Driver</p>
              <p className="font-medium">{selectedBus.driver}</p>
            </div>
            <div>
              <p className="text-gray-500">Capacity</p>
              <p className="font-medium">{selectedBus.capacity}</p>
            </div>
            <div>
              <p className="text-gray-500">Speed</p>
              <p className="font-medium">{selectedBus.speed}</p>
            </div>
          </div>
          <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Book This Bus
          </button>
        </div>
      )}

      {/* Route Cards */}
      <div className="px-4 py-3 mt-6">
        <h2 className="text-lg font-bold mb-3">Available Buses</h2>
        <div className="space-y-3">
          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => setselectedRoute(route)}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${route.color}`}></div>
                </div>
                <div>
                  <h3 className="font-semibold">{route.name}</h3>
                    <p className="text-sm text-center text-gray-500">{route.route}</p>

                  <p className="text-sm text-gray-500 text-center">                   Next arrival: {route.nextArrival}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{route.capacity}</p>
                  <p className="text-xs text-gray-500">Capacity</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Stops */}
      <div className="px-4 mt-6 pb-20">
        <h2 className="text-lg font-bold mb-3">Nearby Stops</h2>
        <div className="space-y-2">
          {nearbyStops.map((stop, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div className="">
                  <h4 className="font-medium">{stop.name}</h4>
                  <p className="text-sm text-gray-500">{stop.distance}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-blue-600">
                    {stop.nextBus}
                  </p>
                  <p className="text-xs text-gray-500">Next bus</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentInterface;
