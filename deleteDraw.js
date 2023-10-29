export  function drawPopup() {
	const html = `
	<div class="popup-container">
        <div class="popup">
            <div class="popup-content">
                <p>Are you sure you want to delete this item?</p>
            </div>
            <div class = buttons-wrapper>
            
            	 <button class="Delete">Delete</button>
             	<button class="close-popup">Close</button>  
             </div>
        </div>
    </div>
	`;

	const tempContainer = document.createElement('div');
	tempContainer.innerHTML = html;

	const postWrapper = document.querySelector(".posts-wrapper");

	postWrapper.appendChild(tempContainer);


}


export function hidePopup() {
	const popupContainer = document.querySelector(".popup-container");
	popupContainer.style.display = "none";
}

export function deleteUserPopup(item,deleteID) {


	return function () {
		drawPopup();

		const popupContainer = document.querySelector(".popup-container");

		popupContainer.style.position = "fixed";
		popupContainer.style.display = "block";

	}
}