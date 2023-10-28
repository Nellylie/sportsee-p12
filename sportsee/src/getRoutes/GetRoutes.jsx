import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import Error from '../pages/Error';
import Profil from '../pages/Profil';


function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/Profil" element={<HomePage/> }/>
      <Route path="/Profil/:id" element={<Profil/>} />
      <Route path="/*" element={<Error />}/>
    </Routes>
  );
}

export default RoutesProvider;
