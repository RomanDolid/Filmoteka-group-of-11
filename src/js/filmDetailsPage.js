import { refs } from './refs';
import TemplateDetailPage from '../templates/modal.hbs';
import {eventKeyDown , closeModal } from './closeModal';



 export let parseW =  JSON.parse(localStorage.getItem('watch')) || [] ;
// console.log(parseW)
 export let parseQ = JSON.parse(localStorage.getItem('queue')) || [];

async function getdetailsPage(id) {
  // event.preventDefault();
  const key = '42c4fa9c05708253e8c2f9a05f447e85';
  // console.log(id);
  const urlId = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
  const response = await fetch(urlId);
  const film = await response.json();
  const templateCardFilm = await TemplateDetailPage(film);
  const createCardFilm = await createDatails(refs.modalRefs, templateCardFilm);
  
  refs.modalRefs.classList.remove('is-hidden');
  refs.modalRefs.addEventListener('click', closeModal);
  document.addEventListener('keydown', eventKeyDown);
  const modalBtn = await {
    watch: document.getElementById('watch-add'),
    queue: document.getElementById('queue-add'),
    boxBtn: document.getElementById('modal-box-bnt'),
  }; 


  // кнопка добавитьв просмотренные W
  const IndexItemW  = await ChangeTextBtnW(parseW,film,modalBtn.watch);
  const IndexItemQ  = await ChangeTextBtnQ(parseQ,film,modalBtn.queue);
  modalBtn.watch.addEventListener('click',event=>{
    event.preventDefault()   
    if (event.target.id !=='watch-add'){
      return
    }
    parseW =  JSON.parse(localStorage.getItem('watch')) || [];
    if (event.target.textContent === 'remove from watch'){
       parseW.splice(IndexItemW, 1)
      console.log(parseW)
      ChangeTextBtnW(parseW, film, modalBtn.watch)
      localStorage.setItem('watch', JSON.stringify(parseW))
      
      
    }
    else{
      parseW.push(film)
      ChangeTextBtnW(parseW, film, modalBtn.watch)
      localStorage.setItem('watch', JSON.stringify(parseW))
    }
  });

//  кнопка добавитьв Q
  modalBtn.queue.addEventListener('click',event=>{
    event.preventDefault()   
    if (event.target.id !=='queue-add'){
      return
    }
    if (event.target.textContent === 'remove from queue'){
       parseQ.splice(IndexItemQ, 1)
      console.log(parseQ)
      localStorage.setItem('queue', JSON.stringify(parseQ))
      ChangeTextBtnQ(parseQ, film, modalBtn.queue)
     
    }
    else{
      parseQ.push(film)
      ChangeTextBtnQ(parseQ, film, modalBtn.queue)
      localStorage.setItem('queue', JSON.stringify(parseQ))
    }
  });



  // console.log(parseW)
}









// находим индекс елемента который есть в локар сторедж для watch

function ChangeTextBtnW(parseJson, film,btnWatch){
  if (parseJson.length === 0){
    btnWatch.textContent = 'add to Watched'
    return;
  }
  let indexW = -1;
  parseJson.forEach((elem,index) => {
      if (elem.id === film.id ){
          btnWatch.textContent = 'remove from watch';
          indexW = index;  
      }
      else{
        btnWatch.textContent = 'add to Watched'
      }
  });
  return indexW;
}



// для Q

function ChangeTextBtnQ(parseJson, film,btn){
  if (parseJson.length  === 0){
    btn.textContent = 'add to queue';
    return;
  }

  let indexQ =-1;

  parseJson.forEach((elem,index) => {
      if (elem.id === film.id ){
        btn.textContent = 'remove from queue';
          indexQ = index;  
      }
      else{
        btn.textContent = 'add to queue'
      }
  });

//  console.log(indexW)

  return indexQ;
}

// сщздаем разметку библиотеки 






// создаем разметку 

function createDatails(place, tepmlate) {
  return place.insertAdjacentHTML('beforeend', tepmlate);
}


export { getdetailsPage , createDatails};
