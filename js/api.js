const API_KEY = 'e8fcd0a3c3514470a557349585575a62';
const BASE_URL = 'https://api.football-data.org/v2/';
const LEAGUE_ID = '2021';
const END_POINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/`;

function fetchApi(url) {
   return fetch(url, {
      headers: {
         'X-Auth-Token': API_KEY
      }
   })
      .then(res => {
         if(res.status !== 200) {
            console.log(`Error: ${res.status}`);
            return Promise.reject(new Error(res.statusText));
         }else{
            return Promise.resolve(res)
         }
      })
      .then(res => res.json())
      .catch(err => {
         console.log(err);
      })
}

function getAllStanding() {
   showPreloader();
   
   if('caches' in window) {
      caches.match(END_POINT_COMPETITION + 'standings').then(function(response) {
         if(response) {
            response.json().then(function(data) {
               console.log(`Competition Data: ${data}`);
               standingUI(data);
            })
         }
      })
   }

   fetchApi(END_POINT_COMPETITION + 'standings')
      .then(data => {
         standingUI(data);
      })
      .catch(err => {
         console.log(err);
      })
}

function standingUI(data) {
   let content = '';
   let tableElement = document.getElementById('standing');
   let no = 1;

   data.standings[0].table.forEach(function(standing) {
      content += `
         <tr>
            <td>${no}</td>
            <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="${standing.team.name}"/></td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.points}</td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
         </tr>
      `;

      no++;
   });

   tableElement.innerHTML = `
      <h6>Math Day : ${data.season.currentMatchday}</h6>
      <table class="striped centered bordered" style="margin-top: 20px;">
         <thead>
            <tr>
               <th>#</th>
               <th>Team</th>
               <th>W</th>
               <th>D</th>
               <th>L</th>
               <th>P</th>
               <th>GF</th>
               <th>GA</th>
               <th>GD</th>
            </tr>
         </thead>
         <tbody id="standings">
            ${content}
         </tbody>
      </table>
   `;

   hidePreloader();
}

function getTopScorers() {
   showPreloader();

   if('caches' in window) {
      caches.match(END_POINT_COMPETITION + 'scorers').then(function(response) {
         if(response) {
            response.json().then(function(data) {
               console.log(`Competition Data: ${data}`);
               topScorersUI(data);
            })
         }
      })
   }

   fetchApi(END_POINT_COMPETITION + 'scorers')
      .then(data => {
         topScorersUI(data);
      })
      .catch(err => {
         console.log(err);
      })
}

function topScorersUI(data) {
   let content = '';
   let tableElement = document.getElementById('scorers');
   let no = 1;

   data.scorers.forEach(function(scorer) {
      content += `
         <tr>
            <td>${no}</td>
            <td>${scorer.player.firstName}</td>
            <td>${scorer.team.name}</td>
            <td>${scorer.numberOfGoals}</td>
         </tr>
      `;

      no++;
   });

   tableElement.innerHTML = `
      <h6>Math Day : ${data.season.currentMatchday}</h6>
      <table class="striped centered bordered" style="margin-top: 20px;">
         <thead>
            <tr>
               <th>#</th>
               <th>Player</th>
               <th>Team</th>
               <th>Goals</th>
            </tr>
         </thead>
         <tbody id="standings">
            ${content}
         </tbody>
      </table>
   `;

   hidePreloader();
}

function getAllMatches() {
   showPreloader();

   if('caches' in window) {
      caches.match(END_POINT_COMPETITION + 'matches').then(function(response) {
         if(response) {
            response.json().then(function(data) {
               console.log(`Competition Data: ${data}`);
               matchesUI(data);
            })
         }
      })
   }

   fetchApi(END_POINT_COMPETITION + 'matches')
      .then(data => {
         matchesUI(data);
      })
      .catch(err => {
         console.log(err);
      })
}

function matchesUI(data) {
   let content = '';
   let tableElement = document.getElementById('matches');
   let no = 1;

   data.matches.forEach(function(matches) {
      content += `
         <tr>
            <td></td>
            <td>${matches.homeTeam.name}</td>
            <td>${matches.awayTeam.name}</td>
            <td>${matches.numberOfGoals}</td>
         </tr>
      `;

      no++;
   });

   tableElement.innerHTML = `
      <h6>Math Day : ${data.season.currentMatchday}</h6>
      <table class="striped centered bordered" style="margin-top: 20px;">
         <thead>
            <tr>
               <th>#</th>
               <th>Player</th>
               <th>Team</th>
               <th>Goals</th>
            </tr>
         </thead>
         <tbody id="standings">
            ${content}
         </tbody>
      </table>
   `;

   hidePreloader();
}

function getAllTeam() {
   showPreloader();

   if('caches' in window) {
      caches.match(END_POINT_COMPETITION + 'teams').then(function(response) {
         if(response) {
            response.json().then(function(data) {
               console.log(`Competition Data: ${data}`);
               teamsUI(data);
            })
         }
      })
   }

   fetchApi(END_POINT_COMPETITION + 'teams')
      .then(data => {
         teamsUI(data);
      })
      .catch(err => {
         console.log(err);
      })
}

function teamsUI(data) {
   let content = '';
   let teamElement = document.getElementById('team');

   data.teams.forEach(function(team) {
      content += `
         <div class="col s12 m7">
            <div class="card horizontal">
               <div class="card-image" style="padding:10px 0 10px 10px">
                  <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.name}"/>
               </div>
               <div class="card-stacked">
                  <div class="card-content">
                     <h6 class="center-align">${team.shortName}</h6>
                  </div>
                  <div class="card-action">
                     <a class="waves-effect waves-light btn yellow darken-3" href="./detail-team.html?id=${team.id}"><i class="material-icons left">info</i> Info</a>
                  </div>
               </div>
            </div>
         </div>
      `;
   });

   teamElement.innerHTML = content; 

   hidePreloader();
}

function getTeamById() {
   showPreloader();

   return new Promise((resolve, reject) => {
      // Get url paramater id
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get('id');
   
      if('caches' in window) {
         caches.match(BASE_URL + 'teams/' + idParam).then(function(response) {
            if(response) {
               response.json().then(function(data) {
                  console.log(`Competition Data: ${data}`);
                  detailTeamUI(data);

                  resolve(data);
               })
            }
         })
      }
   
      fetchApi(BASE_URL + 'teams/' + idParam)
         .then(data => {
            detailTeamUI(data);
            resolve(data);
         })
         .catch(err => {
            console.log(err);
         })
   })
}

function detailTeamUI(data) {
   let bodyElement = document.getElementById('body-detail');

   let content = `
      <div class="row padding-s3">
         <div class="col s12 m7">
            <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${data.name}"/ class="responsive-img img-detail">
            <h5 class="center-align">${data.name}</h5>

            <table class="striped">
               <tbody>
                  <tr>
                     <th>Short Name</th>
                     <td>${data.shortName}</td>
                  </tr>
                  <tr>
                     <th>Address</th>
                     <td>${data.address}</td>
                  </tr>
                  <tr>
                     <th>Phone</th>
                     <td>${data.phone}</td>
                  </tr>
                  <tr>
                     <th>Website</th>
                     <td>${data.website}</td>
                  </tr>
                  <tr>
                     <th>Email</th>
                     <td>${data.email}</td>
                  </tr>
                  <tr>
                     <th>Founded</th>
                     <td>${data.founded}</td>
                  </tr>
                  <tr>
                     <th>Founded</th>
                     <td>${data.founded}</td>
                  </tr>
                  <tr>
                     <th>Club Colors</th>
                     <td>${data.clubColors}</td>
                  </tr>
                  <tr>
                     <th>Venue</th>
                     <td>${data.venue}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   `;

   bodyElement.innerHTML = content; 

   hidePreloader();
}

function getSavedTeam() {
   showPreloader();

   getAll().then(function(teams) {
      savedTeamUI(teams);
	});
}

function savedTeamUI(data) {
   let content = '';
   let teamElement = document.getElementById('saved-content');

   data.forEach(function(team) {
      content += `
         <div class="col s12 m7">
            <div class="card horizontal">
               <div class="card-image" style="padding:10px 0 10px 10px">
                  <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.name}"/>
               </div>
               <div class="card-stacked">
                  <div class="card-content">
                     <h6 class="center-align">${team.shortName}</h6>
                  </div>
                  <div class="card-action">
                     <a class="waves-effect waves-light btn-small yellow darken-3" href="./detail-team.html?id=${team.id}&saved=true"><i class="material-icons">info</i></a>
                     <a class="waves-effect waves-light btn-small red darken-4 delete-team" id="${team.id}" onClick="deleteTeam(${team.id})"><i class="material-icons">cancel</i></a>
                  </div>
               </div>
            </div>
         </div>
      `;
   });

   teamElement.innerHTML = content; 

   hidePreloader();
}

function getSavedTeamById() {
   showPreloader();

   let urlParams = new URLSearchParams(window.location.search);
   let idParam = urlParams.get('id');
   // console.log(getById(Number(idParam)));
   getById(Number(idParam)).then(function(team) {
      getSavedTeamByIdUI(team);
   });
}

function getSavedTeamByIdUI(data) {
   let bodyElement = document.getElementById('body-detail');

   let content = `
      <div class="row padding-s3">
         <div class="col s12 m7">
            <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${data.name}"/ class="responsive-img img-detail">
            <h5 class="center-align">${data.name}</h5>

            <table class="striped">
               <tbody>
                  <tr>
                     <th>Short Name</th>
                     <td>${data.shortName}</td>
                  </tr>
                  <tr>
                     <th>Address</th>
                     <td>${data.address}</td>
                  </tr>
                  <tr>
                     <th>Phone</th>
                     <td>${data.phone}</td>
                  </tr>
                  <tr>
                     <th>Website</th>
                     <td>${data.website}</td>
                  </tr>
                  <tr>
                     <th>Email</th>
                     <td>${data.email}</td>
                  </tr>
                  <tr>
                     <th>Founded</th>
                     <td>${data.founded}</td>
                  </tr>
                  <tr>
                     <th>Founded</th>
                     <td>${data.founded}</td>
                  </tr>
                  <tr>
                     <th>Club Colors</th>
                     <td>${data.clubColors}</td>
                  </tr>
                  <tr>
                     <th>Venue</th>
                     <td>${data.venue}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   `;

   bodyElement.innerHTML = content; 

   hidePreloader();
}

function deleteTeam(id) {
   deleteById(id);
   getSavedTeam();
   M.toast({html: 'Team has been deleted'})
}

function showPreloader()
{
   let loaderTemplate = document.getElementById('loader');
   let loader = `
      <div class="preloader-wrapper big active">
         <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
               <div class="circle"></div>
            </div><div class="gap-patch">
               <div class="circle"></div>
            </div><div class="circle-clipper right">
               <div class="circle"></div>
            </div>
         </div>
      </div>
   `;

   loaderTemplate.innerHTML = loader;
}

function hidePreloader() {
   let loaderTemplate = document.getElementById('loader');
   loaderTemplate.innerHTML = '';
}