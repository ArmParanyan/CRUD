
function drawPosts() {
	let html = `  <div class="posts-and-button-wrapper">
                <div class="posts-text">
                    <p>Posts</p>
                </div>

                <div class="create-buttons-wrapper">
                    <button class="create-buttons">Create</button>
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

                    <div class="actions pad">
                        <p class="about-users-text">Actions</p>
                    </div>
                </div>
            </div> `;


	const postWrapper = document.querySelector(".posts-wrapper");

	postWrapper.innerHTML = html;
}

drawPosts();


// const navBarHeight = document.getElementById("#nav-bar");
//
// console.log(navBarHeightr.offsetHeight);



// function drawUserFromFetching() {
// 	let html = `
// 		<div className="user-datas">
// 			<div className="user-id">
//
// 			</div>
// 			<div className="user-name">
//
// 			</div>
// 			<div className="title">
//
// 			</div>
// 			<div className="changes">
//
// 			</div>
// 		</div>
// 	`
// }



const fetchPosts = fetch("https://jsonplaceholder.typicode.com/posts")
	.then(response => response.json());

const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users")
	.then(response => response.json());

Promise.all([fetchPosts, fetchUsers])
	.then(([postsData, usersData]) => {
		const userIds = usersData.map(user => user.id);
		// console.log(userIds);
		const postIds = postsData.map(posts => posts.userId);
		// console.log(postIds);

		const commonIds = userIds.filter(userId => postIds.includes(userId));

		const postsWrapper = document.querySelector(".posts-wrapper");

		commonIds.forEach((commonId, index) => {
			const post = postsData.find(post => post.userId === commonId);
			const user = usersData.find(user => user.id === commonId);

			if (post && user) {
				const userDatas = document.createElement("div");
				// const postsMainPart = document.createElement("div");

				// postsMainPart.classList.add('posts-main-part');

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

				userName.classList.add('user-name', 'pad');
				userName.textContent = user.username;

				const title = document.createElement('div');
				title.classList.add('title', 'pad');
				title.textContent = post.title;

				const changes = document.createElement('div');
				changes.classList.add('changes');

				userDatas.appendChild(userId);
				userDatas.appendChild(userName);
				userDatas.appendChild(title);
				userDatas.appendChild(changes);
				postsMainPart.appendChild(userDatas);
				postsWrapper.appendChild(postsMainPart);

			}
		});

	})
	.catch(err => {
		console.error("Something went wrong", err);
	})