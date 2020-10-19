document.addEventListener('DOMContentLoaded', function() {
   
   // Activate sidebar nav (materialize)
   var elems = document.querySelectorAll('.sidenav');
   M.Sidenav.init(elems);

   // Get the url
   let page = window.location.hash.substr(1);

   if(page == '') {
      page = 'standing';
   }

   loadNavbar();
   loadPage(page);
});

// For get list menu
function loadNavbar() {
   let xhttp = new XMLHttpRequest();
   
   xhttp.onreadystatechange = function() {
      if(this.readyState === 4) {
         // Response failed
         if(this.status !== 200) {
            return;
         }

         // Response success
         document.querySelectorAll('.topnav, .sidenav').forEach( elm => {
            elm.innerHTML = xhttp.responseText;
         });

         // Call event
         document.querySelectorAll('.sidenav a', '.topnav a').forEach( elm => {
            clickMenu(elm);
         });
      }
   }

   xhttp.open('GET', 'navbar.html', true);
   xhttp.send();
}

// Event for each menu
function clickMenu(elm) {
   elm.addEventListener('click', (event) => {

      // Close sidenav (materialize)
      var sidenav = document.querySelector('.sidenav');
      M.Sidenav.getInstance(sidenav).close();

      // Get konten
      page = event.target.getAttribute('href').substr(1);
      loadPage(page);
   });
}

// Load content
function loadPage(page) {
   let xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {
      if(this.readyState == 4) {
         let content = document.querySelector('#body');

         if(this.status = 200) {
            content.innerHTML = xhttp.responseText;

            if(page == 'standing') {
               getAllStanding();
            }else if(page == 'scorers') {
               getTopScorers();
            }else if(page == 'team') {
               getAllTeam();
            }else if(page == 'saved') {
               getSavedTeam();
            }
            
         }else if(this.status = 404) {
            content.innerHTML = '<p>404 NOT FOUND.</p>'
         }else{
            content.innerHTML = '<p>Oop... Something Wrong.</p>'
         }
      }
   }

   xhttp.open('GET', 'pages/' + page + '.html', true);
   xhttp.send();
}