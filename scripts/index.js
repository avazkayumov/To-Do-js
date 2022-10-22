class App {
  baseUrl = "http://142.93.246.144";

  async fetchApi(url, method, data) {
    const config = {
      method: method,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    
    if (method == "POST") {
      config.body = data;
      delete config.headers["Content-Type"];
    }

    try {
      const request = await fetch(this.baseUrl + url, config);
      const result = request.json();
      return result;
    } catch (err) {
      alert(err);
    }
  }
}
