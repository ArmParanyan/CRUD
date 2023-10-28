// router.js
import {drawCreateHtml} from "./createDraw.js";
import {Requests} from "./requests";
import {drawMenu} from "./menu";

export function navigateTo(route) {
	window.location.hash = `#/${route}`;
}

export function handleRouting(contentContainer) {
	const path = window.location.hash;


	contentContainer.innerHTML = ""; // Clear the content container

	if (path === "" || path === "#/") {
		// Default route, show posts
		renderDrawUserPosts(contentContainer);
	} else if (path === "#/posts/create") {
		// Show create posts
		drawCreatePosts(contentContainer);
	} else if (path.startsWith("#/posts/edit")) {
		// Extract post ID and show the edit page
		const postId = path.replace("#/posts/edit/", "");
		drawEditPosts(contentContainer, postId);
	} else {
		Requests.GET("app.json")
			.then((data) => drawMenu(data))
			.then(() => drawCreateHtml());
	}


}

const contentContainer = document.getElementById("app-content");

// Listen for hash changes and handle routing
window.addEventListener("hashchange", () => handleRouting(contentContainer));

// Initial routing
handleRouting(contentContainer);
