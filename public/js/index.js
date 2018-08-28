const saveButton = document.querySelector('#save');


let no_sort = localStorage.getItem("no_sort");
let sort = localStorage.getItem("sort");

// console.log(localStorage);
//
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
  })
}
