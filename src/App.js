//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import './App.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/movie/:imdbID" element={<MovieDetail />} ></Route>
            <Route path="*" element={<PageNotFound />} ></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

// function App() {

//   const router = createBrowserRouter(createRoutesFromElements(
//     <Route path="/" element={<Home />}>
//       <Route path="/movie/:imdbID" element={<MovieDetail />} ></Route>
//       <Route path="*" element={<PageNotFound />} ></Route>
//     </Route>
//   ))
//   return (
//     <div className="App">
//         <div className='container'>
//           <Header />
//           <RouterProvider router={router} />
//           <Footer />
//         </div>  
//     </div>
//   );
// }

export default App;