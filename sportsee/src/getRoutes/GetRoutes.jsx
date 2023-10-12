import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import Error from '../pages/Error';
import Profil from '../pages/Profil';
import { createContext } from 'react';

export const DatasContext = createContext();

function RoutesProvider() {

  return (
    <DatasContext.Provider value={DatasContext}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Profil" element={<HomePage/>}/>
        <Route path="/Profil/:id" element={<Profil/>} />
        <Route path="/*" element={<Error />}/>
      </Routes>
    </DatasContext.Provider>
  );
}

export default RoutesProvider;
