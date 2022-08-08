const form = document.querySelector('form');
const notes = document.querySelector('#notes');
const modal = document.querySelector('.mode');
const overlay = document.querySelector('.overlay');
const btnAdd = document.querySelector('#add');

const titleInput = form.elements.title;
const noteInput = form.elements.note;

let divID

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

//Add note 
function addNote(note){
    const newNote = document.createElement('div');
    const cardCol = document.createElement('div');
    const title = document.createElement('h5');
    const content = document.createElement('p');
    const btnDiv = document.createElement('div');
    const btnView = document.createElement('button');
    const btnDel = document.createElement('button');
    
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
    btnDiv.append(btnView, btnDel);
    btnDiv.classList.add('button-div')
    btnView.textContent = 'View Details';
    btnView.addEventListener('click',viewNote);
    btnView.classList.add('btn', 'btn-primary', 'btn-sm','col-5','viewDetails')
    btnDel.textContent = 'Delete';
    btnDel.addEventListener('click',delNote);
    btnDel.classList.add('btn', 'btn-danger','btn-sm', 'col-5')
} 

//view note with overlay background
function viewNote(e){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    divID = e.target.parentNode.parentNode.parentNode.dataset.id
    let note = getDataFromStorage()
    let noteObj = note.find(item =>{
        return item.id === parseInt(divID);
    });
    const selectedTitle = noteObj.title;
    const selectedText = noteObj.text;
    const btnCloseModal = document.createElement('button');
    const btnEdit = document.createElement('button');
    btnCloseModal.addEventListener('click',closeNote)
    btnCloseModal.innerHTML = '&times;'
    btnCloseModal.classList.add('close-mode')
    btnEdit.addEventListener('click',editNote)
    btnEdit.innerHTML = 'Edit'
    btnEdit.classList.add('btn', 'btn-info', 'text-white','mt-2')

    modal.innerHTML = `
    <h5 class="mb-3">${selectedTitle}</h5>
    <p>${selectedText}</p>
    `
    modal.append(btnCloseModal);
    modal.append(btnEdit);
    overlay.addEventListener('click', closeNote);
}

//Edit note 
function editNote(){
    closeNote();
    btnAdd.innerHTML = 'Update';
    btnAdd.classList.remove('btn.success');
    btnAdd.classList.add('btn-info');
    let note = getDataFromStorage();
    let noteObj = note.find(item =>{
        return item.id === parseInt(divID);
    });
    const selectedTitle = noteObj.title;
    const selectedText = noteObj.text;
    titleInput.value = selectedTitle;
    noteInput.value = selectedText;
}

//Display all notes
function displayNotes(){
    let note = getDataFromStorage();
    if(note.length > 0){
        noteID = note[note.length -1].id;
        noteID++;
    } else {
        noteID =1;
    }
    note.forEach(item => addNote(item));
}
document.addEventListener("DOMContentLoaded", displayNotes);

//Delete Note
function delNote(e) {
    if(btnAdd.innerHTML === 'Update'){
        alert('Can\'t delete..Please update the note first.')
        return 
    } 

    let del = this.parentNode.parentNode.parentNode
    del.remove()
    divID = e.target.parentNode.parentNode.parentNode.dataset.id
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
    
    } else if(noteInput.value && e.target[2].innerHTML === 'Add Note'){
        // Add note from the form
        let note = getDataFromStorage()
        let noteItem = new Note(noteID, titleInput.value, noteInput.value);
        noteID++
        note.push(noteItem);
        localStorage.setItem('note', JSON.stringify(note))
        addNote(noteItem);
        titleInput.value = ''
        noteInput.value = ''
    } else {
        // Update Note from the form
        let note = getDataFromStorage()
        let noteObj = note.find(item =>{
            return item.id === parseInt(divID);
        });
        noteObj.title = titleInput.value;
        noteObj.text = noteInput.value;
        localStorage.setItem('note', JSON.stringify(note));
        notes.innerHTML = '';
        displayNotes();
        titleInput.value = '';
        noteInput.value = '';
        btnAdd.innerHTML = 'Add Note';
        btnAdd.classList.remove('btn-info');
        btnAdd.classList.add('btn.success');
        // btnAdd.innerHTML = 'Add Note'
    }
});