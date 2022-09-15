const toggleButton = document.getElementById('toggle-button');
const naviList = document.getElementById('navi-list');

// toggleButton.addEventListener('click', () => {
//     naviList.classList.toggle('active');

// })

/*----------------------------------------------------------------------------------------*/


// for (let i = 0; i <= 2; i++) {
//     document.getElementsByClassName('mask')[i].style.display = "none";
// }

function myonmou1() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(1) > img').style.transform = 'scale(1.2)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(1) > div').style.transform = 'scale(1.2)';
    // document.getElementsByClassName('mask')[0].style.display = "block";
}

function myonmou2() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(2) > img').style.transform = 'scale(1.2)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(2) > div').style.transform = 'scale(1.2)';
    // document.getElementsByClassName('mask')[1].style.display = "block";
}

function myonmou3() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(3) > img').style.transform = 'scale(1.2)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(3) > div').style.transform = 'scale(1.2)';
    // document.getElementsByClassName('mask')[2].style.display = "block";
}


function myout() {
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(1) > img').style.transform = 'scale(1)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(2) > img').style.transform = 'scale(1)';
    document.querySelector('#team > div > div.col-md-8.row > div:nth-child(3) > img').style.transform = 'scale(1)';
}

/*----------------------------------------------------------------------*/

function projectMyonmou1() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(1) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou2() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(2) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou3() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(3) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou4() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(4) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou5() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(5) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou6() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(6) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou7() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(7) > img').style.transform = 'scale(1.2)';
}
function projectMyonmou8() {
    document.querySelector('#portfolio > div.row.ourPortfolio-listItem > div:nth-child(8) > img').style.transform = 'scale(1.2)';
}

function projectMyout() {
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(1) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(2) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(3) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(4) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(5) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(6) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(7) > img").style.transform = 'scale(1)';
    document.querySelector("#portfolio > div.row.ourPortfolio-listItem > div:nth-child(8) > img").style.transform = 'scale(1)';
}

// function showConfirmModalDialog(id){
//     $('#yesOption'.attr('href', '/users/deleteUser/' +id));
//     $('deleteModal').modal('show')
// }

// $(document).ready(function () {

// 	// Denotes total number of rows
// 	var rowIdx = 0;

// 	// jQuery button click event to add a row
// 	$('#addBtn').on('click', function () {

// 		// Adding a row inside the tbody.
// 		$('#tbody').append(`<tr id="R${++rowIdx}">
// 			<td class="row-index text-center">
// 			<p>Row ${rowIdx}</p>
// 			</td>
// 			<td class="text-center">
// 				<button class="btn btn-danger remove"
// 				type="button">Remove</button>
// 				</td>
// 			</tr>`);
// 	});

// 	// jQuery button click event to remove a row.
// 	$('#tbody').on('click', '.remove', function () {

// 		// Getting all the rows next to the row
// 		// containing the clicked button
// 		var child = $(this).closest('tr').nextAll();

// 		// Iterating across all the rows
// 		// obtained to change the index
// 		child.each(function () {

// 		// Getting <tr> id.
// 		var id = $(this).attr('id');

// 		// Getting the <p> inside the .row-index class.
// 		var idx = $(this).children('.row-index').children('p');

// 		// Gets the row number from <tr> id.
// 		var dig = parseInt(id.substring(1));

// 		// Modifying row index.
// 		idx.html(`Row ${dig - 1}`);

// 		// Modifying row id.
// 		$(this).attr('id', `R${dig - 1}`);
// 		});

// 		// Removing the current row.
// 		$(this).closest('tr').remove();

// 		// Decreasing total number of rows by 1.
// 		rowIdx--;
// 	});
// 	});


//check format email
function validation(){
	var form = document.getElementById("form");
	var email = document.getElementById("email").value;
	var text = document.getElementById("text");
	var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

	if(email.match(pattern)){
		form.classList.add("valid");
		form.classList.remove("invalid");
		text.innerHTML="Your Email Address in Valid.";
		text.style.color = "#00ff00";
	}else{
		form.classList.remove("valid");
		form.classList.add("invalid");
		text.innerHTML="Please Enter Valid Email Address";
		text.style.color = "#ff0000";
	}
	if(email==""){
		form.classList.remove("valid");
		form.classList.remove("invalid");
		text.innerHTML="";
		text.style.color = "#00ff00";
	}
}


//react
// var listCoursesBlock = 
// document.querySelector('#list-users')

// var co








