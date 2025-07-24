import React, { useState } from 'react';
import Map3D from './Map3D';

const transportModes = [
  { key: 'no-tolls', label: 'Drive (no tolls)', color: 'green', icon: '🛣️' },
  { key: 'tolls', label: 'Drive (with tolls)', color: 'red', icon: '⚡' },
  { key: 'cta', label: 'CTA', color: 'blue', icon: '🚇' },
  { key: 'train', label: 'Train', color: 'yellow', icon: '🚆' },
  { key: 'metra', label: 'Metra', color: 'purple', icon: '🚉' },
  { key: 'metro', label: 'Metro', color: 'pink', icon: '🚊' },
  { key: 'flight', label: 'Flight', color: 'sky', icon: '✈️' },
];

const sampleRoutes = [
  {
    mode: 'tolls',
    label: 'Drive (with tolls)',
    icon: '⚡',
    color: 'red',
    time: 819,
    distance: 792.24,
    cost: 113.07,
    eco: 3,
    badge: 'fastest',
  },
  {
    mode: 'no-tolls',
    label: 'Drive (no tolls)',
    icon: '🛣️',
    color: 'green',
    time: 904.8,
    distance: 819.48,
    cost: 116.96,
    eco: 4,
    badge: '',
  },
  {
    mode: 'cta',
    label: 'CTA (Blue Line)',
    icon: '🚇',
    color: 'blue',
    time: 55,
    distance: 18.2,
    cost: 2.5,
    eco: 1,
    badge: 'eco',
    agency: 'Chicago Transit Authority',
    line: 'Blue Line',
  },
  {
    mode: 'train',
    label: 'Amtrak Cardinal',
    icon: '🚆',
    color: 'yellow',
    time: 600,
    distance: 800,
    cost: 95,
    eco: 2,
    badge: '',
    agency: 'Amtrak',
    line: 'Cardinal',
  },
  {
    mode: 'metra',
    label: 'Metra UP-North',
    icon: '🚉',
    color: 'purple',
    time: 75,
    distance: 30,
    cost: 7,
    eco: 2,
    badge: '',
    agency: 'Metra',
    line: 'UP-North',
  },
  {
    mode: 'metro',
    label: 'DC Metro Red Line',
    icon: '🚊',
    color: 'pink',
    time: 40,
    distance: 15,
    cost: 3,
    eco: 1,
    badge: '',
    agency: 'WMATA',
    line: 'Red Line',
  },
  {
    mode: 'flight',
    label: 'United Airlines UA1234',
    icon: '✈️',
    color: 'sky',
    time: 165,
    distance: 800,
    cost: 180,
    eco: 5,
    badge: 'cheapest',
    airline: 'United Airlines',
    stops: 'Non-stop',
  },
];

const badgeMap: Record<string, string> = {
  cheapest: '💸 Cheapest',
  fastest: '⚡ Fastest',
  eco: '🌱 Eco-friendly',
};

const badgeColor: Record<string, string> = {
  cheapest: 'bg-blue-500',
  fastest: 'bg-red-500',
  eco: 'bg-green-500',
};

function App() {
  const [selectedModes, setSelectedModes] = useState<string[]>(['no-tolls']);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [breaks, setBreaks] = useState(0);
  const [budgetFilter, setBudgetFilter] = useState<'cheapest' | 'fastest' | 'eco'>('cheapest');

  // Filter and sort routes based on selected modes and budget filter
  const filteredRoutes = sampleRoutes
    .filter((r) => selectedModes.includes(r.mode))
    .sort((a, b) => {
      if (budgetFilter === 'cheapest') return a.cost - b.cost;
      if (budgetFilter === 'fastest') return a.time - b.time;
      if (budgetFilter === 'eco') return a.eco - b.eco;
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-gray-800 pb-16">
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mt-10">
        Smart Route Planning
      </h1>
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <span className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white">🧭</span>
          Router
        </h2>
        <p className="text-gray-400 mb-4">Optimize your routes for cost, gas, and time</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {transportModes.map((mode) => (
            <span
              key={mode.key}
              className={`px-3 py-1 rounded-full cursor-pointer border-2 border-${mode.color}-500 ${selectedModes.includes(mode.key) ? `bg-${mode.color}-500 text-white` : 'bg-gray-700 text-gray-300'}`}
              onClick={() => {
                setSelectedModes((prev) =>
                  prev.includes(mode.key)
                    ? prev.filter((m) => m !== mode.key)
                    : [...prev, mode.key]
                );
              }}
            >
              {mode.icon} {mode.label}
            </span>
          ))}
        </div>
        <div className="mb-2">
          <label className="block text-gray-300 mb-1">Starting Point</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            placeholder="Enter starting location"
            value={start}
            onChange={e => setStart(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-300 mb-1">Destination</label>
          <input
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            placeholder="Enter destination"
            value={end}
            onChange={e => setEnd(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">How many breaks do you want to take during the trip?</label>
          <div className="flex items-center">
            <button
              className="bg-gray-600 px-2 py-1 rounded text-white"
              onClick={() => setBreaks(b => Math.max(0, b - 1))}
            >-</button>
            <span className="mx-3">{breaks}</span>
            <button
              className="bg-gray-600 px-2 py-1 rounded text-white"
              onClick={() => setBreaks(b => b + 1)}
            >+</button>
          </div>
        </div>
        <button className="w-full py-2 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg mt-2">
          Find Routes
        </button>
      </div>
      {/* Budget Filter Bar */}
      <div className="flex gap-2 mb-4 mt-10">
        {['cheapest', 'fastest', 'eco'].map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-full ${budgetFilter === type ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setBudgetFilter(type as any)}
          >
            {type === 'cheapest' && '💸 Cheapest'}
            {type === 'fastest' && '⚡ Fastest'}
            {type === 'eco' && '🌱 Eco-friendly'}
          </button>
        ))}
      </div>
      {/* Route Options and Map */}
      <div className="flex flex-col md:flex-row gap-8 mt-2 w-full max-w-5xl">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4 text-white">Route Options</h3>
          {filteredRoutes.map((route, idx) => (
            <div
              key={route.mode}
              className={`bg-gray-800 rounded-lg p-4 mb-4 border-2 border-${route.color}-500 relative`}
            >
              <div className="flex items-center mb-2">
                <span className={`bg-${route.color}-500 rounded-full w-6 h-6 flex items-center justify-center text-white mr-2`}>{route.icon}</span>
                <span className={`font-bold text-${route.color}-400`}>{route.label}</span>
                {route.badge && (
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold text-white ${badgeColor[route.badge]}`}>{badgeMap[route.badge]}</span>
                )}
              </div>
              {route.mode === 'flight' ? (
                <>
                  <div className="text-gray-300">Airline: {route.airline}</div>
                  <div className="text-gray-300">Flight Number: UA1234</div>
                  <div className="text-gray-300">Time: 2h 45m</div>
                  <div className="text-gray-300">Stops: {route.stops}</div>
                  <div className="text-gray-300">Approx. Cost: ${route.cost.toFixed(2)}</div>
                </>
              ) : route.mode === 'cta' || route.mode === 'train' || route.mode === 'metra' || route.mode === 'metro' ? (
                <>
                  <div className="text-gray-300">Agency: {route.agency}</div>
                  <div className="text-gray-300">Line: {route.line}</div>
                  <div className="text-gray-300">Time: {route.time} min</div>
                  <div className="text-gray-300">Distance: {route.distance} miles</div>
                  <div className="text-gray-300">Approx. Cost: ${route.cost.toFixed(2)}</div>
                </>
              ) : (
                <>
                  <div className="text-gray-300">Time: {route.time} min</div>
                  <div className="text-gray-300">Distance: {route.distance} miles</div>
                  <div className="text-gray-300">Approx. Gas Cost: ${route.cost.toFixed(2)}</div>
                </>
              )}
              <button className="w-full mt-2 py-1 rounded bg-gradient-to-r from-green-400 to-blue-500 text-white">Select Route</button>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4 text-white">Route Maps (3D)</h3>
          <Map3D />
        </div>
      </div>
    </div>
  );
}

export default App;