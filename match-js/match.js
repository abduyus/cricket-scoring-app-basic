// import renderMatch from './renderMatch.js';

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// const getMatchData = async function () {
//   const id = window.location.hash.slice(1);
//   console.log(id);
//   const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/scard`;
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
//       'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
//     },
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     renderMatch._render(result);
//     console.log(result);
//   } catch (error) {
//     console.error(error, '⚠️⚠️⚠️');
//   }
// };

// await getMatchData();
