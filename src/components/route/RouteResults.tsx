import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiDollarSign, FiNavigation, FiTrendingDown } from 'react-icons/fi';
import { MdDirectionsCar, MdToll } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAppContext } from '../../context/AppContext';

export function RouteResults() {
  const { state, dispatch } = useAppContext();

  if (!state.routes.length) {
    return null;
  }

  const handleSelectRoute = (routeId: string) => {
    const route = state.routes.find(r => r.id === routeId);
    if (route) {
      dispatch({ type: 'SELECT_ROUTE', payload: route });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md space-y-4"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FiNavigation className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Route Options</h2>
      </div>

      {state.routes.map((route, index) => (
        <Card 
          key={route.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            state.selectedRoute?.id === route.id 
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'hover:shadow-md'
          }`}
          onClick={() => handleSelectRoute(route.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {route.id === '1' ? (
                  <div className="flex items-center space-x-1">
                    <MdToll className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-600">Drive (with tolls)</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <MdDirectionsCar className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">Drive (no tolls)</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-1">
                {route.isBudgetFriendly && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                    <FiTrendingDown className="w-3 h-3 mr-1" />
                    Budget
                  </Badge>
                )}
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    route.trafficCondition === 'good' 
                      ? 'text-green-600 border-green-200' 
                      : 'text-orange-600 border-orange-200'
                  }`}
                >
                  {route.trafficCondition === 'good' ? 'Good Traffic' : 'Moderate Traffic'}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-500 mb-1">
                  <FiClock className="w-3 h-3 mr-1" />
                  <span className="text-xs">Time</span>
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {Math.floor(route.totalDuration / 60)}h {route.totalDuration % 60}m
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center text-gray-500 mb-1">
                  <FiMapPin className="w-3 h-3 mr-1" />
                  <span className="text-xs">Distance</span>
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {route.totalDistance.toFixed(2)} miles
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center text-gray-500 mb-1">
                  <FiDollarSign className="w-3 h-3 mr-1" />
                  <span className="text-xs">Approx. Gas Cost</span>
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  ${route.totalCost.toFixed(2)}
                </div>
              </div>
            </div>

            <Button
              variant={state.selectedRoute?.id === route.id ? "default" : "outline"}
              className={`w-full ${
                state.selectedRoute?.id === route.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                  : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectRoute(route.id);
              }}
            >
              {state.selectedRoute?.id === route.id ? 'Selected Route' : 'Select Route'}
            </Button>
          </CardContent>
        </Card>
      ))}

      {state.selectedRoute && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
            <CardContent className="pt-4">
              <div className="text-center">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Route Selected!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View detailed directions and alternative stops on the map
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}