import React, { createContext, useContext, useReducer } from 'react';

/* Preparing the data layer */
export const DataLayerContext = createContext();

export const DataLayerProvider = ({ reducer, initialState, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
)

/* Hook which allows to pull information from the data layer */
export const useDataLayerValue = () => useContext(DataLayerContext);