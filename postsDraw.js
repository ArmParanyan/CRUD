
function drawPosts() {
	let html = `  <div class="posts-and-button-wrapper">
                <div class="posts-text">
                    <p>Posts</p>
                </div>

                <div class="create-buttons-wrapper">
                    <button class="create-button">Create</button>
                </div>

            </div>

            <div class="posts-main-part">
                <div class="posts">
                    <div class="pound-sign pad">
                        <p class="about-users-text">#</p>
                    </div>

                    <div class="user-name pad">
                        <p class="about-users-text">User Name</p>
                    </div>

                    <div class="title pad">
                        <p class="about-users-text">Title</p>
                    </div>

                    <div class="actions-div pad">
                        <p class="about-users-text">Actions</p>
                    </div>
                </div>
            </div> `;


	const postWrapper = document.querySelector(".posts-wrapper");

	postWrapper.innerHTML = html;

	history.pushState(null, "", "/#/posts");

}

drawPosts();


export  function drawUserPosts(postsData, usersData) {
	const usersMap = new Map(usersData.map(user => [user.id, user.name]));

	const postsWrapper = document.querySelector(".posts-wrapper");
	const postsMainPart = document.querySelector(".posts-main-part");

	postsData.forEach((post, index) => {
		if (usersMap.has(post.userId)) {
			const userDatas = document.createElement("div");

			userDatas.classList.add('user-datas', 'pad');


			const userId = document.createElement("div");
			userId.classList.add("user-id", 'pad');
			userId.textContent = index + 1;



			userDatas.classList.add('user-datas', 'pad');

			if (index % 2 !== 0) {
				userDatas.style.background = "#F5F6FA"
			} else {
				userDatas.style.background = "#FFF"

			}

			const userName = document.createElement("div");
			userName.classList.add('user-name', 'pad', "editable");
			userName.textContent = usersMap.get(post.userId);

			userName.setAttribute('data-user-id', `${index + 1}`);




			const title = document.createElement('div');
			title.classList.add('title', 'pad', "editable");
			title.textContent = post.title;

			title.setAttribute('data-user-id', `${index + 1}`);



			const changes = document.createElement('div');
			changes.classList.add('actions');

			const editIcone = document.createElement("img");
			const deleteIcone = document.createElement("img");

			editIcone.classList.add("edit-icon", "editable");
			editIcone.setAttribute('data-user-id', `${index + 1}`);


			deleteIcone.classList.add("delete-icon");
			deleteIcone.alt = userId.textContent;


			editIcone.src = "./images/Edit_fill.png";
			deleteIcone.src = "./images/del_alt_duotone_line.png";

			changes.appendChild(editIcone);
			changes.appendChild(deleteIcone);

			userDatas.appendChild(userId);
			userDatas.appendChild(userName);
			userDatas.appendChild(title);
			userDatas.appendChild(changes);
			postsMainPart.appendChild(userDatas);
			postsWrapper.appendChild(postsMainPart);
		}
	});

	// window.location.href = "http://127.0.0.1:5500/#/posts";


}

