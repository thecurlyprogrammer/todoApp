
export class Todo {
    constructor(title, completed) {
        this.todoContainer = document.querySelector('.todo');
        this.title = title;
        this.completed = completed;
        this.itemName = 'task';
    }

    createInput() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'new-todo');
        input.setAttribute('placeholder', 'Cosa vuoi aggiungere? Es: Pizza #foodporn #pizza');
        input.addEventListener('keydown', (event) => {
            const value = input.value;
            if (event.keyCode === 13) {
                // console.log('Task Added');
                if (this.isInputEmpty(value)) {
                    const newValue = this.createTags(value);
                    this.createTask(newValue);
                    this.clearInput();
                    this.saveStorage(newValue);
                } else {
                    return false;
                }
            }
        })
        this.todoContainer.appendChild(input);
        return input;
    }

    isInputEmpty(value) {
        const input = this.removeTags(value);

        if (input.trim() === '') {
            return false;
          } else {
            return true;
          }
    }

    removeTags(value) {
        const regex = /#\w+/g;
        const newText = value.replace(regex, "");
        return newText;
    }

    createTags(value) {
        const regex = /#\w+/g;
        const hashtags = value.match(regex);
        const newText = value.replace(regex, "");

        const object = {
            title: newText,
            hashtags: hashtags
        }

        return object;
    }

    createList() {
        const list = document.createElement('ul');
        list.setAttribute('class', 'todo-list');
        this.todoContainer.appendChild(list);
        return list;
    }

    createTask(value) {
        // console.log('createTask Init');
        const list = document.querySelector('.todo-list');
        const task = document.createElement('li');

        const text = document.createElement('p');
        text.setAttribute('class', 'task-text');
        task.setAttribute('class', 'task');
        text.textContent = value.title;

        let hashtags = document.createElement('div');
        hashtags.setAttribute('class', 'hashtags');

        let i = 0;

        if (value.hashtags !== null) {
            while (i < value.hashtags.length) {
                const tag = document.createElement('div');
                tag.setAttribute('class', 'tag');
                const mytag = value.hashtags[i];
                tag.textContent = value.hashtags[i];
                hashtags.appendChild(tag);
                i++;
            }
        }


        list.appendChild(task);

        task.appendChild(text);

        task.appendChild(hashtags);
        return list;
    }

    clearInput() {
        const input = document.querySelector('.new-todo');
        input.value = '';
        // console.log('Input clear');
    }

    initStorage() {
        // const storage = localStorage.getItem(this.itemName);
        const sessionObject = this.getStorage();

        const task = [{
            id: 1,
            title: "First Task",
            hashtags: ["#hello"],
            completed: false
        }];

        if (sessionObject == null) {
            const taskToJson = JSON.stringify(task);
            localStorage.setItem(this.itemName, taskToJson);

            const sessionTask = localStorage.getItem(this.itemName);
            const taskObject = JSON.parse(sessionTask);
            this.createTask(taskObject[0]);
            // console.log('Init Storage');
        } else {
            // console.log(sessionObject.length);
            let i = 0;
            while (i < sessionObject.length) {
                // console.log(sessionObject[i].title);
                this.createTask(sessionObject[i]);
                i++;
            }
        }
    }

    saveStorage(value) {
        const sessionJson = localStorage.getItem(this.itemName);
        const sessionObject = JSON.parse(sessionJson);
        const sessionSize = sessionObject.length;

        const task = {
            id: sessionSize + 1,
            title: value.title,
            hashtags: value.hashtags,
            completed: false
        }

        sessionObject.push(task);
        const updatedSession = JSON.stringify(sessionObject);
        localStorage.setItem('task', updatedSession);
    }

    getStorage() {
        const sessionJson = localStorage.getItem(this.itemName);
        const sessionObject = JSON.parse(sessionJson);
        return sessionObject;
    }

    clearStorage() {
        localStorage.removeItem('task');
        location.reload();
    }

}