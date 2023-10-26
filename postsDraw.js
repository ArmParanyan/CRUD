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
}

drawPosts();


export function drawUserPosts(postsData, usersData) {
	const userIds = usersData.map(user => user.id);
	const postIds = postsData.map(posts => posts.userId);

	const commonIds = userIds.filter(userId => postIds.includes(userId));

	const postsWrapper = document.querySelector(".posts-wrapper");

	postIds.forEach((commonId, index) => {
		const post = postsData.find(post => post.userId === commonId);
		const user = usersData.find(user => user.id === commonId);

		if (post && user) {
			const userDatas = document.createElement("div");


			const postsMainPart = document.querySelector(".posts-main-part")

			userDatas.classList.add('user-datas', 'pad');

			if (index % 2 !== 0) {
				userDatas.style.background = "#F5F6FA"
			} else {
				userDatas.style.background = "#FFF"

			}


			const userId = document.createElement("div");
			userId.classList.add("user-id", 'pad');

			userId.textContent = index + 1;


			const userName = document.createElement('div');

			userName.classList.add('user-name', 'pad', "editable");
			userName.textContent = user.username;

			const title = document.createElement('div');
			title.classList.add('title', 'pad', "editable");
			title.textContent = post.title;

			const changes = document.createElement('div');
			changes.classList.add('actions');

			const editIcone = document.createElement("img");
			const deleteIcone = document.createElement("img");

			editIcone.classList.add("edit-icon", "editable");
			deleteIcone.classList.add("delete-icon");

			// editIcone.id = "edit-icon"

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
}

