import React, { createContext, useState } from 'react';
import useCargaMasiva from '../hooks/useCargaMasiva';

const CargaMasivaContext = createContext();

const CargaMasivaProvider = ({ children }) => {
    const {
        handleFileSubmit,
        selectedCatalog,
        setFile,
        handleUpload,
        parseCSV,
        CargaMasivaUpload,
        setLoading,
        loading
    } = useCargaMasiva();

    return (
        <CargaMasivaContext.Provider
            value={{
                handleFileSubmit,
                selectedCatalog,
                setFile,
                handleUpload,
                parseCSV,
                CargaMasivaUpload,
                setLoading,
                loading
            }}
        >
            {children}
        </CargaMasivaContext.Provider>
    );
};

export { CargaMasivaProvider, CargaMasivaContext };
export default CargaMasivaProvider;
