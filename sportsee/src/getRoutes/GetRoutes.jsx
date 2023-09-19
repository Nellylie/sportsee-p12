import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import Error from '../pages/Error';
import Profil from '../pages/Profil';

function GetRoutes(){

  return (
    <Routes>
      <Route path="/" element= {<HomePage/>}/>
      <Route path="/*" element={<Error/>}/>
      <Route path="/Profil" element={<Profil/>}/>
    </Routes>
  );
}

export default GetRoutes;