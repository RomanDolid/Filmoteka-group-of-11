import { refs } from './refs';

export default class FetchQueryApiService {
  constructor() {
    // this.number = 0;
    // this.newMassOfMovies = [];
    // this.massOfMovies = [];
    this.url = '';
    this.page = 1;
    // this.totalHits = 0;
    this.searchQuery = '';
    this.full_URL_Image = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    this.apiKey = '4f9c0875fb3e036244791a873d8888e9';
    this.tokenKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjljMDg3NWZiM2UwMzYyNDQ3OTFhODczZDg4ODhlOSIsInN1YiI6IjYwMTFjZjA5YTM1YzhlMDAzZjYxOWNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jSlPq1Oju09IIGkdFM70pixzD_zw1JN2kt1u4_R-OzU';
  }

  async fetchArticles(searchQuery) {
    if (refs.widthWindow > 1023) {
      this.number = 9;
    } else if (refs.widthWindow < 768) {
      this.number = 3;
    } else if (refs.widthWindow > 767 && refs.widthWindow < 1024) {
      this.number = 4;
    }
    if (searchQuery != this.searchQuery) {
      refs.GalleryRefs.innerHTML = '';
      this.massOfMovies = [];
    }
    if (searchQuery) {
      this.url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${searchQuery}&page=${this.page}&include_adult=false`;
    } else {
      this.url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.page}`;
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    try {
      let response = await fetch(this.url, options);
      let filmsResponse = await response.json();
      let filmsResultsId = await filmsResponse.results.map(elem => elem.id);

      let createURL = filmsResultsId.map(
        idFilm =>
          `https://api.themoviedb.org/3/movie/${idFilm}?api_key=${this.apiKey}&language=en-US`,
      );

      
      // console.log(createURL);
      return createURL;
    } catch (err) {
      console.log(err);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
