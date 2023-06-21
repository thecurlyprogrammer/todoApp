import _ from 'lodash';
import './style.css';
import { Todo } from './js/todo';

/*

// function component() {
// const element = document.createElement('div');

// Lodash, currently included via a script, is required for this line to work
// Lodash, now imported by this script

// const myIcon = new Image();
// myIcon.src = Icon;

// element.appendChild(myIcon);



// const test = document.createElement('div');
// test.id = 'container';

// element.appendChild(test);




// return element;
// }

const gridSystem = () => {
    const element = document.createElement('div');
    element.className = 'grid';
    return element;
}

// document.body.appendChild(component());

document.body.appendChild(gridSystem());

let x = new Cards();
x.createRow();
*/


let todo = new Todo();
todo.createInput();
todo.createList();
todo.initStorage();

const list = document.querySelector('.todo');
const deleteAllButton = document.createElement('button');
deleteAllButton.setAttribute('class', 'delete-button');
deleteAllButton.textContent = 'Elimina tutto';
deleteAllButton.addEventListener('click', todo.clearStorage);
list.appendChild(deleteAllButton);

// todo.getStorage();