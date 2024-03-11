import { renderSpinner } from '../js/config.js';
import { renderNews } from '../js/renderNews.js';

const newsContainer = document.querySelector('.news-list');

const getNews = async function () {
  renderSpinner(newsContainer);
  const url = 'https://unofficial-cricbuzz.p.rapidapi.com/news/list';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
      'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    // const newsList = result.storyList; // Get the first 3 elements
    const newsList = result.newsList; // Get the first 3 elements
    newsContainer.innerHTML = '';
    newsList.forEach(news => {
      if (!news.story) return;
      renderNews(news);
    });
  } catch (error) {
    console.error(error);
  }
};

await getNews();

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});
