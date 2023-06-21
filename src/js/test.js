import { forEach } from "lodash";

export class Cards {
    constructor() {
        this.containers = document.querySelectorAll(".container");
        console.log(this.containers); // Assumi che ci sia un elemento con l'id 'container' nel documento HTML
    }

    createRow(size) {
        this.containers.forEach(function (container) {
            let row = document.createElement('div');
            row.className = 'row';


            for (let i = 0; i < 3; i++) {
                const column = document.createElement('div');
                column.classList.add('column', size);
                // div.textContent = `Div ${i + 1}`;
                row.appendChild(column);
            }

            container.appendChild(row);
        });
    }
}