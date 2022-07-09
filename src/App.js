import EmpLogin from "./components/Employee/SignIn";
import EmpRegister from "./components/Employee/SignUp";
// import HRLogin from "./components/HR/SignIn";
// import HRRegister from "./components/HR/SignUp";
import EmployeeDashboard from "./components/Employee/Dashboard";
// import HRDashboard from "./components/HR/Dashboard";
import AdminDashboard from "./components/Manager/Dashboard";
import LoginAdmin from './components/Manager/SignIn';
// import Logout from "./components/Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "600px",
                }}
              >
                <a href="/LoginEmployee">
                  <Button variant="contained" size="large">
                    Employee
                  </Button>
                </a>
                <a href="/SuperAdmin">
                  <Button variant="contained" size="large">
                    SuperAdmin
                  </Button>
                </a>
                <a href="/LoginHR">
                  <Button variant="contained" size="large">
                    HR
                  </Button>
                </a>
              </div>
            }
          />
          {/* <Route path="*" element={ 
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',fontSize:'100px'}}>
              404 Not Found
            </div>} /> */}
          <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          <Route path="/RegisterEmployee" element={<EmpRegister />} />
          <Route path="/LoginEmployee" element={<EmpLogin />} />

          {/* <Route path="/RegisterHR" element={<HRRegister />} /> */}
          {/* <Route path="/LoginHR" element={<HRLogin />} /> */}
          {/* <Route path="/HRDashboard" element={<HRDashboard />} /> */}
          
          
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/SuperAdmin" element={< LoginAdmin />} />
          
          {/* <Route path="/upload" /> */}
          {/* <Route path="/files" /> */}
          {/* <Route path="/Logout" element={<Logout />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
