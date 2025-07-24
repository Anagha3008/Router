import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiTarget, FiCalendar, FiUsers, FiSearch, FiSettings } from 'react-icons/fi';
import { MdDirectionsCar, MdFlight, MdTrain, MdDirectionsBus } from 'react-icons/md';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { useAppContext } from '../../context/AppContext';
import { TransportMode } from '../../types';

export function RouteSearchForm() {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    passengers: 1,
    breaks: 2
  });
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>(['drive_no_tolls']);
  const [avoidTolls, setAvoidTolls] = useState(false);
  const [budgetPriority, setBudgetPriority] = useState(false);

  const transportModes = [
    { id: 'drive_no_tolls', label: 'Drive (no tolls)', icon: MdDirectionsCar, color: 'bg-green-500' },
    { id: 'drive_with_tolls', label: 'Drive (with tolls)', icon: MdDirectionsCar, color: 'bg-red-500' },
    { id: 'flight', label: 'Flight', icon: MdFlight, color: 'bg-blue-500' },
    { id: 'train', label: 'Train', icon: MdTrain, color: 'bg-purple-500' },
    { id: 'metro', label: 'Metro', icon: MdDirectionsBus, color: 'bg-orange-500' },
    { id: 'cta', label: 'CTA', icon: MdDirectionsBus, color: 'bg-cyan-500' },
    { id: 'metra', label: 'Metra', icon: MdTrain, color: 'bg-indigo-500' },
  ];

  const handleModeToggle = (mode: TransportMode) => {
    setSelectedModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };

  const handleSearch = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    const searchQuery = {
      from: formData.from,
      to: formData.to,
      departureDate: formData.departureDate ? new Date(formData.departureDate) : undefined,
      passengers: formData.passengers,
      preferences: {
        budget: budgetPriority ? 'low' : 'medium',
        priority: budgetPriority ? 'cost' : 'time',
        maxBreaks: formData.breaks,
        preferredModes: selectedModes,
        avoidTolls,
        accessibilityNeeds: false
      }
    };

    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });

    // Simulate route search
    setTimeout(() => {
      const mockRoutes = [
        {
          id: '1',
          segments: [],
          totalDuration: 819,
          totalDistance: 792.24,
          totalCost: 113.07,
          isBudgetFriendly: false,
          trafficCondition: 'good' as const
        },
        {
          id: '2',
          segments: [],
          totalDuration: 904.8,
          totalDistance: 819.48,
          totalCost: 116.96,
          isBudgetFriendly: true,
          trafficCondition: 'good' as const
        }
      ];
      
      dispatch({ type: 'SET_ROUTES', payload: mockRoutes });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-0 shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <FiMapPin className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Router
            </CardTitle>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Optimize your routes for cost, gas, and time
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Transport Mode Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Choose transport modes</Label>
            <div className="grid grid-cols-2 gap-2">
              {transportModes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = selectedModes.includes(mode.id as TransportMode);
                
                return (
                  <Badge
                    key={mode.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer p-2 h-auto justify-start ${
                      isSelected ? mode.color + ' text-white' : ''
                    }`}
                    onClick={() => handleModeToggle(mode.id as TransportMode)}
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    <span className="text-xs">{mode.label}</span>
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Location Inputs */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="from" className="text-sm font-medium">Starting Point</Label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="from"
                  placeholder="Enter starting location"
                  value={formData.from}
                  onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="to" className="text-sm font-medium">Destination</Label>
              <div className="relative">
                <FiTarget className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="to"
                  placeholder="Enter destination"
                  value={formData.to}
                  onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Trip Options */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">
                How many breaks do you want to take during the trip?
              </Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, breaks: Math.max(0, prev.breaks - 1) }))}
                  disabled={formData.breaks <= 0}
                >
                  -
                </Button>
                <span className="w-8 text-center font-medium">{formData.breaks}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, breaks: prev.breaks + 1 }))}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Budget Priority</Label>
              <Switch
                checked={budgetPriority}
                onCheckedChange={setBudgetPriority}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Avoid Tolls</Label>
              <Switch
                checked={avoidTolls}
                onCheckedChange={setAvoidTolls}
              />
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={!formData.from || !formData.to || state.loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3"
          >
            {state.loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Finding Routes
              </div>
            ) : (
              <div className="flex items-center">
                <FiSearch className="w-4 h-4 mr-2" />
                Find Routes
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}