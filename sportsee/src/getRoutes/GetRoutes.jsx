import { Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import Profil from '../pages/Profil';


function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/Profil" element={<HomePage/> }/>
      <Route path="/Profil/:id" element={<Profil/>} />
      <Route path="/*" element={<HomePage />}/>
    </Routes>
  );
}

export default RoutesProvider;
