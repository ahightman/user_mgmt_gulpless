var firstName = document.querySelector('.first-name');
var lastName = document.querySelector('.last-name');
var email = document.querySelector('.user-email');
var formInput = document.querySelector('.user-form');
var userStore = ObjectStore();
var userArray = userStore.query();
var userList = document.querySelector('.user');

var clearForm = function () {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
};


formInput.addEventListener('submit', function(e) {
  e.preventDefault();
  e.stopPropagation();
  addUser();
});


function addUser() {
  var newUser = User({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value
  });

  if(userStore.add(newUser)) {

    displayUser(newUser);

//Display each new user listing as it is added
function displayUser() {
  userDisplayDiv = createUserDisplayDiv();
  userDisplayDiv.appendChild(displayUserName(newUser));
  userDisplayDiv.appendChild(displayUserEmail(newUser));
  userDisplayDiv.appendChild(editButton(newUser));
  userDisplayDiv.appendChild(deleteButton(newUser));
  userList.appendChild(userDisplayDiv);

  return userDisplayDiv;

    function createUserDisplayDiv () {
      var userDisplayDiv = document.createElement('div');
      userDisplayDiv.className='user-div';
      return userDisplayDiv;
    }

    //Create a span containing user full name
    function displayUserName (user) {
      var userNameSpan = document.createElement('span');
      var userNameString = document.createTextNode(newUser.firstName + ' ' + newUser.lastName);
      userNameSpan.className = 'column user-name-span';
      userNameSpan.appendChild(userNameString);
      return userNameSpan;
    }

    // //Create a span containing user full name
    // function displayLastName (user) {
    //   var lastNameSpan = document.createElement('span');
    //   var lastNameString = document.createTextNode(newUser.lastName);
    //   lastNameSpan.className = 'column last-name-span';
    //   lastNameSpan.appendChild(lastNameString);
    //   return lastNameSpan;
    // }

    //Create a link element to display user email
    function displayUserEmail (user) {
      var userEmailLink = document.createElement('a');
      userEmailLink.className = 'column user-email-link';
      userEmailLink.href = 'mailto:' + newUser.email;
      userEmailLink.textContent = newUser.email;
      return userEmailLink;
    }

    //Create a delete button to remove user when clicked
    function deleteButton (user) {
      var deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'DELETE';
      return deleteButton;
    }

    function editButton (user) {
      var editButton = document.createElement('button');
      editButton.className = 'edit-button';
      editButton.textContent = 'EDIT';
      return editButton;
    }

    deleteButton.addEventListener ('click', function() {
      userStore.remove(user);
      refreshList();
    });

  }

    clearForm();
}

else {
  throw 'User already exists';
}

}

function refreshList() {
  userArray();
  clearList();
  for (var i = 0; i < userArray.length; ++i) {
    document.querySelector('.user').appendChild(userList(userArray[i]));
  }
}

    
// userArray.forEach(displayUser())
//
// function displayUser () {
//   var fullNameString = document.createTextNode(fullName);
//   var email = document.createTextNode(newUser.email);
//   var nameSpan = document.createElement('span').appendChild(fullNameString);
//   var emailSpan = document.createElement('span').appendChild(email);
//   document.getElementById('user-list').appendChild(nameSpan);
// }
//



  // var displayNewUser = "";
  //
  // for (var i = 0; i < userArray.length; ++i) {
  //   displayNewUser += "<li class='user-list'>" + userArray[i].firstName + ' ' + userArray[i].lastName + ' ' + userArray[i].email
  // }
  //
  // displayNewUser.concat(displayNewUser);
  // userUl.innerHTML = displayNewUser;
