import { cricketCountries } from "./flags.js";
import { formatDate } from "./formatDate.js";

const matchesCardContainer = document.querySelector(".matches-container");

const renderScoreCard = function (data) {
  console.log(data);
  // let resultT1 = data.Events[0].Tr1CW1
  //   ? "/" + data.Events[0].Tr1CW1
  //   : " &nbsp;&nbsp;";
  // let resultT2 = data.Events[0].Tr2CW1
  //   ? "/" + data.Events[0].Tr2CW1
  //   : " &nbsp;";

  // let resultT1S2 = data.Events[0].Tr1C2
  //   ? " & " + data.Events[0].Tr1C2
  //   : "&nbsp;";

  // let resultT2S2 = data.Events[0].Tr2C2
  //   ? " & " + data.Events[0].Tr2C2
  //   : "&nbsp;";

  // let resultT1S2W = data.Events[0].Tr1CW2
  //   ? "/" + data.Events[0].Tr1CW2
  //   : "&nbsp;";
  // let resultT2S2W = data.Events[0].Tr2CW2
  //   ? "/" + data.Events[0].Tr2CW2
  //   : "&nbsp;";

  // console.log(resultT1);

  // let t1Flag = data.Events[0].T1[0].Abr;
  // let t2Flag = data.Events[0].T2[0].Abr;
  // console.log(t1Flag, t2Flag);
  // console.log(cricketCountries[t1Flag]);
  const html = `
    <div class="match">
    <p class="match-info">
      <span class="match-live--status">${data.matchInfo.state}</span> &bull;
      <span class="match-date">${data.matchInfo.matchDesc}</span> &bull;
      <span class="match-league">${data.matchInfo.seriesName}</span> &bull;
      <span class="match-format">${data.matchInfo.matchFormat}</span>
  
    </p>
    <div class="teams">
      <div class="match-teams">
        <div class="team-logos">
          <img
            src="http://api.cricbuzz.com/a/img/v1/i1/c${
              data.matchInfo.team1.imageId
            }/i.jpg?p=thumb&d=high"
            class="team-logo"
            alt="&nbsp;"
          />
          <img
          src="http://api.cricbuzz.com/a/img/v1/i1/c${
            data.matchInfo.team2.imageId
          }/i.jpg?p=thumb&d=high"
            class="team-logo"
            alt="&nbsp;"
          />
        </div>
  
        <div class="team-names">
          <span class="team1 team-name">${data.matchInfo.team1.teamName}</span>
          <span class="team2 team-name">${data.matchInfo.team2.teamName}</span>
        </div>
      </div>
  
      <div class="match-scores">
        <div class="score score--team-1">
          <span class="team1-score">${
            data.matchScore.team1Score.inngs1.runs
              ? data.matchScore.team1Score.inngs1.runs
              : " "
          }${
    data.matchScore.team1Score.inngs1.wickets ||
    data.matchScore.team1Score.inngs1.wickets === 0
      ? "/" + data.matchScore.team1Score.inngs1.wickets
      : " "
  }${
    data.matchScore.team1Score.inngs2?.runs
      ? " & " + data.matchScore.team1Score.inngs2?.runs
      : " "
  }${
    data.matchScore.team1Score.inngs2?.wickets
      ? "/" + data.matchScore.team1Score.inngs2?.wickets
      : " "
  }</span>
          <span class="team-overs team1-overs">${
            data?.matchScore.team1Score.inngs1.overs
              ? data.matchScore.team1Score.inngs1.overs
              : " "
          }</span>
        </div>
        <div class="score score--team-2">
          <span class="team2-score">${
            data?.matchScore?.team2Score?.inngs1.runs
              ? data.matchScore.team2Score.inngs1.runs
              : " "
          }${
    data?.matchScore?.team2Score?.inngs1.wickets ||
    data?.matchScore?.team2Score?.inngs1.wickets === 0
      ? "/" + data.matchScore.team2Score.inngs1.wickets
      : " "
  }${
    data.matchScore.team2Score?.inngs2?.runs
      ? " & " + data.matchScore.team2Score?.inngs2?.runs
      : " "
  }${
    data.matchScore.team2Score?.inngs2?.wickets
      ? "/" + data.matchScore.team2Score?.inngs2?.wickets
      : " "
  }</span>
          <span class="team-overs team2-overs">${
            data?.matchScore?.team2Score?.inngs1.overs
              ? data.matchScore.team2Score.inngs1.overs
              : " "
          }</span>
        </div>
      </div>
    </div>
    <span class="match-status"
      >${data.matchInfo.status || ""}</span
    >
  </div>
      `;

  matchesCardContainer.insertAdjacentHTML("beforeend", html);
};

const renderPreviewMatch = function (data) {
  const html = `
    <div class="match">
    <p class="match-info">
      <span class="match-live--status">${data.matchInfo.state}</span> &bull;
      <span class="match-date">${data.matchInfo.matchDesc}</span> &bull;
      <span class="match-league">${data.matchInfo.seriesName}</span> &bull;
      <span class="match-format">${data.matchInfo.matchFormat}</span>
  
    </p>
    <div class="teams">
      <div class="match-teams">
        <div class="team-logos">
          <img
            src="http://api.cricbuzz.com/a/img/v1/i1/c${
              data.matchInfo.team1.imageId
            }/i.jpg?p=thumb&d=high"
            class="team-logo"
            alt="&nbsp;"
          />
          <img
            src="http://api.cricbuzz.com/a/img/v1/i1/c${
              data.matchInfo.team2.imageId
            }/i.jpg?p=thumb&d=high"
            class="team-logo"
            alt="&nbsp;"
          />
        </div>
  
        <div class="team-names">
          <span class="team1 team-name">${data.matchInfo.team1.teamName}</span>
          <span class="team2 team-name">${data.matchInfo.team2.teamName}</span>
        </div>
      </div>
  
      <div class="match-scores">
        <div class="score score--team-1">
          <span class="team1-score">${""}${""}</span>
          <span class="team-overs team1-overs">${""}</span>
        </div>
        <div class="score score--team-2">
          <span class="team2-score">${""}${""}</span>
          <span class="team-overs team2-overs">${""}</span>
        </div>
      </div>
    </div>
    <span class="match-status"
      >${data.matchInfo.status || ""}</span
    >
  </div>
      `;

  matchesCardContainer.insertAdjacentHTML("beforeend", html);
};
export { renderScoreCard, renderPreviewMatch };
