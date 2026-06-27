import { useState, useEffect, useCallback } from 'react';
import crowdDataService from '../lib/crowd-analysis/services/crowdDataService';
import aiRouteOptimizer from '../lib/crowd-analysis/services/aiRouteOptimizer';
import { getFixedCurrentLocation } from '@/lib/location-config';

export const useCrowdAnalysis = () => {
  const [crowdData, setCrowdData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = crowdDataService.addListener((data) => {
        setCrowdData(data);
        setStatistics(data.statistics);
      });

      // Start the service
      crowdDataService.start();
      setIsActive(true);
    } catch (error) {
      console.error('Error setting up crowd analysis:', error);
      setIsActive(false);
    }

    return () => {
      try {
        if (unsubscribe) {
          unsubscribe();
        }
        crowdDataService.stop();
        setIsActive(false);
      } catch (error) {
        console.error('Error cleaning up crowd analysis:', error);
      }
    };
  }, []);

  const registerUser = useCallback((userId, location, metadata = {}) => {
    try {
      crowdDataService.registerUserLocation(userId, location, metadata);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }, []);

  const removeUser = useCallback((userId) => {
    try {
      crowdDataService.removeUser(userId);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }, []);

  const getCrowdLevelAtLocation = useCallback((lat, lng) => {
    try {
      return crowdDataService.getCrowdLevelAtLocation(lat, lng);
    } catch (error) {
      console.error('Error getting crowd level:', error);
      return { level: 'low', density: 0, userCount: 0 };
    }
  }, []);

  const getCrowdDataInBounds = useCallback((bounds) => {
    try {
      return crowdDataService.getCrowdData(bounds);
    } catch (error) {
      console.error('Error getting crowd data:', error);
      return [];
    }
  }, []);

  const analyzeRoutes = useCallback((routes, userLocation) => {
    try {
      return aiRouteOptimizer.analyzeRoutes(routes, userLocation);
    } catch (error) {
      console.error('Error analyzing routes:', error);
      return null;
    }
  }, []);

  const simulateCrowdData = useCallback(() => {
    try {
      crowdDataService.simulateCrowdData();
    } catch (error) {
      console.error('Error simulating crowd data:', error);
    }
  }, []);

  return {
    crowdData,
    statistics,
    isActive,
    registerUser,
    removeUser,
    getCrowdLevelAtLocation,
    getCrowdDataInBounds,
    analyzeRoutes,
    simulateCrowdData
  };
};

export const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const locationData = getFixedCurrentLocation();
    console.log('Current location (MET Bhujbal Knowledge City):', locationData);
    setLocation(locationData);
    setIsLoading(false);
  }, []);

  const watchLocation = useCallback(() => {
    const locationData = getFixedCurrentLocation();
    setLocation(locationData);

    return () => {};
  }, []);

  return {
    location,
    error,
    isLoading,
    getCurrentLocation,
    watchLocation
  };
};
