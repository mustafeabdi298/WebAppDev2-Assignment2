import fetch from 'node-fetch';

export const getMovies = (page) => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getUpcomingMovies = (page) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getMovie = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
   });
};

export const getMovieGenres = () => {
    return fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getMovieImages = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getMovieReviews = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    ).then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getCountries = () => {
    return fetch(
        `https://api.themoviedb.org/3/configuration/countries?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getLanguages = () => {
    return fetch(
        `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};


export const getShows = (page) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getShow = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
   });
};

export const getShowGenres = () => {
    return fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getShowImages = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getShowReviews = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    ).then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};