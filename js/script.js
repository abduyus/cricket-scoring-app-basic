'use strict';

import { renderNews } from './renderNews.js';
import { renderScoreCard, renderPreviewMatch } from './scoreCard.js';
import { API_KEY_1, API_KEY_2, API_KEY_3, renderSpinner } from './config.js';

const matchesCardContainer = document.querySelector('.matches-container');
const newsContainer = document.querySelector('.news-list');

const dateString = '20240117063000';
// console.log(formatDate(dateString)); // Outputs: "6:30 Today" (if today's date is 2024-01-17)

// Select the elements
const elements = document.querySelectorAll('.score');

// Loop through each element
elements.forEach(element => {
  // Check if the text content is empty
  if (element.textContent.trim() === '') {
    // Set the width to 0
    element.style.width = '0';
  }
});

const state = {
  matchArr: [],
};

export default state;

function isNotOlderThanYesterday(timestamp) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  const date = new Date(timestamp);

  return date >= yesterday;
}
// FOR CRICBUZZ API FOR LIVESCORE
///////////////////////////////////////////////////////////
const getCricket = async function (API_KEY) {
  // const url =
  //   "https://unofficial-cricbuzz.p.rapidapi.com/matches/list?matchState=live";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798",
  //     "X-RapidAPI-Host": "unofficial-cricbuzz.p.rapidapi.com",
  //   },
  // };
  const url = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live';
  const urlRecent = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';
  const urlUpcoming =
    'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,

      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
    },
  };

  // Implement the urlRecent using Promise.all
  //  check if the match is less older than yesterday or not and if it is then render it

  try {
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/'
      ? renderSpinner(matchesCardContainer)
      : '';

    const response = await Promise.all([
      fetch(url, options),
      fetch(urlRecent, options),
    ]);

    const result = await response[0].json();
    const resultrec = await response[1].json();

    const seriesMatches =
      result.typeMatches.map(match => match.seriesMatches) &&
      resultrec.typeMatches.map(match => match.seriesMatches);

    const series = seriesMatches.map(array => {
      return array
        .map(obj => {
          if (!obj.seriesAdWrapper) return null;

          return obj.seriesAdWrapper;
        })
        .filter(Boolean); // this will remove null values
    });

    const seriesM = series.flat();
    console.log(seriesM);

    await seriesM.forEach(match =>
      match.matches.forEach(matchToRender => {
        state.matchArr.push(matchToRender);
      })
    );
    // state2.matchArr = series.flat();

    matchesCardContainer.innerHTML = '';
    seriesM.forEach(match =>
      match.matches.forEach(matchToRender => {
        state.matchArr.push(matchToRender);

        if (isNotOlderThanYesterday(+matchToRender.matchInfo.startDate)) {
          if (matchToRender.hasOwnProperty('matchScore')) {
            renderScoreCard(matchToRender);
          } else {
            renderPreviewMatch(matchToRender);
          }
        }
      })
    );
    console.log(seriesMatches);
    // state = state2;
  } catch (error) {
    console.error(error);
  }
};
await getCricket(API_KEY_2);

// if (
//   window.location.pathname === '/index.html' ||
//   window.location.pathname === '/'
// ) {
//   await getCricket();
// }
///////////////////////////////////////////////////////////

const getNews = async function () {
  if (
    !(
      window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '/'
    )
  )
    return;
  const url = 'https://unofficial-cricbuzz.p.rapidapi.com/news/list';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
      'X-RapidAPI-Host': 'unofficial-cricbuzz.p.rapidapi.com',
    },
  };

  try {
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/'
      ? renderSpinner(newsContainer)
      : '';
    const response = await fetch(url, options);
    console.log(response);
    const result = await response.json();
    console.log(result);

    const newsList = result.newsList.slice(0, 4); // Get the first 3 elements
    newsContainer.innerHTML = '';
    newsList.forEach(news => {
      if (!news.story) return;

      renderNews(news);
    });
  } catch (error) {
    console.error(error);
  }
};

// await getNews();

// export { getNews, getCricket };

const matches = document.querySelectorAll('.match');
let matchItm;

console.log(matches);

matches.forEach(match =>
  match.addEventListener('click', async function (e) {
    console.log(e.target.closest('.match'));
    const matchItm = e.target.closest('.match');

    if (!matchItm) return;

    const matchId = matchItm.dataset.id;

    window.location.href = `match.html#${matchId}`;
  })
);

// const requestOptions = {
//   method: "GET",
//   headers: {
//     Authorization: "Bearer YOUR_API_KEY",
//   },
//   redirect: "follow",
// };

// fetch(
//   "https://cricket.sportmonks.com/api/v2.0/fixtures/21897?include=bowling",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

/*
fetch(
  "https://api.cricapi.com/v1/currentMatches?apikey=59909b0f-60bd-4259-93cf-e748f6223601&offset=0"
)
  .then((response) => response.json())
  .then((data) => {
    data.data.forEach((data) => {
      // console.log(data, "hhh");

      // renderScoreCard(data);

      // Replace 'your_api_key' with your actual API key
      const apiKey = "59909b0f-60bd-4259-93cf-e748f6223601";

      // Replace 'match_id' with the ID of the match you're interested in
      const matchId = data.id;
      console.log(matchId);

      // Make the GET request to the API
      fetch(
        `https://api.cricapi.com/v1/match_scorecard?apikey=59909b0f-60bd-4259-93cf-e748f6223601&offset=0&id=0b12f428-98ab-4009-831d-493d325bc555`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Extract and print the score for each batsman
          for (let innings of data.innings) {
            for (let batsman of innings.batsmen) {
              console.log(`${batsman.name}: ${batsman.runs} runs`);
            }
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  })
  .catch((err) => {
    console.log("An error occured. Please check your code", err);
  });
*/
