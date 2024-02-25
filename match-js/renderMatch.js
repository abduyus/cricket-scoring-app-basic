// renderMatch.js
import { state } from '../js/script.js';

console.log(state.matchArr); // Will log ['some value']

class RenderMatch {
  _data;
  _commentary;
  _parentElement = document.querySelector('.section-result');
  _scoreCard = document.querySelector('.scoreboard');
  _team1;
  _team2;
  _team1Name;
  _team2Name;
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
    this._data = data[0];
    this._commentary = data[1];
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

    console.log(window.location.hash.slice(1), 3290393299999);

    if (Array.isArray(imageObj) && imageObj.length > 0) {
      // Access the property 'matchInfo' of the first element in 'imageObj'
      console.log(imageObj[0].matchInfo);
    } else {
      console.error('imageObj is undefined or empty');
    }

    this._team1 = imageObj[0].matchInfo.team1.imageId;
    this._team2 = imageObj[0].matchInfo.team2.imageId;

    this._team1Name = imageObj[0].matchInfo.team1.teamName;
    this._team2Name = imageObj[0].matchInfo.team2.teamName;
    // console.log(this._team1Name, 'skjhsdhfkjsfhksdkfh');
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
                    this._team1Name === this._data.matchHeader.team1.name
                      ? this._team1
                      : this._team2
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
                    this._team2Name === this._data.matchHeader.team2.name
                      ? this._team2
                      : this._team1
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
                
                ${this._renderCommentary()}

                

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
              
              ${this.renderScoreBoard()}
              
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

  _renderCommentary() {
    let markup = this._commentary.commentaryList.map(function (comm) {
      console.log(comm.overSeparator);
      let text;
      let html;
      if (comm.commText === 'B0$') return;
      text = comm.commText;
      if (text.includes('B0$')) {
        text = text.replace(
          /B0\$/g,
          comm.commentaryFormats.bold.formatValue[0]
        );
      }
      if (text.includes('B1$')) {
        text = text.replace(
          /B1\$/g,
          comm.commentaryFormats.bold.formatValue[1]
        );
      }
      if (!comm.overNumber) {
        html = `
        <div class="commentary-item">
        ${text}
        </div>
        `;
      } else {
        let ballType;
        text.includes('out') ? (ballType = 'wicket') : '';
        text.includes('no run,') || text.includes('no run')
          ? (ballType = 'dot')
          : '';
        text.includes('1 run,') || text.includes('1 run')
          ? (ballType = 'single')
          : '';
        text.includes('2 runs,') || text.includes('2 runs')
          ? (ballType = 'double')
          : '';
        text.includes('SIX,') || text.includes('SIX') ? (ballType = 'six') : '';
        text.includes('FOUR,') || text.includes('FOUR')
          ? (ballType = 'four')
          : '';
        text.includes('wide,') || text.includes('wide')
          ? (ballType = 'wide')
          : '';
        text.includes('leg byes, 1 run,') ? (ballType = 'byes') : '';
        text.includes('Run Out!!') ? (ballType = 'wicket') : '';

        let runs;
        ballType === 'wicket' ? (runs = 'W') : '';
        ballType === 'dot' ? (runs = '0') : '';
        ballType === 'single' ? (runs = '1') : '';
        ballType === 'double' ? (runs = '2') : '';
        ballType === 'six' ? (runs = '6') : '';
        ballType === 'four' ? (runs = '4') : '';
        ballType === 'wide' ? (runs = 'WD') : '';
        // ballType === 'wide' ? (runs = 'WD') : '';

        html = `
        <div class="commentary-item">
        <div class="commentary-item--balls">
        <span class="commentary-item--overs">${comm?.overNumber}</span>
        <span
        class="commentary-item--runs matches--6 matches--${ballType}"
        >
        
        ${runs}</span
        >
        </div>
        <div class="commentary-item--info commentary--${ballType}">
        ${text}
        </div>
        </div>`;
      }
      return html;
    });

    markup = markup.filter(item => item !== undefined).join('');

    // console.log(markup, 39949049039093);
    return markup;
  }

  _renderBatScoreBoard() {
    let markup = '';
    this._batScoreBoard.forEach(inng => {
      const rows = Object.values(inng.batsmenData)
        .map(
          batsman => `
        <tr>
          <td class="live--bat-name">${batsman.batName}</td>
          <td class="live--bat-runs">${batsman.runs}</td>
          <td class="live--bat-score">${batsman.balls}</td>
          <td class="live--bat-score">${batsman.fours}</td>
          <td class="live--bat-score">${batsman.sixes}</td>
          <td class="live--bat-desc">${batsman.outDesc || ' '}</td>
          <td class="live--bat-score">${batsman.strikeRate.toFixed(2)}</td>
        </tr>
      `
        )
        .join('');
      // console.log(rows);

      const html = `
      <h5 class="operations__header">${inng.batTeamName}'s innings</h5>
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
      ${rows}
        
        
      </tbody>
    </table>
      `;

      markup += html;
    });
    console.log(this._bowlScoreBoard, '3839202-302-3-');
    return markup;
  }
  _renderBowlScoreBoard() {
    let markup = '';
    this._bowlScoreBoard.forEach(inng => {
      console.log(inng);
      const rows = Object.values(inng.bowlersData)
        .map(
          bowler => `
        <tr>
          <td class="live--bat-name">${bowler.bowlName}</td>
          <td class="live--bat-runs">${bowler.overs}</td>
          <td class="live--bat-score">${bowler.runs}</td>
          <td class="live--bat-score">${bowler.wickets}</td>
          <td class="live--bat-desc">${bowler.economy}</td>
        </tr>
      `
        )
        .join('');

      const html = `
      <h5 class="operations__header">${inng.bowlTeamName}'s </h5>
      <table class="container table--score">
      <thead>
        <tr>
          <th>Bowler</th>
          <th>Over</th>
          <th>Runs</th>
          <th>Wickets</th>
          <th>Economy</th>
        </tr>
      </thead>
      <tbody>
      ${rows}
        
        
      </tbody>
    </table>
      `;

      markup += html;
    });
    console.log(this._bowlScoreBoard, '3839202-302-3-');
    return markup;
  }

  renderScoreBoard() {
    const batScoreBoard = this._renderBatScoreBoard();
    const bowlScoreBoard = this._renderBowlScoreBoard();

    const markup = `
      <div class="score-board">
        ${batScoreBoard}
        ${bowlScoreBoard}
      </div>
    `;

    // Insert the markup into the DOM
    // Assuming you have a container for the score board
    return markup;
  }
}

export default new RenderMatch();
