export function drawCreateHtml() {
	let html = `  

        <div class="posts-text">
            <p>Create Post</p>
        </div>

        <div class="posts-create-main-part">

            <div class="title-and-select-wrapper">
                <div class="post-title-wrapper">
                    <input class="input-title elems" placeholder="Title">
                </div>

                <div class="select-user-from-create">
                    <select name="Select" class="elems">
                        <option>
                            Select User
                        </option>
                    </select>
                </div>


            </div>

            <div class="create-posts-body-wrapper">
                <textarea class="create-body" placeholder="Body"></textarea>
            </div>
        </div>


        <div class="create-delete-buttons-wrapper">
            <div class="create-post-buttons">
                <button class="create-post">Create</button>
            </div>

            <div class="delete-post-buttons">
                <button class="cancel">Cancel</button>
            </div>
        </div>

    `

	const postWrapper = document.querySelector(".posts-wrapper");

	postWrapper.innerHTML = html;
	history.pushState(null, "", "/#/posts/create");

}


export  function drawCreatePosts(usersData) {
	return function () {

		drawCreateHtml();

		const mainPosts = document.querySelector(".main-posts");
		const postsWrapper = document.querySelector(".posts-wrapper");
		const createPostsWrapper = document.querySelector(".create-posts-wrapper");

		const selectUser = document.querySelector("select");
		const createButton = document.querySelector(".create-post");

		// const button = document.querySelector(".create-button");
		// button.href = "/#create"

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


				// Proceed with the fetch request
				fetch('https://jsonplaceholder.typicode.com/posts', {
					method: 'POST',
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
							// Check if the response status is OK (status code 200)
							console.log("Post created successfully!", response.status);
							return response.json(); // Parse the response data
						} else {
							console.error("Failed to create post. HTTP status code: " + response.status);
							throw new Error("Failed to create post");
						}
					})
					.then((json) => console.log(json));

			} else {
				console.error("please fill all the fields !!!");
			}
		});

	// window.location.href = "http://127.0.0.1:5500/#/create";





	}





}
