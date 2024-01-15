function githubSearch() {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();

      if (searchTerm) {
        searchUsers(searchTerm);
      }
    });

    function searchUsers(username) {
      const userSearchUrl = `https://api.github.com/search/users?q=${username}`;

      fetch(userSearchUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }

    function displayUsers(users) {
      userList.innerHTML = "";

      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = user.login;

        listItem.addEventListener("click", function () {
          getRepos(user.login);
        });

        userList.appendChild(listItem);
      });
    }

    function getRepos(username) {
      const reposUrl = `https://api.github.com/users/${username}/repos`;

      fetch(reposUrl, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => console.error("Error fetching repositories:", error));
    }

    function displayRepos(repos) {
      reposList.innerHTML = "";

      repos.forEach((repo) => {
        const listItem = document.createElement("li");
        listItem.textContent = repo.name;
        reposList.appendChild(listItem);
      });
    }
  });
}
githubSearch();
