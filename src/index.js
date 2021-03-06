import './sass/main.scss';
import { Notify } from 'notiflix';

import { getRefs } from './js/getRefs';
import { getimg } from './js/getimg';
import { isEndOfImg } from './js/isEndOfImg';
import { markup } from './js/markup';

const refs = getRefs();
let page = 1;
let searchQuery = '';
let total;

refs.searchForm.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onMoreLoadBtnClick);

refs.loadMoreBtn.classList.add('is-hidden');

function onSubmitClick(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.gallery.innerHTML = '';
  page = 1;

  if (searchQuery === '') {
    return Notify.failure('Please enter your search data.');
  }
  event.target.reset();
  getimg(searchQuery, page).then(res => {
    const imgArray = res.data.hits;
    total = res.data.total;

    if (imgArray.length === 0) {
      refs.loadMoreBtn.classList.add('is-hidden');
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    Notify.success(`Hooray! We found ${total} images.`);
    markup(res);
    refs.loadMoreBtn.classList.remove('is-hidden');
    isEndOfImg(page, total);
    page += 1;
  });
}

function onMoreLoadBtnClick() {
  getimg(searchQuery, page).then(res => {
    markup(res);
    isEndOfImg(page, total);
    page += 1;
  });
}

// console.log(page);
