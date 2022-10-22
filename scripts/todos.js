class Todos extends App {

  async renderTodos() {
    const todos = await this.fetchApi("/todos", "GET");
    const todosContainer = document.querySelector(".todos-container");
    const inputValue = document.getElementById("input").value
    console.log(inputValue);
    
    todos.forEach((todo) => {
      todosContainer.insertAdjacentHTML(
        "afterbegin",
        ` 
            <div id="todo" class="card" style="width: 18rem;">
                <img src="${
                  this.baseUrl + "/" + todo.image
                }" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${todo.title}</h5>
                    <p class="card-text">${todo.description}</p>
                    <button onclick="todos.modalFunc(event.target)" data-todo-id="${todo._id}"
                    }" type="button" class="btn btn-danger">Delete</button>
                </div>
            </div>
        `
      );
    });
  }

  modalFunc(element) {
    const id = element.dataset.todoId
    const homeWrapper = document.querySelector(".home-wrapper");

    homeWrapper.insertAdjacentHTML('beforeend', `
      <div class="modal-wrapper">
        <div class="modal-container" style="padding: 50px;">
            <div style="max-width: 400px;" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="margin-bottom: 13px;">
                      <h5 class="modal-title">Do you really want to delete it ?</h5>
                    </div>
                    <div class="modal-footer">
                      <button onclick="todos.closeModal()" style="margin-right: 10px;" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button onclick="todos.deleteTodo(this)" data-todo-id="${id}" type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `)
  }

  closeModal() {
    const modal = document.querySelector(".modal-wrapper")
    modal.remove()
  }

  async deleteTodo(element) {
    const id = element.dataset.todoId;

    await this.fetchApi(`/todos/${id}`, 'DELETE')
    this.closeModal()
  }
}

const todos = new Todos();
