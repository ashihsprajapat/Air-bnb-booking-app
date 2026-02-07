import './App.css'
import {  Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Footer from './components/Footer';
import SingleListing from './pages/SingleListing';
import Authentication from './pages/Authentication';
import EditListing from './pages/EditListing';
import CreateListing from './pages/CreateListing';
import ProfileShow from './pages/profilesShow';
import HostPage from './pages/HostPage';
import AllListingProfile from './pages/AllListing.profile';
import OneListingProfile from './pages/oneListingProfile';
import AllBookingListingProfile from './pages/AllBookingListingProfile';

import { Toaster } from 'react-hot-toast';
import AllListing from './pages/AllListing';
import { useLocation } from 'react-router-dom'
import Success from './components/Success';
import Cancell from './components/Cancell';

function App() {

  const current = useLocation();
  console.log()

  return (
    <>
      {
        !current.pathname.includes("profile") && <Navbar />
      }

      

      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />

        <Route path="/success" element={<Success />} />
        <Route path="/cancell" element={<Cancell />} />

        <Route path="/become-a-host" element={< CreateListing />} />

        <Route path="/listings" element={< AllListing />} />

        <Route path="/host/homes" element={<HostPage />} />

        <Route path="/profile/:id" element={<ProfileShow />} >
          <Route path="all-listings" element={<AllListingProfile />} />
          <Route path="all-booking" element={<AllBookingListingProfile />} />
          <Route path=":list_id" element={<OneListingProfile />} />
        </Route>

        <Route path="/:id" element={<SingleListing />} />

        <Route path="/:id/edit" element={<EditListing />} />
      </Routes>

      <Toaster
        position="bottom-left"
        reverseOrder={false}
      />
      <Footer />
    </>
  )
}

export default App
