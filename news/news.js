import { renderNews } from '../js/renderNews.js';

const getNews = async function () {
  const url = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    const newsList = result.storyList; // Get the first 3 elements
    newsList.forEach(news => {
      if (!news.story) return;

      renderNews(news);
    });
  } catch (error) {
    console.error(error);
  }
};

await getNews();
