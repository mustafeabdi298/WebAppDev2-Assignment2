import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import addMovieReviewPage from "./pages/addMovieReviewPage";
import ShowListPage from "./pages/showListPage";
import ShowDetailsPage from "./pages/showDetailsPage";
import FavoriteShowsPage from "./pages/favoriteShowsPage";
import ShowReviewPage from "./pages/showReviewPage";
import AddShowReviewPage from "./pages/addShowReviewPage";
import WishlistPage from "./pages/wishlistPage";
import LoginPage from "./pages/loginPage";
import AuthProvider from "./contexts/authContext";
import PrivateRoute from "./components/privateRoute/privateRoute";
import SignupPage from "./pages/signupPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});



const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <AuthProvider>
    <SiteHeader />
    <MoviesContextProvider>
      {""}
      <Switch>
        <Route exact path = "/signup" component={SignupPage} />
        <Route exact path = "/login" component={LoginPage} />
        <PrivateRoute exact path = "/movies/wishlist" component={WishlistPage} />
        <PrivateRoute exact path = "/tv/reviews/form" component={AddShowReviewPage} />
        <PrivateRoute exact path = "/tv/reviews/:id" component={ShowReviewPage} />
        <PrivateRoute exact path = "/tv/popular" component={ShowListPage} />
        <PrivateRoute exact path = "/tv/popular/:id" component = {ShowDetailsPage} />
        <PrivateRoute exact path = "/tv/favorites" component = {FavoriteShowsPage} />
        <PrivateRoute exact path = "/reviews/form" component = {addMovieReviewPage} />
        <PrivateRoute exact path="/movies/upcoming" component={UpcomingMoviesPage} />
        <PrivateRoute path="/movies/reviews/:id" component={MovieReviewPage}/>
        <PrivateRoute exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <PrivateRoute path="/movies/:id" component={MoviePage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
    </MoviesContextProvider>
    </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

