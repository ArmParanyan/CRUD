import {drawUserPosts} from "./postsDraw.js";
import {drawMenu} from "./menu.js";
import {Requests} from "./requests.js";
import {drawCreatePosts} from "./createDraw.js";
import {drawEditPosts} from "./editDraw.js";
import {deleteUserPopup, drawPopup} from "./deleteDraw.js";

const navBar = document.getElementById("nav-bar");


Requests.GET("app.json")
	.then((data) => drawMenu(data));


const postsRequest = Requests.GET("https://jsonplaceholder.typicode.com/posts");
const usersRequest = Requests.GET("https://jsonplaceholder.typicode.com/users");


let deleteID = "";


Promise.all([postsRequest, usersRequest])

	.then(([postsData, usersData]) => {
		drawUserPosts(postsData, usersData);
		return [postsData, usersData];
	})
	.then(([postsData, usersData]) => {
		const button = document.querySelector(".create-button");

		button.addEventListener("click", drawCreatePosts(usersData));

		return usersData;

	})
	.then((usersData) => {
		const edit = document.querySelectorAll(".editable");
		edit.forEach(elem => {
			elem.addEventListener("click", drawEditPosts(usersData));

			// console.log(window.location.hash);

		});
		return usersData;
	})
	.then((userData) => {

		const deleteIcons = document.querySelectorAll(".delete-icon");


		deleteIcons.forEach(item => {
			item.addEventListener("click", () => {
				deleteID = item.getAttribute("alt")
				deleteUserPopup()();
			});
		})
	})
	.then(() => {
		drawPopup();
	})
	.then(() => {

		const deleteButton = document.querySelector(".Delete");

		deleteButton.addEventListener("click", () => {

			fetch(`https://jsonplaceholder.typicode.com/posts/${deleteID}`, {
				method: 'DELETE',
			})
				.then(response => {
					if (response.ok) {
						console.log(`Post with ID ${deleteID} deleted successfully.`);
					} else {
						console.error(`Failed to delete post with ID ${deleteID}. Status: ${response.status}`);
					}
				})
				.catch(error => {
					console.error("An error occurred while trying to delete the post:", error);
				});

		});
	})

	.catch(err => {
		console.error("Something went wrong", err);
	});







