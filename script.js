"use strict";

import { renderNews } from "./renderNews.js";
import { renderScoreCard, renderMultipleScoreCard } from "./scoreCard.js";

const matchesCardContainer = document.querySelector(".matches-container");

const dateString = "20240117063000";
// console.log(formatDate(dateString)); // Outputs: "6:30 Today" (if today's date is 2024-01-17)

// Select the elements
const elements = document.querySelectorAll(".score");

// Loop through each element
elements.forEach((element) => {
  // Check if the text content is empty
  if (element.textContent.trim() === "") {
    // Set the width to 0
    element.style.width = "0";
  }
});

const getCricket = async function () {
  const url =
    "https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=cricket";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798",
      "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    result.Stages.forEach((match) => {
      console.log(match);
      // if (match.Events.length !== 1) {
      //   match.Events.forEach((match) => renderMultipleScoreCard(match));
      // }

      match.Events.length !== 1
        ? match.Events.forEach((match) => renderMultipleScoreCard(match))
        : renderScoreCard(match);
    });
  } catch (error) {
    console.error(error);
  }
};

getCricket();

const getNews = async function () {
  const url = "https://unofficial-cricbuzz.p.rapidapi.com/news/list";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798",
      "X-RapidAPI-Host": "unofficial-cricbuzz.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const newsList = result.newsList.slice(0, 4); // Get the first 3 elements
    newsList.forEach((news) => {
      if (!news.story) return;
      console.log(news);
      renderNews(news);
    });
  } catch (error) {
    console.error(error);
  }
};

getNews();
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
