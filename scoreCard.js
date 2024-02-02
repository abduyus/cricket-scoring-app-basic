import { cricketCountries } from "./flags.js";
import { formatDate } from "./formatDate.js";

const matchesCardContainer = document.querySelector(".matches-container");

const renderScoreCard = function (data) {
  let resultT1 = data.Events[0].Tr1CW1
    ? "/" + data.Events[0].Tr1CW1
    : " &nbsp;&nbsp;";
  let resultT2 = data.Events[0].Tr2CW1
    ? "/" + data.Events[0].Tr2CW1
    : " &nbsp;";

  let resultT1S2 = data.Events[0].Tr1C2
    ? " & " + data.Events[0].Tr1C2
    : "&nbsp;";

  let resultT2S2 = data.Events[0].Tr2C2
    ? " & " + data.Events[0].Tr2C2
    : "&nbsp;";

  console.log(resultT1);

  let t1Flag = data.Events[0].T1[0].Abr;
  let t2Flag = data.Events[0].T2[0].Abr;
  console.log(t1Flag, t2Flag);
  console.log(cricketCountries[t1Flag]);
  const html = `
    <div class="match">
    <p class="match-info">
      <span class="match-live--status">${data.Events[0].EpsL}</span> &bull;
      <span class="match-date">${formatDate(data.Events[0].Esd)}</span> &bull;
      <span class="match-league">${data.Snm}</span> &bull;
      <span class="match-format">${data.Events[0].ErnInf}</span>
  
    </p>
    <div class="teams">
      <div class="match-teams">
        <div class="team-logos">
          <img
            src="${cricketCountries[t1Flag]}"
            class="team-logo"
            alt="&nbsp;"
          />
          <img
            src="${cricketCountries[t2Flag]}"
            class="team-logo"
            alt="&nbsp;"
          />
        </div>
  
        <div class="team-names">
          <span class="team1 team-name">${data.Events[0].T1[0].Nm}</span>
          <span class="team2 team-name">${data.Events[0].T2[0].Nm}</span>
        </div>
      </div>
  
      <div class="match-scores">
        <div class="score score--team-1">
          <span class="team1-score">${
            data.Events[0].Tr1C1 || "   "
          }${resultT1} ${resultT1S2}</span>
          <span class="team-overs team1-overs">${
            data.Events[0].Tr1CO1 || ""
          }</span>
        </div>
        <div class="score score--team-2">
          <span class="team2-score">${
            data.Events[0].Tr2C1 || "   "
          }${resultT2} ${resultT2S2}</span>
          <span class="team-overs team2-overs">${
            data.Events[0].Tr2CO1 || ""
          }</span>
        </div>
      </div>
    </div>
    <span class="match-status"
      >${data.Events[0].ECo || ""}</span
    >
  </div>
      `;

  matchesCardContainer.insertAdjacentHTML("afterbegin", html);
};

const renderMultipleScoreCard = function (data) {
  // let resultT1 = data.Tr1CW1 ? "/" + data.Tr1CW1 : " &nbsp;&nbsp;";
  // let resultT2 = data.Tr2CW1 ? "/" + data.Tr2CW1 : " &nbsp;";
  let resultT1 = data.Tr1CW1 ? "/" + data.Tr1CW1 : " &nbsp;&nbsp;";
  let resultT2 = data.Tr2CW1 ? "/" + data.Tr2CW1 : " &nbsp;";

  let resultT1S2 = data.Tr1C2 ? " & " + data.Tr1C2 : "&nbsp;";

  let resultT2S2 = data.Tr2C2 ? " & " + data.Tr2C2 : "&nbsp;";

  console.log(resultT1);

  let t1Flag = data.T1[0].Abr;
  let t2Flag = data.T2[0].Abr;
  console.log(t1Flag, t2Flag);
  console.log(cricketCountries[t1Flag]);
  const html = `
    <div class="match">
    <p class="match-info">
      <span class="match-live--status">${data.EpsL}</span> &bull;
      <span class="match-date">${formatDate(data.Esd)}</span> &bull;
      <span class="match-league">${data.Stg.Sdn}</span> &bull;
      <span class="match-format">${data.ErnInf}</span>
  
    </p>
    <div class="teams">
      <div class="match-teams">
        <div class="team-logos">
          <img
            src="${cricketCountries[t1Flag]}"
            class="team-logo"
            alt="&nbsp;"
          />
          <img
            src="${cricketCountries[t2Flag]}"
            class="team-logo"
            alt="&nbsp;"
          />
        </div>
  
        <div class="team-names">
          <span class="team1 team-name">${data.T1[0].Nm}</span>
          <span class="team2 team-name">${data.T2[0].Nm}</span>
        </div>
      </div>
  
      <div class="match-scores">
        <div class="score score--team-1">
          <span class="team1-score">${
            data.Tr1C1 || "   "
          }${resultT1} ${resultT1S2}</span>
          <span class="team-overs team1-overs">${data.Tr1CO1 || ""}</span>
        </div>
        <div class="score score--team-2">
          <span class="team2-score">${
            data.Tr2C1 || "   "
          }${resultT2} ${resultT2S2}</span>
          <span class="team-overs team2-overs">${data.Tr2CO1 || ""}</span>
        </div>
      </div>
    </div>
    <span class="match-status"
      >${data.ECo || ""}</span
    >
  </div>
      `;

  matchesCardContainer.insertAdjacentHTML("afterbegin", html);
};

export { renderScoreCard, renderMultipleScoreCard };
