// import { createNoteBook } from './sockets';
//
// const allNoteBooks = [];
//
// function onClick (){
//   createNoteBook({ name: 'sherri sockets' }, function(data){
//     allNoteBooks.push(data);
//     addNotebookToView();
//   });
// }
//
// function addNotebookToView(){
//   const DOMNode = document.getElementById('list');
//   console.log(DOMNode, document)
//   const ul = document.createElement('ul');
//   allNoteBooks.forEach(function(notebook) {
//     const li = document.createElement('li');
//     li.innerText = notebook.id + ' ' + notebook.name + ' ' + notebook.createdAt;
//     ul.appendChild(li);
//   });
//
//   DOMNode.appendChild(ul);
// }
//
// document.getElementById('createNoteBook').addEventListener('click', onClick);
