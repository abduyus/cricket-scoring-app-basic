// renderMatch.js
import state from '../js/script.js';

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
    document.title = 'Your Desired Title';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11 2v4c0 0.552 0.448 1 1 1s1-0.448 1-1v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1zM11 18v4c0 0.552 0.448 1 1 1s1-0.448 1-1v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1zM4.223 5.637l2.83 2.83c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.83-2.83c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM15.533 16.947l2.83 2.83c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-2.83-2.83c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM2 13h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1zM18 13h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1zM5.637 19.777l2.83-2.83c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-2.83 2.83c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0zM16.947 8.467l2.83-2.83c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-2.83 2.83c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
    </svg>
  </div>
            `;
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

  _overSum(balls) {
    let ballType;
    let result = '';

    let values = balls.split(' '); // Split the string into an array of 1- or 2-character values
    values.reverse();
    console.log(values);
    values.forEach(char => {
      if (char === '...') return;
      if (!char) return;

      char === 'W' ? (ballType = 'wicket') : '';
      char === 'W1' ? (ballType = 'wicket') : '';
      char === 'W2' ? (ballType = 'wicket') : '';
      char === 'W3' ? (ballType = 'wicket') : '';
      char === '1' ? (ballType = 'single') : '';
      char === '2' ? (ballType = 'double') : '';
      char === 'L1' ? (ballType = 'byes') : '';
      char === 'B1' ? (ballType = 'byes') : '';
      char === '3' ? (ballType = 'triple') : '';
      char === 'Wd' ? (ballType = 'wide') : '';
      char === 'Wd2' ? (ballType = 'wide') : '';
      char === 'Wd3' ? (ballType = 'wide') : '';
      char === 'Wd5' ? (ballType = 'wide') : '';
      char === 'NB' ? (ballType = 'no-ball') : '';
      char === 'NB2' ? (ballType = 'no-ball') : '';
      char === 'NB3' ? (ballType = 'no-ball') : '';
      char === 'NB4' ? (ballType = 'no-ball') : '';
      char === 'NB5' ? (ballType = 'no-ball') : '';
      char === 'NB55' ? (ballType = 'no-ball') : '';
      char === '4' ? (ballType = 'four') : '';
      char === '6' ? (ballType = 'six') : '';
      char === '0' ? (ballType = 'dot') : '';
      char === '|' ? (ballType = 'slash') : '';

      result += `<span class="matches--6 matches--${ballType}">${char}</span>`;
    });

    return result;
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
                <p class="matches--team1-overs">${
                  this._team1Score.map(
                    inngs =>
                      `${inngs.scoreDetails.runs}/${inngs.scoreDetails.wickets}`
                  )
                    ? `${this._team1Score.map(
                        inngs => inngs.scoreDetails.overs + ' ov'
                      )}`
                    : ''
                } </p>
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
                <p class="matches--team2-overs">${
                  this._team2Score.map(
                    inngs =>
                      `${inngs.scoreDetails.runs}/${inngs.scoreDetails.wickets}`
                  )
                    ? `${this._team2Score.map(
                        inngs => inngs.scoreDetails.overs + ' ov'
                      )}`
                    : ''
                }</p>
              </div>
              <span class="matches--last-6balls">
                ${this._overSum(this._commentary.miniscore.recentOvsStats)}
              </span>
            </div>
            <p class="match--detail ${
              !this._data.matchHeader.playersOfTheMatch.length == 0
                ? 'hidden'
                : ''
            }"> ${
      this._data.matchHeader.playersOfTheMatch
        .map(player => player.fullName)
        .join(' & ')
        ? 'Player of the Match: ' +
          this._data.matchHeader.playersOfTheMatch
            .map(player => player.fullName)
            .join(' & ')
        : ''
    }</p>
            
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
                        <th>SR</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      <tr>
                        <td class="live--bat-name">${
                          this._commentary.miniscore.batsmanStriker.batName
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanStriker.batRuns
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanStriker.batBalls
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanStriker.batFours
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanStriker.batSixes
                        }</td>
                        <td class="live--bat-score">${this._commentary.miniscore.batsmanStriker.batStrikeRate.toFixed(
                          2
                        )}</td>
                      </tr>
                      <tr>
                        <td class="live--bat-name">${
                          this._commentary.miniscore.batsmanNonStriker.batName
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanNonStriker.batRuns
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanNonStriker.batBalls
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanNonStriker.batFours
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanNonStriker.batSixes
                        }</td>
                        <td class="live--bat-score">${
                          this._commentary.miniscore.batsmanNonStriker
                            .batStrikeRate
                        }</td>
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
                        <td class="live--bowler-name">${
                          this._commentary.miniscore.bowlerStriker.bowlName
                        }</td>
                        <td class="live--bowler-runs">${
                          this._commentary.miniscore.bowlerStriker.bowlRuns
                        }</td>
                        <td class="live--bowler-wickets">${
                          this._commentary.miniscore.bowlerStriker.bowlWkts
                        }</td>
                        <td class="live--bowler-overs">${
                          this._commentary.miniscore.bowlerStriker.bowlOvs
                        }</td>
                        <td class="live--bowler-maidens">${
                          this._commentary.miniscore.bowlerStriker.bowlMaidens
                        }</td>
                        <td class="live--bowler-economy">${
                          this._commentary.miniscore.bowlerStriker.bowlEcon
                        }</td>
                      </tr>
                      <tr>
                        <td class="live--bowler-name">${
                          this._commentary.miniscore.bowlerNonStriker.bowlName
                        }</td>
                        <td class="live--bowler-runs">${
                          this._commentary.miniscore.bowlerNonStriker.bowlRuns
                        }</td>
                        <td class="live--bowler-wickets">${
                          this._commentary.miniscore.bowlerNonStriker.bowlWkts
                        }</td>
                        <td class="live--bowler-overs">${
                          this._commentary.miniscore.bowlerNonStriker.bowlOvs
                        }</td>
                        <td class="live--bowler-maidens">${
                          this._commentary.miniscore.bowlerNonStriker
                            .bowlMaidens
                        }</td>
                        <td class="live--bowler-economy">${
                          this._commentary.miniscore.bowlerNonStriker.bowlEcon
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="operations__content operations__content--2">
              <div class="commentary">
                
                ${this._renderCommentary()}

                

                
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
      const overSep = function () {
        if (!comm.overSeparator) return;

        const overSum = function (balls) {
          let ballType;
          let result = '';
          for (let char of balls) {
            char === 'W' ? (ballType = 'wicket') : '';
            char === '1' ? (ballType = 'single') : '';
            char === '2' ? (ballType = 'double') : '';
            char === 'L1' ? (ballType = 'byes') : '';
            char === 'B1' ? (ballType = 'byes') : '';
            char === '3' ? (ballType = 'triple') : '';
            char === 'WD' ? (ballType = 'wide') : '';
            char === 'NB' ? (ballType = 'no-ball') : '';
            char === '4' ? (ballType = 'four') : '';
            char === '6' ? (ballType = 'six') : '';
            char === '0' ? (ballType = 'dot') : '';
            // char === ' ' ? (ballType = 'hidden') : '';
            result += `<span class="commentary--${ballType}">${char}</span>`;
          }
          return result;
        };

        return `
        <div class="commentary-item--over">
                  <div class="over--heading-item">
                    <p class="over over-heading">
                      <span class="over--sm">End of over</span> <span>${
                        comm.overSeparator.overNum + 0.4
                      }</span>
                    </p>

                    <p class="over bat-over">
                      <span class="over--sm">Runs Scored: ${
                        comm.overSeparator.runs
                      }</span>
                      <span>
                      ${overSum(comm.overSeparator.o_summary)}
                       
                      </span>
                    </p>

                    <p class="over bat-over-score">
                      <span class="over--sm"
                        >${comm.overSeparator.batTeamName} Score After ${
          comm.overSeparator.overNum + 0.4
        } Overs:</span
                      >
                      <span>${comm.overSeparator.score}/${
          comm.overSeparator.wickets
        } (38ov)</span>
                    </p>
                    <p class="over batsmen--score">
                      <span class="over--sm">${
                        comm.overSeparator.batStrikerNames[0]
                      }: ${comm.overSeparator.batStrikerRuns}*</span>
                      <span>${comm.overSeparator.batNonStrikerNames[0]}: ${
          comm.overSeparator.batNonStrikerRuns
        }</span>
                    </p>

                    <p class="over bowler--score">
                      <span class="over--sm">${
                        comm.overSeparator.bowlNames[0]
                      }</span>
                      <span>${comm.overSeparator.bowlOvers}-${
          comm.overSeparator.bowlMaidens
        }-${comm.overSeparator.bowlRuns}-${
          comm.overSeparator.bowlWickets
        }</span>
                    </p>
                    <p class="over batsmen--crr">
                      <span class="over--sm">Current Run Rate</span>
                      <span>${(
                        comm.overSeparator.score /
                        (comm.overSeparator.overNum + 0.4)
                      ).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
        `;
      };
      let html;
      let text;

      // if (comm.commText === 'B0$') return;
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
      if (text.includes('B2$')) {
        text = text.replace(
          /B2\$/g,
          comm.commentaryFormats.bold.formatValue[2]
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
        text.includes(', wide,') || text.includes('wide')
          ? (ballType = 'wide')
          : '';

        text.includes(', 1 run,') || text.includes('1 run')
          ? (ballType = 'single')
          : '';
        text.includes(', 2 runs,') || text.includes('2 runs')
          ? (ballType = 'double')
          : '';
        text.includes(', 3 runs,') || text.includes('3 runs')
          ? (ballType = 'triple')
          : '';
        text.includes(', SIX,') ||
        text.includes('SIX') ||
        text.includes('6 runs')
          ? (ballType = 'six')
          : '';
        text.includes(', FOUR,') ||
        text.includes('FOUR') ||
        text.includes('4 runs')
          ? (ballType = 'four')
          : '';

        text.includes(', no ball,') ? (ballType = 'no-ball') : '';
        text.includes('leg byes, 1 run,') ? (ballType = 'byes') : '';
        text.includes('Run Out!!') ? (ballType = 'wicket') : '';
        text.includes(', no run,') || text.includes('no run')
          ? (ballType = 'dot')
          : '';

        let runs;
        ballType === 'wicket' ? (runs = 'W') : '';
        ballType === 'dot' ? (runs = '0') : '';
        ballType === 'single' ? (runs = '1') : '';
        ballType === 'double' ? (runs = '2') : '';
        ballType === 'six' ? (runs = '6') : '';
        ballType === 'four' ? (runs = '4') : '';
        ballType === 'wide' ? (runs = 'WD') : '';
        ballType === 'triple' ? (runs = '3') : '';
        ballType === 'no-ball' ? (runs = 'NB') : '';
        // ballType === 'wide' ? (runs = 'WD') : '';

        html = `
        ${overSep() || ''}
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
      <h5 class="operations__header">${inng.bowlTeamName}'s Bowling</h5>
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
