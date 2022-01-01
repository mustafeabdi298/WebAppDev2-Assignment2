export const getMovies = () => {
  return fetch(
    //`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    '/api/movies?page=1', 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
  ).then(res=>res.json());
};

export const getUpcomingMovies = () => {
  return fetch(
    //`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`//
    "/api/movies/tmdb/upcoming?page=1", 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res=>res.json());
};


export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/movies/${id}`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res=>res.json());
};

export const getMovieGenres = async () => {
  return fetch(
    //"https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_TMDB_KEY + "&language=en-US"
    `/api/genres/movies`
    ).then(res => res.json());
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/movies/${id}/images`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res => res.json());
};

export const getMovieReviews = (id) => {
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/movies/${id}/reviews`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res => res.json());
};

export const getCountries = async () => {
  return fetch(
    //"https://api.themoviedb.org/3/configuration/countries?api_key=" + process.env.REACT_APP_TMDB_KEY
    `/api/regionals/countries`
  ).then(res => res.json());
};

export const getLanguages = async () => {
  return fetch(
    //"https://api.themoviedb.org/3/configuration/languages?api_key=" + process.env.REACT_APP_TMDB_KEY
    `/api/regionals/languages`
  ).then(res => res.json());
};

export const getShows = () => {
  return fetch(
    //`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    '/api/shows?page=1', 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
  ).then(res=>res.json());
};

export const getShow = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/shows/${id}`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res=>res.json());
};

export const getShowGenres = async () => {
  return fetch(
    //"https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_TMDB_KEY + "&language=en-US"
    `/api/genres/shows`
    ).then(res => res.json());
};

export const getShowImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/shows/${id}/images`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res => res.json());
};

export const getShowReviews = (id) => {
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `/api/shows/${id}/reviews`, 
    {headers: {
      "Authorization": window.localStorage.getItem("token")
    }
  }
  ).then(res => res.json());
};