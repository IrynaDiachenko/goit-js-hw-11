import { getRefs } from '../js/getRefs';
import { Notify } from 'notiflix';

const refs = getRefs();
export function isEndOfImg(page, total) {
  if (page * 40 >= total) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.success(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
