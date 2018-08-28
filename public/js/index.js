const saveButton = document.querySelector('#save');


let no_sort = localStorage.getItem("no_sort");
let sort = localStorage.getItem("sort");

if(!no_sort && !sort) {
  auth()
    .then(() => { return callAPI('friends.get', {fields: 'photo_100'});
    })
    .then(friends => {
        let obj_no_sort =  {};
        obj_no_sort.items = friends.items;
        let obj_sort =  {};
        obj_sort.items = []

        localStorage.setItem('no_sort', JSON.stringify(obj_no_sort));
        localStorage.setItem('sort', JSON.stringify(obj_sort));
    })
} else {

  basicActions();
}


function basicActions(){
  let no_sort = JSON.parse(localStorage.getItem("no_sort"));
  let sort = JSON.parse(localStorage.getItem("sort"));
  reloadListHtml(no_sort, sort);

  let filter_no_sort = document.querySelector('#search_1');

  filter_no_sort.addEventListener('keyup', () => {
      filtred(filter_no_sort.value, no_sort.items, '.list_no_sort');
  });

  let filter_sort = document.querySelector('#search_2');

  filter_sort.addEventListener('keyup', () => {
      filtred(filter_sort.value, sort.items, '.list_sort');
  });

  document.addEventListener('click', (e) => {
      let target = e.target;
      let elment;
      let addButton = document.querySelectorAll('.add');
      let deleteButton = document.querySelectorAll('.delete');

      // add element from sort_list
      motionArrayElement(target, addButton, no_sort, sort);

      // delete element from sort_list
      motionArrayElement(target, deleteButton, sort, no_sort);


      reloadListHtml(no_sort, sort);
  });
  let buttonSave = document.querySelector('#save');

  buttonSave.addEventListener('click', () => {
    let no_sort_save = JSON.stringify(no_sort);
    let sort_save = JSON.stringify(sort);

    localStorage.setItem('no_sort', no_sort_save);
    localStorage.setItem('sort', sort_save);
  });

  let currentDrag;

  document.addEventListener('dragstart', (e) => {
      let zone = getCurrentZone(e.target);

      if (zone) {
          currentDrag = e.target ;
      }
  });

  document.addEventListener('dragover', (e) => {
          e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
      if (currentDrag) {
          let zone = getCurrentZone(e.target);
          if(zone.classList.contains('list_sort')){
            let massiv = no_sort.items;
            let id = currentDrag.firstElementChild.textContent;
            for (let i = 0; i < massiv.length; i++) {
              if (massiv[i].id == id) {
                  sort.items.push((massiv[i]));
                  no_sort.items.remove(massiv[i]);
              }
            }
            reloadListHtml(no_sort, sort);
          }
          currentDrag = null;
      }
  });

  function getCurrentZone(from) {
      do {
          if (from.classList.contains('list')) {
              return from;
          }
      } while (from = from.parentElement);

      return null;
  }
}
