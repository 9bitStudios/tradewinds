exports.GetNotification = function(type, id) {
    
    var success = {
		'userAdded': 'User added',
		'userUpdated': 'User updated',
		'userDeleted': 'User deleted',
		'postCreated': 'Post created',
		'postUpdated': 'Post updated',
		'postDeleted': 'Post deleted',
		'categoryCreated': 'Category created',
		'categoryUpdated': 'Category updated',
		'categoryDeleted': 'Category deleted',	
		'menuDeleted': 'Menu deleted',	
		'profileUpdated': 'Profile updated',
		'installSuccess': 'Installation Success'
    };    
    
    var error = {
		'loginFailed': 'Username or password are incorrect',
		'usersNotFound': 'Users were not found',
		'userNotFound': 'This user ID was not found',
		'userAddError': 'There was an error adding the user',
		'userExists': 'Username or email already exists. Please choose a unique username and email',
		'userUpdateError': 'There was an error updating the user',
		'userDeleteError': 'There was an error deleting the user',
		'postsNotFound': 'Posts were not found',
		'postCreateError': 'There was an error creating the post',
		'postUpdateError': 'There was an error updating the post',
		'postDeleteError': 'There was an error deleting the post',
		'categoryNotFound': 'Category was not found',
		'categoriesNotFound': 'Categories were not found',
		'categoryCreateError': 'There was an error creating the category',
		'categoryUpdateError': 'There was an error updating the category',
		'categoryDeleteError': 'There was an error deleting the category',	
		'signupsNotFound': 'Signups were not found',
		'profileError': 'Could not find profile',
		'profileAddError': 'There was an error when creating your profile',
		'profileExists': 'Username or email already exists. Please choose a unique username and email',
		'profileUpdateError': 'There was an error updating your profile',
		'signupEmailSendError': 'There wan an error sending your confirmation email. Please contact support',
		'installError': 'There was an error during installation'
	
    };       
    
    if(type ==='success') {
		return success[id];
    }
    else {
		return error[id];
    }
    
};