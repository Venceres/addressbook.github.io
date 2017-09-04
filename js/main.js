window.onload = function(){
	var addBtn = document.getElementById('Add');
	var addFormDiv = document.querySelector('.addForm');
	var editFormDiv  = document.querySelector('.editForm');
	var cancelBtn = document.getElementById('Cancel');
    var cancelBtn2 = document.getElementById('Cancel2');
	var saveBtn = document.getElementById('Save');
    var saveBtn2 = document.getElementById('Save2');


	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
	var email = document.getElementById('email');
    var search =document.getElementById('search');

    var fullname2 = document.getElementById('fullname2');
    var phone2 = document.getElementById('phone2');
    var email2 = document.getElementById('email2');

	var addBookDiv = document.querySelector('.addbook');

	addBtn.addEventListener("click", function(){
		addFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		addFormDiv.style.display = "none";
	});

	cancelBtn2.addEventListener("click", function () {
		editFormDiv.style.display = "none";
    });


	saveBtn.addEventListener("click", addToBook);
	addBookDiv.addEventListener("click", removeEntry);
    addBookDiv.addEventListener("click", editEntry);


	var addressBook = [];

	function jsonStructure(fullname,phone,email){
		this.fullname = fullname;
		this.phone = phone;
		this.email = email;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='' && email.value!='';
		if(isNull){
			var obj = new jsonStructure(fullname.value,phone.value,email.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			addFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			if (confirm("Удалить контакт?"))
			{addressBook.splice(remID,1);
                localStorage['addbook'] = JSON.stringify(addressBook);
                showAddressBook();}
                else
			{showAddressBook();}
		}
	}

	function editEntry(e) {
		if(e.target.classList.contains('editbutton')){
            editFormDiv.style.display = "block";
			var editID = e.target.getAttribute('data-id');
            var entry = addressBook[editID];
				fullname2.value = entry.fullname;
           		phone2.value = entry.phone;
            	email2.value = entry.email;


		}
			saveBtn2.addEventListener("click",
			function () {
               fullname = fullname2.value;
               phone = phone2.value;
               email = email2.value;

                var isNull = fullname.value!='' && phone.value!='' && email.value!='';
                if(isNull){

				addressBook.splice(editID, 1);
				addressBook.splice(editID, 0, {"fullname": fullname, "phone":phone, "email":email});
                localStorage['addbook'] = JSON.stringify(addressBook);
                editFormDiv.style.display = "none";
                clearForm();
                showAddressBook();}
            }
			);

    }


	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}
	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="list">';
					str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
                	str += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
					str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
					str += '<div class="btn"><a href="#" class="delbutton" data-id="' + n + '">Удалить</a></div>';
              		str += '<div class="btn"><a href="#" class="editbutton" data-id="' + n + '">Изменить</a></div>';
                str += '</div>';

				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

};
