const form = document.querySelector('form');
const notes = document.querySelector('#notes');

let i = 1

function addNote(name ,note){
    const newNote = document.createElement('div');
    const title = document.createElement('p');
    const content = document.createElement('p');
    const viewBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    notes.append(newNote);
    newNote.append(title, content, viewBtn, delBtn);
    title.append(name); 
    content.append(note);   
    viewBtn.textContent = 'View Details';
    viewBtn.addEventListener('click',function(){
        console.log("View Button clicked!")
    });
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click',delNote);
}

function delNote() {
    let del = this.parentNode
    del.remove();
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    const noteInput = form.elements.note;
    const titleInput = form.elements.title;

    if(!noteInput.value){
        alert('Please write some notes before adding.')
    } else {
        addNote(titleInput.value, noteInput.value);
        titleInput.value = ''
        noteInput.value = ''
    }
});

