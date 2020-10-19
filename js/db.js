// Open or create database
let dbPromised = idb.open("kick-news", 1, (upgradeDb) => {
   let articlesObjectStore = upgradeDb.createObjectStore("teams", {
     keyPath: "id"
   });

   articlesObjectStore.createIndex("name", "name", { unique: false });
});

// Save data
function saveForLater(team) {
   dbPromised
      .then( db => {
         let tx = db.transaction("teams", "readwrite");
         let store = tx.objectStore("teams");
         console.log(team);
         store.put(team);
         return tx.complete;
      })
      .then(function() {
         console.log("Team berhasil di simpan.");
   });
}

// Get all data
function getAll() {
   return new Promise( (resolve, reject) => {
      dbPromised
         .then( db => {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.getAll();
         })
         .then( teams => {
            resolve(teams);
         });
   });
}

// Get team by id
function getById(id) {
   return new Promise( (resolve, reject) => {
      dbPromised
         .then( db => {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.get(id);
         })
         .then( team => {
            resolve(team);
         });
   });
}

// Delete team
function deleteById(id) {
   dbPromised.then( db => {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
      store.delete(id);
      return tx.complete;
   }).then( () => {
      console.log('Item deleted');
   });
}
