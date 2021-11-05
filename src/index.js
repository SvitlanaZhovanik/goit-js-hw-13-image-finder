import imageCartsTpl from './templates/imageCarts.hbs';
import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import ImgApiService from './component/apiService.js';
import LoadMoreBtn from './component/load-moreBtn.js';
import * as basicLightbox from 'basiclightbox';
import { error } from '@pnotify/core';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imageContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imageApiServise = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imageApiServise.query = e.currentTarget.elements.query.value;

  if (imageApiServise.query === '' || imageApiServise.query === ' ') {
    return error({
      title: false,
      text: 'Please, enter your request',
      shadow: true,
      delay: 3000,
      hide: true,
    });
  }

  loadMoreBtn.show();
  imageApiServise.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imageApiServise
    .fetchImages()
    .then(images => {
      appendImagesCardMarkup(images);
      loadMoreBtn.enable();
    })
    .catch(error => alert(error));
}

function appendImagesCardMarkup(images) {
  refs.imageContainer.insertAdjacentHTML('beforeend', imageCartsTpl(images));
}

function clearImagesContainer() {
  refs.imageContainer.innerHTML = '';
}

refs.imageContainer.addEventListener('click', evt => {
  if (evt.target.className !== 'card-img-top img') {
    return;
  }
  const modal = basicLightbox.create(evt.target.nextElementSibling);
  modal.show();
});
