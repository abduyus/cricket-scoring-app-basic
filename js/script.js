'use strict';

import { renderNews } from './renderNews.js';
import { renderScoreCard, renderPreviewMatch } from './scoreCard.js';

const matchesCardContainer = document.querySelector('.matches-container');

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

export { state };

// FOR CRICBUZZ API FOR LIVESCORE
///////////////////////////////////////////////////////////
const getCricket = async function () {
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
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
      // 'X-RapidAPI-Key': '882d15899amsh2467631ba6e7cb6p12ca8ajsn0647d2efeab2',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    const seriesMatches = result.typeMatches.map(match => match.seriesMatches);

    const series = seriesMatches.map(array => {
      // console.log(array);
      return array
        .map(obj => {
          if (!obj.seriesAdWrapper) return null;
          return obj.seriesAdWrapper;
        })
        .filter(Boolean); // this will remove null values
    });
    // console.log(series, "hhhhhhhhh");

    const seriesM = series.flat();
    console.log(seriesM);

    // state.matchArr = series.flat();

    // console.log(series.flat());

    seriesM.forEach(match =>
      match.matches.forEach(matchToRender => {
        // console.log(matchToRender, 111111111);
        state.matchArr.push(matchToRender);
        console.log(state);
        if (matchToRender.hasOwnProperty('matchScore')) {
          // console.log(matchToRender, 333333);
          renderScoreCard(matchToRender);
        } else {
          // console.log(matchToRender, 2222222);
          renderPreviewMatch(matchToRender);
        }
      })
    );

    console.log(seriesMatches);
  } catch (error) {
    console.error(error);
  }
};
await getCricket();
///////////////////////////////////////////////////////////

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

    const newsList = result.storyList.slice(0, 4); // Get the first 3 elements
    newsList.forEach(news => {
      if (!news.story) return;

      renderNews(news);
    });
  } catch (error) {
    console.error(error);
  }
};

// await getNews();

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
