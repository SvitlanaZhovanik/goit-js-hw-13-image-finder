const KEY = '24180834-bc46a9e187b5aa650e79cc709';
const URL = 'https://pixabay.com/api/';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `${URL}?key=${KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}`;
    const response = await fetch(url);
    const responseJson = await response.json().then(({ hits }) => {
      this.incrementPage();
      return hits;
    });
    return responseJson;
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
