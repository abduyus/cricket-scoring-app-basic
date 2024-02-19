// renderMatch.js
import { state } from '../js/script.js';

console.log(state.matchArr); // Will log ['some value']

class RenderMatch {
  _data;
  _parentElement = document.querySelector('.section-result');
  _scoreCard = document.querySelector('.scoreboard');
  _team1;
  _team2;
  _team1Score;
  _team2Score;
  _batScoreBoard;
  _bowlScoreBoard;
  _batScoreBoardT1;
  _batScoreBoardT2;

  constructor() {
    this._getImage();
  }

  _render(data) {
    this._data = data;
    this._team1Score = this._data.scoreCard.filter(
      inngs =>
        inngs.batTeamDetails.batTeamName === this._data.matchHeader.team1.name
    );
    this._team2Score = this._data.scoreCard.filter(
      inngs =>
        inngs.batTeamDetails.batTeamName === this._data.matchHeader.team2.name
    );
    this._batScoreBoard = this._data.scoreCard.map(
      inngs => inngs.batTeamDetails
    );
    this._batScoreBoardT1 = this._batScoreBoard[0];

    this._bowlScoreBoard = this._data.scoreCard.map(
      inngs => inngs.bowlTeamDetails
    );
    console.log(this._batScoreBoard);

    const markup = this._generateMarkup();
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _getImage() {
    let imageObj = state.matchArr.filter(
      item => item.matchInfo.matchId === +window.location.hash.slice(1)
    );

    if (Array.isArray(imageObj) && imageObj.length > 0) {
      // Access the property 'matchInfo' of the first element in 'imageObj'
      console.log(imageObj[0].matchInfo);
    } else {
      console.error('imageObj is undefined or empty');
    }

    this._team1 = imageObj[0].matchInfo.team1.imageId;
    this._team2 = imageObj[0].matchInfo.team2.imageId;
  }

  _generateMarkup() {
    return `
    <div class="container">
          <p class="match-teams">${this._data.matchHeader.team1.name} vs ${
      this._data.matchHeader.team2.name
    }</p>
          <p class="match-info">
            <span class="matches-status--live">${
              this._data.matchHeader.state
            }</span>
            <span class="matches-stadium">${
              this._data.matchHeader.matchDescription
            }</span>
            &nbsp;|&nbsp;
            <span class="matches-format">${
              this._data.matchHeader.matchFormat
            }</span> &nbsp;|&nbsp;
            <span class="matches-league"
              ><a class="matches-league--link" href="#"
                >${this._data.matchHeader.seriesName}</a
              ></span
            >
          </p>

          <div class="matches">
            <div class="matches-scores">
              <div class="matches--team1--score">
                <img
                  src="http://api.cricbuzz.com/a/img/v1/i1/c${
                    this._team1
                  }/i.jpg?p=gt&d=high"
                  alt="Flag of ${this._data.matchHeader.team1.name}"
                  class="matches--team1-img"
                />
                <p class="matches--team1">${
                  this._data.matchHeader.team1.name
                }</p>
                <p class="matches--team1-total">
                  ${this._team1Score
                    .map(
                      inngs =>
                        `${inngs.scoreDetails.runs}/${inngs.scoreDetails.wickets}`
                    )
                    .join(' & ')}
                </p>
                <p class="matches--team1-overs">${this._team1Score
                  .map(inngs => inngs.scoreDetails.overs)
                  .join(' & ')} ov</p>
              </div>
              <div class="matches--team2--score">
                <img
                  src="http://api.cricbuzz.com/a/img/v1/i1/c${
                    this._team2
                  }/i.jpg?p=gt&d=high"
                  alt="Flag of ${this._data.matchHeader.team2.name}"
                  class="matches--team2-img"
                />
                <p class="matches--team2">${
                  this._data.matchHeader.team2.name
                }</p>
                <p class="matches--team2-total">${this._team2Score
                  .map(
                    inngs =>
                      `${inngs.scoreDetails.runs}/${inngs.scoreDetails.wickets}`
                  )
                  .join(' & ')}</p>
                <p class="matches--team2-overs">${this._team1Score
                  .map(inngs => inngs.scoreDetails.overs)
                  .join(' & ')} ov</p>
              </div>
              <span class="matches--last-6balls">
                <span class="matches--6 matches--wicket">W</span>
                <span class="matches--6 matches--dot">0</span>
                <span class="matches--6 matches--dot">0</span>
                <span class="matches--6 matches--dot">0</span>
                <span class="matches--6 matches--four">4</span>
                <span class="matches--6 matches--wide">WD</span>
              </span>
            </div>
            <p class="match--detail" ${
              this._data.matchHeader.playersOfTheMatch.length !== 0
                ? 'hidden'
                : ''
            }>Player of the Match: ${this._data.matchHeader.playersOfTheMatch
      .map(player => player.fullName)
      .join(' & ')}</p>
            
          </div>

          <p class="matches--summary">${this._data.matchHeader.status}</p>

          <div class="operations">
            <div class="operations__tab-container">
              <button
                class="btn operations__tab operations__tab--1 operations__tab--active"
                data-tab="1"
              >
                <span>📡</span>Live
              </button>
              <button
                class="btn operations__tab operations__tab--2"
                data-tab="2"
              >
                <span>🗣️</span>Commentary
              </button>
              <button
                class="btn operations__tab operations__tab--3"
                data-tab="3"
              >
                <span>🥇</span>Scorecard
              </button>
            </div>
            <div
              class="operations__content operations__content--1 operations__content--active"
            >
              <div class="grid grid--2-cols">
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Batsmen</th>
                        <th>Runs</th>
                        <th>Balls</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>6s</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      <tr>
                        <td class="live--bat-name">Mohammad Rizwan</td>
                        <td class="live--bat-score">129*</td>
                        <td class="live--bat-score">45</td>
                        <td class="live--bat-score">20</td>
                        <td class="live--bat-score">4</td>
                        <td class="live--bat-score">286.67</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="live--bowling">
                  <table>
                    <thead class="bowler--live">
                      <tr>
                        <th>Bowler</th>
                        <th>R</th>
                        <th>W</th>
                        <th>Ov</th>
                        <th>M</th>
                        <th>Eco</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="live--bowler-name">Pat Cummins</td>
                        <td class="live--bowler-runs">275*</td>
                        <td class="live--bowler-wickets">125</td>
                        <td class="live--bowler-overs">35</td>
                        <td class="live--bowler-maidens">3</td>
                        <td class="live--bowler-economy">180</td>
                      </tr>
                      <tr>
                        <td class="live--bowler-name">Mitchell Starc</td>
                        <td class="live--bowler-runs">275*</td>
                        <td class="live--bowler-wickets">125</td>
                        <td class="live--bowler-overs">35</td>
                        <td class="live--bowler-maidens">3</td>
                        <td class="live--bowler-economy">180</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="operations__content operations__content--2">
              <div class="commentary">
                <div class="commentary-item">
                  <div class="commentary-item--balls">
                    <span class="commentary-item--overs">39.3</span>
                    <span
                      class="commentary-item--runs matches--6 matches--wicket"
                    >
                      W</span
                    >
                  </div>
                  <div class="commentary-item--info commentary--wicket">
                    Naseem Shah to Pat Cummins: Wicket! Bowled 'em! Absolutely
                    sensational bowling. A rapid yorker from Naseem that send
                    the stumps flying!
                  </div>
                </div>

                <div class="commentary-item">
                  <div class="commentary-item--balls">
                    <span class="commentary-item--overs">39.2</span>
                    <span class="commentary-item--runs matches--6 matches--dot">
                      0</span
                    >
                  </div>
                  <div class="commentary-item--info commentary--dot">
                    Naseem Shah to Pat Cummins: Dot! A fuller ball on off just
                    beating the edge.
                  </div>
                </div>

                <!-- Commentary item -->
                <div class="commentary-item">
                  <div class="commentary-item--balls">
                    <span class="commentary-item--overs">39.1</span>
                    <span class="commentary-item--runs matches--6 matches--dot">
                      0</span
                    >
                  </div>
                  <div class="commentary-item--info commentary--dot">
                    Naseem Shah to Pat Cummins: Dot! A short ball by Naseem that
                    was pulled away but straight to Saim Ayub at square leg.
                  </div>
                </div>
                <!-- ///////////////////////////////////////////// -->

                <!-- End of over item -->
                <div class="commentary-item--over">
                  <div class="over--heading-item">
                    <p class="over over-heading">
                      <span class="over--sm">End of over</span> <span>38</span>
                    </p>

                    <p class="over bat-over">
                      <span class="over--sm">Runs Scored: 5</span>
                      <span>
                        <span class="commentary--dot">0</span>
                        <span class="commentary--dot">0</span>
                        <span class="commentary--dot">0</span>
                        <span class="commentary--four">4</span>
                        <span class="commentary--wide">WD</span>
                        <span class="commentary--dot">0</span>
                      </span>
                    </p>

                    <p class="over bat-over-score">
                      <span class="over--sm"
                        >Australia's 2nd Innings Score After 38 Overs:</span
                      >
                      <span>89/8 (38ov)</span>
                    </p>
                    <p class="over batsmen--score">
                      <span class="over--sm">Pat Cummins: 5*</span>
                      <span>Nathon Lyon: 1</span>
                    </p>

                    <p class="over bowler--score">
                      <span class="over--sm">Shaheen Afridi</span>
                      <span>10-5-2-5</span>
                    </p>
                    <p class="over batsmen--crr">
                      <span class="over--sm">Current Run Rate</span>
                      <span>3.56</span>
                    </p>
                  </div>
                </div>
                <!-- ///////////////////////////////////////////// -->
                <!-- Commentary item -->
                <div class="commentary-item">
                  <div class="commentary-item--balls">
                    <span class="commentary-item--overs">38.6</span>
                    <span
                      class="commentary-item--runs matches--6 matches--byes"
                    >
                      6b</span
                    >
                  </div>
                  <div class="commentary-item--info commentary--byes">
                    Shaheen Afridi to Pat Cummins: Four! A swinging ball on the
                    money edged away past Rizwan for four
                  </div>
                </div>
                <!-- ///////////////////////////////////////////// -->
              </div>
            </div>
            <div class="operations__content operations__content--3">
              <h5 class="operations__header">${
                this._batScoreBoardT1.batTeamName
              }'s 1st innings</h5>
              <table class="container table--score">
                <thead>
                  <tr>
                    <th>Batsmen</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>How out</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                ${this._renderBatScoreBoard()}
                  
                  
                </tbody>
              </table>
              <table class="container table--score">
                <thead>
                  <tr>
                    <th>Batsmen</th>
                    <th>Runs</th>
                    <th>Balls</th>
                    <th>4s</th>
                    <th>6s</th>
                    <th>How out</th>
                    <th>SR</th>
                  </tr>
                </thead>
                <tbody>
                ${this._renderBatScoreBoard()}
                  
                  
                </tbody>
              </table>
              <!--<div class="flex gap--sm align-center mar-top-md">
                <p class="yet-to-bat">Yet to Bat:</p>
                <p class="yet-to-batsmen">
                  ....., ........, ..... ..., ......, ....
                </p>
              </div>-->
            </div>
          </div>
            <div class="operations__content operations__content--4">
              <div class="grid grid--2-cols">
                <div>
                  <h5 class="operations__header squad">Pakistan Squad</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody class="scoreboard">
                      <tr>
                        <td class="live--bat-name">Babar Azam</td>
                        <td class="live--bat-score">Right handed batsmen</td>
                      </tr>
                      <tr>
                        <td class="live--bat-name">Mohammad Rizwan</td>
                        <td class="live--bat-score">
                          Wicket Keeper & right handed batsmen
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h5 class="operations__header squad">Pakistan Squad</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="live--bat-name">Babar Azam</td>
                        <td class="live--bat-score">Right handed batsmen</td>
                      </tr>
                      <tr>
                        <td class="live--bat-name">Mohammad Rizwan</td>
                        <td class="live--bat-score">
                          Wicket Keeper & right handed batsmen
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>`;
  }

  _renderBatScoreBoard() {
    let markup = '';

    for (let batsman in this._batScoreBoardT1.batsmenData) {
      markup += `
        <tr>
          <td class="live--bat-name">${
            this._batScoreBoardT1.batsmenData[batsman].batName
          }</td>
          <td class="live--bat-score">${
            this._batScoreBoardT1.batsmenData[batsman].runs
          }</td>
          <td class="live--bat-score">${
            this._batScoreBoardT1.batsmenData[batsman].balls
          }</td>
          <td class="live--bat-score">${
            this._batScoreBoardT1.batsmenData[batsman].fours
          }</td>
          <td class="live--bat-score">${
            this._batScoreBoardT1.batsmenData[batsman].sixes
          }</td>
          <td class="live--bat-score">${
            this._batScoreBoardT1.batsmenData[batsman].outDesc || 'Did not Bat'
          }</td>
          <td class="live--bat-score">${
            this._batScoreBoardT1.batsmenData[batsman].strikeRate
          }</td>
        </tr>
        `;
      // console.log(inng.batsmenData[batsman]);
      console.log(this._scoreCard);
      // this._scoreCard.insertAdjacentHTML('afterbegin', markup);
    }

    return markup;
    console.log(this._batScoreBoardT1);
  }
}

export default new RenderMatch();
