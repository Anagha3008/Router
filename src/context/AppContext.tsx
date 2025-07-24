import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Route, SearchQuery, MapViewState, TripPreferences } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  routes: Route[];
  selectedRoute: Route | null;
  searchQuery: SearchQuery | null;
  mapViewState: MapViewState;
  loading: boolean;
  error: string | null;
  preferences: TripPreferences;
  darkMode: boolean;
  sidebarOpen: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ROUTES'; payload: Route[] }
  | { type: 'SELECT_ROUTE'; payload: Route | null }
  | { type: 'SET_SEARCH_QUERY'; payload: SearchQuery }
  | { type: 'SET_MAP_VIEW'; payload: MapViewState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PREFERENCES'; payload: TripPreferences }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'CLEAR_ROUTES' };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  routes: [],
  selectedRoute: null,
  searchQuery: null,
  mapViewState: {
    longitude: -87.6298,
    latitude: 41.8781,
    zoom: 10,
    pitch: 45,
    bearing: 0
  },
  loading: false,
  error: null,
  preferences: {
    budget: 'medium',
    priority: 'time',
    maxBreaks: 2,
    preferredModes: ['drive_no_tolls', 'flight', 'train'],
    avoidTolls: false,
    accessibilityNeeds: false
  },
  darkMode: false,
  sidebarOpen: true
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };
    case 'SET_ROUTES':
      return {
        ...state,
        routes: action.payload,
        loading: false,
        error: null
      };
    case 'SELECT_ROUTE':
      return {
        ...state,
        selectedRoute: action.payload
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    case 'SET_MAP_VIEW':
      return {
        ...state,
        mapViewState: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: action.payload
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    case 'CLEAR_ROUTES':
      return {
        ...state,
        routes: [],
        selectedRoute: null
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}