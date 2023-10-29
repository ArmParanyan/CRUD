
function drawEditHtml() {
	let html = `

        <div class="posts-text edit-part">
            <p>Edit Post</p>
        </div>

        <div class="posts-create-main-part edit-part">

            <div class="title-and-select-wrapper edit-part">
                <div class="post-title-wrapper edit-part">
                    <input class="input-title elems" placeholder="Title">
                </div>

                <div class="select-user-from-create edit-part">
                    <select name="Select" class="elems">
                        <option>
                            Select User
                        </option>
                    </select>
                </div>


            </div>

            <div class="create-posts-body-wrapper edit-part">
                <textarea class="create-body" placeholder="Body"></textarea>
            </div>
        </div>


        <div class="create-delete-buttons-wrapper edit-part">
            <div class="create-post-buttons edit-part">
                <button class="create-post">Save</button>
            </div>

            <div class="delete-post-buttons edit-part">
                <button class="cancel">Cancel</button>
            </div>
        </div>

    `

	const postWrapper = document.querySelector(".posts-wrapper");

	postWrapper.innerHTML = html;

}


export function drawEditPosts(usersData, id) {

	return function () {
		history.pushState(null, "", `/#/posts/edit/${id}`);

		drawEditHtml();

		const mainPosts = document.querySelector(".main-posts");
		const postsWrapper = document.querySelector(".posts-wrapper");
		const createPostsWrapper = document.querySelector(".create-posts-wrapper");

		const selectUser = document.querySelector("select");
		const createButton = document.querySelector(".create-post");
		const cancelButton = document.querySelector(".cancel");

		const userIds = usersData.map(({id}) => id);


		usersData.forEach((user, index) => {
			const option = document.createElement("option");
			option.value = userIds[index];
			option.innerHTML = user.name;
			selectUser.appendChild(option);
		});


		createButton.addEventListener("click", event => {

			const inputTitle = document.querySelector(".input-title");
			const createBody = document.querySelector(".create-body");
			const selectedUserId = selectUser.value;

			if (selectUser.value !== 'Select User' && inputTitle.value !== "" && createBody.value !== "") {

				const selectedUser = usersData.find(user => user.name === selectUser.value);

				fetch(`https://jsonplaceholder.typicode.com/posts/${selectedUserId}`, {
					method: 'PUT',
					body: JSON.stringify({
						title: inputTitle.value,
						body: createBody.value,
						userId: selectedUserId,
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				})
					.then((response) => {
						if (response.ok) {
							console.log("Post updated successfully!", response.status);
							return response.json();
						} else {
							console.error("Failed to update post. HTTP status code: " + response.status);
							throw new Error("Failed to update post");
						}
					})
					.then((json) => console.log(json));

			} else {
				console.error("please fill all the fields !!!");
			}


		});


		return window.location.hash;

	}

}


