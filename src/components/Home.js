// import React from "react";
// import MyNavbar from "./Navbar";
// import { Link } from "react-router-dom";

// function Home() {
//     return (
//         <>
//             <MyNavbar />
//             <h1>Allegro Medicals</h1>
//             <p>
//                 Allegro Medicals is your trusted online destination offering a seamless shopping experience for 
//                 high-quality medicines, wellness products, and healthcare essentials with secure payments, fast 
//                 delivery, and expert support to make healthcare accessible and convenient for everyone.
//             </p>
//             <div>
//                 <button>
//                     <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
//                 </button>
//                 <button>
//                     <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
//                 </button>
//             </div>
//         </>
//     );
// }

// export default Home;
import React from "react";
import MyNavbar from "./Navbar";


function Home() {
    return (
        <>
            <MyNavbar />
            <h1>Allegro Medicals</h1>
            <p>
                Allegro Medicals is your trusted online destination offering a seamless shopping experience for 
                high-quality medicines, wellness products, and healthcare essentials with secure payments, fast 
                delivery, and expert support to make healthcare accessible and convenient for everyone.
            </p>

            
        </>
    );
}



export default Home;

