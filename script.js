const form = document.querySelector('form');
const notes = document.querySelector('#notes');
const titleInput = form.elements.title;
const noteInput = form.elements.note;

function addNote(name ,note){
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
    newNote.append(title, content, btnDiv );
    newNote.classList.add('card', 'h-100')
    title.append(name); 
    title.classList.add('card-title');

    //To show overview content in the card
    if(note.length > 40) {
        note = note.substring(0,40);
        content.append(note + '...')
    } else {
        content.append(note)
    };
    content.classList.add('card-text');

    //Buttons
    btnDiv.append(viewBtn, delBtn);
    btnDiv.classList.add('button-div')
    viewBtn.textContent = 'View Details';
    viewBtn.addEventListener('click',function(){
        console.log("View Button clicked!")
    });
    viewBtn.classList.add('btn', 'btn-primary', 'btn-sm','col-5','viewDetails')
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click',delNote);
    delBtn.classList.add('btn', 'btn-danger','btn-sm', 'col-5')
} 



function delNote() {
    let del = this.parentNode.parentNode.parentNode
    del.remove();
}

form.addEventListener('submit',function(e){
    e.preventDefault();

    if(!noteInput.value){
        alert('Please write some notes before adding.')
    } else {
        addNote(titleInput.value, noteInput.value);
        titleInput.value = ''
        noteInput.value = ''
    }
});

