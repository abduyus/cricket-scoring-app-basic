import renderMatch from './renderMatch.js';

const getJSON = function (url, options, errorMsg = 'Something went wrong') {
  return fetch(url, options).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getMatchData = async function () {
  const id = window.location.hash.slice(1);
  console.log(id);
  const url = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/scard`;
  const options = {
    method: 'GET',
    headers: {
      // 'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
      // 'X-RapidAPI-Key': '882d15899amsh2467631ba6e7cb6p12ca8ajsn0647d2efeab2',
      'X-RapidAPI-Key': 'aff1df6c51mshdaba1429286e586p192fb1jsncaf64292633d',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
    },
  };

  const urlComm = `https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/comm`;
  const optionsComm = {
    method: 'GET',
    headers: {
      // 'X-RapidAPI-Key': '21420ea0e8mshd4ecb966b8c5e38p157dc3jsn43b5b5e3b798',
      // 'X-RapidAPI-Key': '882d15899amsh2467631ba6e7cb6p12ca8ajsn0647d2efeab2',
      'X-RapidAPI-Key': 'aff1df6c51mshdaba1429286e586p192fb1jsncaf64292633d',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
    },
  };

  try {
    const response = await Promise.all([
      getJSON(url, options),
      getJSON(urlComm, optionsComm),
    ]);
    console.log(response);
    // const result = await response.json();
    renderMatch._render(response);
    console.log(result);
  } catch (error) {
    console.error(error, '⚠️⚠️⚠️');
  }
};

await getMatchData();

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
