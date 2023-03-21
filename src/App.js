import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/requireAuth";
import LogoutPage from "./pages/LogoutPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
    
        <Routes>
          <Route path='/' index element={
            <RequireAuth>
              <PatientsPage/>
            </RequireAuth>
          }/>
          <Route path='/doctors' element = {
            <RequireAuth>
              <DoctorsPage/>
            </RequireAuth>
          }/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/logout' element = {<LogoutPage/>}/>
          <Route path="*" element={<PatientsPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
