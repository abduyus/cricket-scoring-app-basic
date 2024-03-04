const newsContainer = document.querySelector('.news-list');

export const renderNews = async function (data) {
  const img = `http://api.cricbuzz.com/a/img/v1/i1/c${data.story.coverImage.id}/i.jpg?p=gt&d=high`;
  console.log(img, 'hello');

  let headline = data.story.hline;
  if (!/^[A-Za-z]/.test(headline)) {
    headline = headline.substring(1);
  }

  //   const markup = `
  //     <li class="news-item container">
  //         <div class="news-item--pic-div">
  //         <img
  //             src="${img}"
  //             class="news-item--img"
  //             alt="${data.story.coverImage.caption}"
  //         />
  //         </div>
  //             <div class="news-item--header-div">
  //                 <span class="news-item--header">${headline}</span>
  //                 <span class="news-item--desc">${data.story.intro}</span>
  //                 <span class="news-item--date">3 hours ago</span>
  //         </div>
  //     </li>`;

  //   newsContainer.insertAdjacentHTML("afterbegin", markup);
  // };

  const markup = `
   <a
              href="https://www.cricbuzz.com/cricket-news/${data.story.id}/${headline}"
              target="_blank"
              class="news--link"
            >
              <li class="news-item container">
                <div class="news-item--pic-div">
                  <img
                    src="${img}"
                    class="news-item--img"
                    alt="${data.story.coverImage.caption}"
                  />
                </div>
                <div class="news-item--header-div">
                  <span class="news-item--header">${data.story.hline}</span>
                  <span class="news-item--desc">${data.story.intro}</span>
                  <span class="news-item--date">3 hours ago</span>
                </div>
              </li>
            </a>`;

  newsContainer.insertAdjacentHTML('afterbegin', markup);
};
