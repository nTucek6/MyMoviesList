import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './navigation/navigation';
import MovieSearch from './routes/1.all/MovieSearch';
import FrontPage from './routes/1.all/Frontpage';
import Register from './routes/0.account/Register';
import Login from './routes/0.account/Login';
import Discussions from './routes/1.all/Discussions';
import UsersAdmin from './routes/2.admin/UsersAdmin';
import MoviesAdmin from './routes/2.admin/MoviesAdmin';
import PersonAdmin from './routes/2.admin/PersonAdmin';
import AccountSettings from './routes/0.account/AccountSettings';
import MoviesList from './routes/3.user/MoviesList';
import Profile from './routes/3.user/Profile';
import PrivateRoutes from './utilities/PrivateRoutes';
import PrivateAdminRoutes from './utilities/PrivateAdminRoutes';
import PrivateAdminModeratorRoutes from './utilities/PrivateAdminModeratorRoutes';
import LimitedRoutes from './utilities/LimitedRoutes';
import Discussion from './routes/1.all/Discussion';
import GenreMovies from './routes/1.all/GenreMovies';
import AddEditPerson from './routes/2.admin/AddEditPerson';
import AddEditMovie from './routes/2.admin/AddEditMovie';
import MovieInfo from './routes/1.all/MovieInfo';
import PersonInfo from './routes/1.all/PersonInfo';
import AllActors from './routes/1.all/AllActors';
import SearchResult from './routes/1.all/SearchResult';
import SearchUsers from './routes/1.all/SearchUsers';

import { useEffect } from 'react';
import CalculateMovieRating from './js/MoviesAdmin/CalculateMovieRating';

function App() {

   useEffect(() => {
      // Calculate the milliseconds until the next execution
      const now = new Date();
      const targetDate = new Date(now);
      targetDate.setHours(12, 0, 0, 0); // Set the target time (in this example, 12:00 PM)
      let timeUntilNextExecution = targetDate - now;
      if (timeUntilNextExecution < 0) {
        // If the target time has already passed, add 24 hours to the countdown
        timeUntilNextExecution += 24 * 60 * 60 * 1000;
      }
  
      // Execute the code at the target time and then every 24 hours
      const interval = setInterval(() => {
        // Your code to be executed here
        CalculateMovieRating();
  
        // Recalculate the milliseconds until the next execution
        timeUntilNextExecution = 24 * 60 * 60 * 1000;
  
        // Update the target time for the next execution
        targetDate.setTime(targetDate.getTime() + timeUntilNextExecution);
      }, timeUntilNextExecution);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }, []);

   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<><Navigation />  </>}>

               <Route path="/" element={<FrontPage />} />
               <Route path="/moviessearch" element={<MovieSearch />} />
               <Route path="/discussions" element={<Discussions />} />
               <Route path="/discussions/discussion/:id/:title" element={<Discussion />} />
               <Route path="/moviessearch/genre/:id/:title" element={<GenreMovies />} />
               <Route path="/movie/:id/:title" element={<MovieInfo />} />
               <Route path="/person/:id/:name" element={<PersonInfo />} />
               <Route path="/movieslist/:username" element={<MoviesList />} />
               <Route path="/movie/:id/:title/characters&actors" element={<AllActors />} />
               <Route path="/searchresult/:type/:search" element={<SearchResult />} />
               <Route path="/searchresult/:type" element={<SearchResult />} />
               <Route path="/searchusers" element={<SearchUsers />} />

               <Route path="/profile/:username" element={<Profile />} />

               <Route element={<LimitedRoutes />}>
                  <Route path="/login" element={<Login />} />
               </Route>

               <Route element={<PrivateRoutes />}>
                  <Route path="/accountsettings/:username" element={<AccountSettings />} />
               </Route>

               <Route element={<PrivateAdminModeratorRoutes />}>
                  <Route path="/moviesadmin/viewmovies" element={<MoviesAdmin />} exact />
                  <Route path="/moviesadmin/addeditmovie" element={<AddEditMovie />} exact />
                  <Route path="/personadmin/viewpeople" element={<PersonAdmin />} exact />
                  <Route path="/personadmin/addeditperson" element={<AddEditPerson />} exact />
               </Route>

               <Route element={<PrivateAdminRoutes />}>
                  <Route path="/usersadmin" element={<UsersAdmin />} exact />
               </Route>

            </Route >
            {/* Routes without navbar */}
            <Route element={<LimitedRoutes />}>
               <Route path="/register" element={<Register />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
