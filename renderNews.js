const newsContainer = document.querySelector(".news-list");

export const renderNews = async function (data) {
  //   const img = await getImg(data.story.coverImage.id);
  const img = `http://api.cricbuzz.com/a/img/v1/i1/c${data.story.coverImage.id}/i.jpg?p=thumb&d=high`;
  console.log(img, "hello");
  // const markup = `
  //   <li class="news-item container">
  //       <div class="news-item--pic-div">
  //       <img
  //           src="${img}"
  //           class="news-item--img"
  //           alt="${data.story.coverImage.caption}"
  //       />
  //       </div>
  //           <div class="news-item--header-div">
  //               <span class="news-item--header">${data.story.hline}</span>
  //               <span class="news-item--desc">${data.story.intro}</span>
  //               <span class="news-item--date">3 hours ago</span>
  //       </div>
  //   </li>`;

  const markup = `
   <a
              href="https://www.cricbuzz.com/cricket-news/${data.story.id}/${data.story.hline}"
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
  newsContainer.insertAdjacentHTML("afterbegin", markup);
};
