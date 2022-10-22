class Auth extends App {

  async signup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    await this.fetchApi("/signup", "POST", formData).then(() => (window.location.href = "/index.html"));
  }

  async login(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    await this.fetchApi("/login", "POST", formData).then((res) =>
      localStorage.setItem("token", res.token)
    );
    const token = localStorage.getItem("token");

    if (token != "undefined") {
      window.location.href = "/index.html";
    }

  }
  
  hideButtons() {
    const signupBtn = document.querySelector('#signup-btn')
    const loginBtn = document.querySelector('#login-btn')
    const logoutBtn = document.querySelector('#logout-btn')
    const addProductBtn = document.querySelector("#add-todo-btn")
    const token = localStorage.getItem("token")

    if (token) {
      signupBtn.style.display = "none"
      loginBtn.style.display = "none"
      logoutBtn.style.display = "block"
    }
    if (!token) {
      addProductBtn.style.display = "none"
    }
  }

  async createTodo(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    await this.fetchApi("/todos", "POST", formData).then(() => window.location.href = "/index.html");
  }

  logout() {
    localStorage.removeItem("token")
  }
}

const auth = new Auth();
