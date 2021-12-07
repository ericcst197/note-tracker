const form = document.querySelector('form');
const notes = document.querySelector('#notes');
const modal = document.querySelector('.mode');
const overlay = document.querySelector('.overlay');

const titleInput = form.elements.title;
const noteInput = form.elements.note;

const closeNote = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};



// let noteArr = []
let noteID = 1;
function Note(id, title, content){
  this.id = id;
  this.title = title;
  this.text = content;
}

function getDataFromStorage(){
    return localStorage.getItem("note") ? JSON.parse(localStorage.getItem("note")) : [];
}
  
function addNote(note){
    const newNote = document.createElement('div');
    const cardCol = document.createElement('div');
    const title = document.createElement('h5');
    const content = document.createElement('p');
    const btnDiv = document.createElement('div');
    const viewBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    
    //Content
    notes.append(cardCol);
    cardCol.append(newNote);
    cardCol.classList.add('col');
    cardCol.setAttribute("data-id", note.id);
    newNote.append(title, content, btnDiv );
    newNote.classList.add('card', 'h-100')
    title.append(note.title); 
    title.classList.add('card-title');

    //To show overview content in the card
    if(note.text.length > 40) {
        note.text = note.text.substring(0,40);
        content.append(note.text + '...')
    } else {
        content.append(note.text)
    };
    content.classList.add('card-text');

    //Buttons
    btnDiv.append(viewBtn, delBtn);
    btnDiv.classList.add('button-div')
    viewBtn.textContent = 'View Details';
    viewBtn.addEventListener('click',viewNote);
    viewBtn.classList.add('btn', 'btn-primary', 'btn-sm','col-5','viewDetails')
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click',delNote);
    delBtn.classList.add('btn', 'btn-danger','btn-sm', 'col-5')
} 

//view note with overlay background
function viewNote(e){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    let divID = e.target.parentNode.parentNode.parentNode.dataset.id
    let note = getDataFromStorage()
    let noteObj = note.find(item =>{
        return item.id === parseInt(divID);
    });
    const selectedTitle = noteObj.title;
    const selectedText = noteObj.text;
    const btnCloseModal = document.createElement('button')
    btnCloseModal.addEventListener('click',closeNote)
    btnCloseModal.innerHTML = '&times;'
    btnCloseModal.classList.add('close-mode')
    modal.innerHTML = `
    <h5 class="mb-3">${selectedTitle}</h5>
    <p>${selectedText}</p>
    `
    modal.append(btnCloseModal);
    overlay.addEventListener('click', closeNote);
}

function delNote(e) {
    let del = this.parentNode.parentNode.parentNode
    del.remove()
    let divID = e.target.parentNode.parentNode.parentNode.dataset.id
    let note = getDataFromStorage()
    let newNoteList = note.filter(item =>{
        return item.id !== parseInt(divID);
    });
    localStorage.setItem("note", JSON.stringify(newNoteList));
}


form.addEventListener('submit',function(e){
    e.preventDefault();
    
    if(!noteInput.value){
        alert('Please write some notes before adding.')
    } else {
        let note = getDataFromStorage()
        let noteItem = new Note(noteID, titleInput.value, noteInput.value);
        noteID++
        note.push(noteItem);
        localStorage.setItem('note', JSON.stringify(note))
        addNote(noteItem);
        titleInput.value = ''
        noteInput.value = ''
    }
});
