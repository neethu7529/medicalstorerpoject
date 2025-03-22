// import React from "react";
// import Navbar from "./components/Navbar";
// // import Login from "./components/auth/Login";

// // function App() {
// //   return (
// //     <div>
// //     <Login/>
// //     </div>
// //   );
// // }

// // export default App;
// // import MyNavbar from "./Navbar";

// function App(){
//     return(
//         <>
//         <Navbar/>
//         <h1>Allegro Medicals</h1>
//         <p>Allegro Medicals is your trusted online destination offering a seamless shopping experience for high-quality medicines, wellness products, and healthcare essentials with secure payments, fast delivery, and expert support to make healthcare accessible and convenient for everyone.</p>
//         </>
//     );
// }

// export default App;
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
function App() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renders child routes like Home or Login */}
      <h1>Allegro Medicals</h1>
      <p>Allegro Medicals is your trusted online destination offering a seamless shopping experience for high-quality medicines, wellness products, and healthcare essentials with secure payments, fast delivery, and expert support to make healthcare accessible and convenient for everyone.</p>
    </div>
  );
}

export default App;
// import { Outlet, Link } from "react-router-dom";
// import Navbar from "./components/Navbar";



