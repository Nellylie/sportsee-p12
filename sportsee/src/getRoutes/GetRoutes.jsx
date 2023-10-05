import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import Error from '../pages/Error';
import Profil from '../pages/Profil';
import { createContext, useState } from 'react';

export const StatutApiContext = createContext();

function RoutesProvider() {
  const [apiStatut, setApiStatut] = useState(false);
  const statutApiModifiable = (value) => { setApiStatut(value); };

  return (
    <StatutApiContext.Provider value={{ apiStatut, statutApiModifiable }}>
      <Routes>
        <Route path="/" element={<HomePage apiStatut={apiStatut} statutApiModifiable={statutApiModifiable} />} />
        <Route path="/Profil" element={<Profil apiStatut={apiStatut} />} />
        <Route path="/Profil/:id" element={<Profil apiStatut={apiStatut} />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </StatutApiContext.Provider>
  );
}

export default RoutesProvider;
