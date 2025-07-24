import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiLayers, FiNavigation2, FiMaximize2 } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAppContext } from '../../context/AppContext';

// Mock 3D Map Component (since mapbox-gl requires API key)
function MockMap() {
  const { state } = useAppContext();
  
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 rounded-lg overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 300">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Roads */}
          <path d="M50 150 Q200 100 350 150" stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          <path d="M50 180 Q200 220 350 180" stroke="#EF4444" strokeWidth="3" fill="none" />
          
          {/* Cities */}
          <circle cx="60" cy="160" r="8" fill="#3B82F6" />
          <circle cx="340" cy="165" r="8" fill="#10B981" />
          
          {/* Labels */}
          <text x="70" y="165" className="text-xs fill-current">Chicago</text>
          <text x="280" y="170" className="text-xs fill-current">Texas</text>
        </svg>
      </div>

      {/* 3D Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      
      {/* Route Indicators */}
      {state.selectedRoute && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
              <FiNavigation2 className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              Route Visualized
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Math.floor(state.selectedRoute.totalDuration / 60)}h {state.selectedRoute.totalDuration % 60}m • {state.selectedRoute.totalDistance.toFixed(0)} miles
            </p>
          </div>
        </motion.div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <FiLayers className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur-sm">
          <FiMaximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">No Tolls</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">With Tolls</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MapView() {
  const { state } = useAppContext();
  const [view3D, setView3D] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex-1 h-full"
    >
      <Card className="h-full border-0 shadow-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <FiMap className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Route Maps
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              3D View
            </Badge>
            <Button
              size="sm"
              variant={view3D ? "default" : "outline"}
              onClick={() => setView3D(!view3D)}
            >
              3D
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 h-[calc(100%-5rem)]">
          <MockMap />
        </CardContent>
      </Card>
    </motion.div>
  );
}