import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { RouteSearchForm } from '../components/route/RouteSearchForm';
import { RouteResults } from '../components/route/RouteResults';
import { MapView } from '../components/map/MapView';
import { useAppContext } from '../context/AppContext';

export function DashboardPage() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-4rem)]">
        <div className="flex gap-6 h-full">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              width: state.sidebarOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            className={`${
              state.sidebarOpen ? 'flex' : 'hidden lg:flex'
            } flex-col space-y-6 w-full max-w-md overflow-hidden`}
          >
            <RouteSearchForm />
            <RouteResults />
          </motion.div>

          {/* Main Content - Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <MapView />
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
                 onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
    </div>
  );
}