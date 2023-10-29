const navBar = document.getElementById("nav-bar");


export function drawMenu(data, container) {

	const ul = document.createElement("ul");
	let liTitle = document.createElement("h1");


	if (data.group !== undefined) {

		liTitle.innerText = data.group;
		ul.appendChild(liTitle);

	}

	let i = 0;

	for (const key in data) {
		const li = document.createElement("li");


		if (typeof data[key] === "object") {

			li.appendChild(drawMenu(data[key], container));
			ul.appendChild(li);

		} else if (data.title !== undefined) {

			if (i === 0) {


				let img = document.createElement("img");
				img.src = data.icon;

				if (img.src === "./images/Ellipse 145.svg") {

					img.classList.add("hidable", "border");
				}


				li.appendChild(img);


				let p = document.createElement("p");
				p.textContent += `${data.title}`
				p.classList.add("hidable");

				if (p.textContent === "Categories" || p.textContent === "Posts") {

					li.classList.add("add-background-color");
				}

				li.appendChild(p);

				if (data.children.length > 0) {

					const arrowIcon = document.createElement("img");
					arrowIcon.src = "./images/ic_Chevron.svg";
					arrowIcon.style.transform = "rotate(90deg)";
					arrowIcon.classList.add("hidable");

					li.appendChild(arrowIcon);
				}

				// li.classList.add("hidable");
				i++;


				ul.appendChild(li);


			}

		}

	}

	return ul;


}


export async function hideMenuToggle() {
	const menuHidingIcon = document.querySelector(".arrow");

	const menu = document.querySelectorAll(".hidable");


	let isMenuHidden = false;


	const backCol = document.querySelector(".add-background-color");


	menuHidingIcon.addEventListener("click", () => {
		if (isMenuHidden) {
			menu.forEach(item => {
				item.style.display = "flex";
			});

			menuHidingIcon.style.transform = "rotate(0deg)";
			isMenuHidden = !isMenuHidden;

		} else {
			menu.forEach(item => {


				item.style.display = "none";
			});

			menuHidingIcon.style.transform = "rotate(180deg)";
			isMenuHidden = !isMenuHidden;

		}

	});
}

