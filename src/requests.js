const API_key = 'a02bafb31f306201f84291bb2407cdc8';
const base_url = 'https://api.themoviedb.org/3'; // Modify this base URL

const requests = {
  fetchTrending: `${base_url}/trending/all/week?api_key=${API_key}&language=en-US`,
  fetchTopRated: `${base_url}/movie/top_rated?api_key=${API_key}&language=en-US`,
  fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${API_key}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?api_key=${API_key}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?api_key=${API_key}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?api_key=${API_key}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?api_key=${API_key}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?api_key=${API_key}&with_genres=99`,
};
export default requests;
