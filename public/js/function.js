// vk init
VK.init({
  apiId: 6675270
});

function auth(){
    return new Promise((resolve, reject) => {
          VK.Auth.login(data => {
              if(data.session){
                  resolve();
              } else {
                  reject(new Error("No have permission"));
              }
          }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (data) => {
        if(data.error){
            reject(data.error);
        } else {
          resolve(data.response);
        }
      });
    })
}
// vk init end



// create list

function renderHtml(templateName, list, obj) {
  let template = document.querySelector(templateName).textContent;
  let render = Handlebars.compile(template);
  let html = render(obj);
  let result = document.querySelector(list);
  result.innerHTML = html;
}

// end create list

Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1);
    }
    return false;
}

function reloadListHtml(no_sort, sort){
  renderHtml('#no_sort', '.list_no_sort', no_sort);
  renderHtml('#sort', '.list_sort', sort);
}


// sort array

function motionArrayElement(target, control, deleteArray, addArray) {
  for (let i = 0; i < control.length; i++) {
    if (target === control[i]) {
      let id = target.parentNode.firstElementChild.textContent;
      let massiv = deleteArray.items;

      for (let i = 0; i < massiv.length; i++) {
        if (massiv[i].id == id) {
            addArray.items.push((massiv[i]));
            deleteArray.items.remove(massiv[i]);
        }
      }
    }
  }
}


// basic actions
