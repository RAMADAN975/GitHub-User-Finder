const searchInput = document.querySelector("input");
const showBtn = document.querySelector("button");
const user = document.querySelector(".user");
const divMessage = document.querySelector(".divMessage");
const pMessage = document.querySelector(".pMessage");

showBtn.disabled = true;

searchInput.addEventListener("input", () => {
  if (searchInput.value.length < 3) {
    showBtn.disabled = true;
  } else {
    showBtn.disabled = false;
  }
});

showBtn.addEventListener("click", () => {
  divMessage.classList.remove("d-none");
  divMessage.classList.remove("bg-danger-subtle");
  divMessage.classList.add("bg-primary-subtle");
  divMessage.innerHTML = `<p class="mb-0 text-primary">Searching for <strong>${searchInput.value}</strong></p>`;

  const search = `https://api.github.com/users/${searchInput.value}`;
  fetch(search)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      let userImage = data.avatar_url;
      let userName = data.name;
      let userBio = data.bio;
      let userRepo = data.public_repos;
      let userFollowers = data.followers;
      let userFollowing = data.following;

      user.innerHTML = `
    <div class="container d-flex justify-content-center align-items-center my-5">
    <div class=" text-center bg-dark w-75 rounded-4">
    <div class="py-3">
    <img
    src="${userImage}"
    class="img-fluid rounded-circle"
    style="width: 150px; height: 150px"
    alt="..."
    />
    </div>
    <div class="card-body d-flex flex-column gap-3">
    <h2 class="card-title text-light text-capitalize">${userName == null ? searchInput.value : userName}</h2>
    <h5 class="card-title text-secondary text-capitalize">@${userName == null ? searchInput.value : userName}</h5>
    <h5 class="card-title text-info pt-3">${userBio == null ? "This user dosen't have a bio" : userBio}</h5>
    <div class="d-flex justify-content-center gap-3 py-4 row">
    <div class="bg-body rounded-2 col-8 col-md-3">
    <p class="card-text text-dark fw-bold pt-3">${userRepo}</p>
    <p class="text-secondary">Respositories</p>
    </div>
    <div class="bg-body rounded-2 col-8 col-md-3">
    <p class="card-text text-dark fw-bold pt-3">${userFollowers}</p>
    <p class="text-secondary">Followers</p>
    </div>
    <div class="bg-body rounded-2 col-8 col-md-3">
    <p class="card-text text-dark fw-bold pt-3">${userFollowing}</p>
    <p class="text-secondary">Following</p>
              </div>
              </div>
              </div>
              </div>
              </div>
              `;
      divMessage.classList.add("d-none");

      if (data.status == "404") {
        throw Error();
      }
    })
    .catch((err) => {
      console.log(err.message);
      user.innerHTML = "";
      divMessage.classList.remove("d-none");
      divMessage.classList.add("bg-danger-subtle");
      divMessage.innerHTML = `
      <p class="text-danger mb-0">Sorry, we couldn't find this Github user.</p>
      `;
    })
    .finally(() => {
      searchInput.value = "";
    });
});
