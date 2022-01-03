# Assignment 2 - Web API.

Name: Mustafe Abdi

## Features.
 
+ Upcoming routes - Allows a user to access upcoming movies 
+ Get all movies or an individual genre by adding movie id
+ Login page
+ User must exist in the MongoDB to be logged in.
+ Signup page
    + Username field has to be a unique value 
    + Password field has to conform to the regular expression: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
    + Repeat password must match password field
+ Users are now permanently saved to MongoDB when registering.
+ All paths except for login and signup are now protected parts requiring a user to be logged in. 
+ User name now appears on the site header
+ User has the option to sign out

### Movies/Shows

+ Discover Movies Page
  + Movies list is now retrieved from tmdb with Node acting as a middleman.
  + Languages list is now retrieved from tmdb with Node acting as a middleman.
  + Movie Images are now retrieved from tmdb with Node acting as a middleman.

+ Upcoming Movies Page
  + Movies list is now retrieved from tmdb with Node acting as a middleman.
  + Movie Genre list is now retrieved from tmdb with Node acting as a middleman.
  + Languages list is now retrieved from tmdb with Node acting as a middleman.
  + Movie Images are now retrieved from tmdb with Node acting as a middleman.

+ Popular Tv Shows
  + Shows list is now retrieved from tmdb with Noda acting as a middleman.
  + Shows Genre list is now retrieved from tmdb with Node acting as a middleman.
  + Countries list is now retrieved from tmdb with Node acting as a middleman.
  + Show Images are now retrieved from tmdb with Node acting as a middleman.

### Favourites/Wishlist/Favorite Tv Shows

The 3 types of favourites all implement the same features and will be grouped into a single term of "favourites" to avoid unnecessary text.

+ Favourites are now saved to an array inside the user schema in MongoDB. This makes the favourites user specific. 
+ Favourited movies/shows will show up with a hearth/playlistCheck icon when the user loads the webpage, if those movies already exist inside the users favourites arrays. 
+ Favourites can be deleted and will be removed from both the webpage and the MongoDB. 
+ User can write reviews about their favourites (with the exception to wishlist movies due to a lack of logic).

### Movie/Show Reviews

+ Reviews now have their own schema and are saved to the MongoDB.
+ When a user writes a review, that review gets saved to MongoDB and its mongo ObjectId gets added into the users array of reviews. 
+ The review can then be seen along the other reviews. However, due to the nature of js, the user reviews will only appear after the 2nd time of checking a movies reviews. 
+ The reviews author field is automatically populated with the signed in users username and cannot be changed. 

### Logging

+ All htmls calls are logged and saved in the log file using Morgan. 


## Installation Requirements/API Configuration

The user will need to download the zip file of the repo. Uncompress it into a folder and open the new folder using their preferred text editor. The user will also need a current version of mongo installed. 
After opening the folder in the chosen editor, the user will need to create an .env file with the following structure.

+ NODE_ENV=development
+ PORT=8080
+ HOST=
+ MONGO_DB=*users MongoURL*
+ SEED_DB=True
+ SECRET=*users JWTSecret*
+ TMDB_KEY=*users tmdb key*

After creating the .env file the user should open a new terminal inside the "movies-api" folder and input the following commands. 

```bat
npm install
npm start
```
This will launch the node server on port: 8080.

The user should now open another terminal inside the "MoviesApp React" folder. In the terminal, the user should input the following commands.

```bat 
npm install
npm start
```

This will launch the React app and should also open the users default browser to port: 3000. 

From here the user can start using the app. 

## API Design

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies |Gets a list of movies | N/A | N/A | N/A
| /api/movies/tmdb/upcoming |Gets a list of upcoming movies | N/A | N/A | N/A
| /api/movies/:id |Get a movie by id | N/A | N/A | N/A
| /api/genres/movies |Get movie genres | N/A | N/A | N/A
| /api/movies/:id/images |Get a movies images | N/A | N/A | N/A
| /api/movies/:id/reviews |Get a movies reviews | N/A | N/A | N/A
| /api/regionals/countries |Get a list of countries | N/A | N/A | N/A
| /api/regionals/languages |Get a list of languages | N/A | N/A | N/A
| /api/shows |Get a list of shows | N/A | N/A | N/A
| /api/shows/:id |Get a show by id | N/A | N/A | N/A
| /api/genres/shows |Get show genres | N/A | N/A | N/A
| /api/shows/:id/images |Get a shows images | N/A | N/A | N/A
| /api/shows/:id/reviews |Get a shows reviews | N/A | N/A | N/A
| /api/users |Get the list of users |Add a user | N/A | N/A
| /api/users/:userName/favourites |Get a users favourites | Add to favourites | N/A | Delete from favourites
| /api/users/:userName/wishlist |Get a users wishlist |Add to wishlist| N/A | Delete from wishlist
| /api/users/:userName/showFavourites |Get a users show favourites | Add to show favourites | N/A | Delete from show favourites
| /api/reviews |Get all movie reviews |Add to movie reviews | N/A | N/A
| /api/reviews/shows |Get all show reviews | Add to show reviews | N/A | N/A
| /api/reviews/:id |Get a movies reviews | N/A | N/A | N/A
| /api/reviews/shows/:id |Get a shows reviews | N/A | N/A | N/A
| ... | ... | ... | ... | ...

## Security and Authentication
To use the app the user has to have an account created. If no accounts exist, the user can create an account with a simple signup form. The web app uses JWT tokens and passport, as such the user only needs to login once until they refresh the app. All routes, except for login and signup, are protected due to the nature of the app being user instance based. These routes include:

+ /movies/wishlist -> Wishlist Page
+ /tv/reviews/form -> Show Review Form Page
+ /tv/reviews/:id -> Show Review Page
+ /tv/popular -> Popular Tv Shows Page
+ /tv/popular/:id -> Show Details Page
+ /tv/favorites -> Favourite Shows Page
+ /reviews/form -> Movie Review Form Page
+ /movies/upcoming -> Upcoming Movies Page
+ /movies/reviews/:id -> Movie Review Page
+ /movies/favorites -> Favourite Movies Page
+ /movies/:id -> Movie Details Page
+ / -> HomePage (Discover Movies Page)

## Integrating with React App
The React app is fully integrated with the Node.js API. All show/movie related calls are first proxied to the API, and from there send off to the TMDB endpoints. These calls include:

+ movies list
+ upcoming movies list
+ movie details
+ movie genres
+ movie images
+ movie reviews
+ countries list
+ languages list
+ popular shows list
+ shows genres
+ shows images
+ shows reviews

The rest of the calls are handled exclusively by the Node.js API. These calls usually involve: geting from/saving to/deleting from the MongoDB. These calls include:
+ everything to do with users
+ eveything to do with user written reviews

The react app can be viewed in the "MoviesApp React". 

Here is an example of a tmdb method call inside the react app (tmdb.api.js). 

~~~Javascript
export const getMovies = () => {
  return fetch(
    '/api/movies?page=1', 
      {headers: {
        "Authorization": window.localStorage.getItem("token")
      }
    }
  ).then(res=>res.json());
};
~~~

Here is an example of a API handled call inside the react app (movies-api.js).

~~~Javascript
export const login = (username, password) => {
    return fetch(`/api/users`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({username: username, password: password})
    }).then(res => res.json());
};
~~~

## Extra features

All HTML calls are logged and saved in the log.txt file. This is done using Morgan.  

