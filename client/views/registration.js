import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './registration.html';

Template.register.events({
	// register for one of the events
	'submit form': function(event)
	{
		event.preventDefault();
		// we prevent the default event
		// and get all the values from the 
		// register form
		var email = event.target.registerEmail.value;
		var password = event.target.registerPassword.value;
		var school = event.target.registerSchool.value;
		var student = event.target.registerStudent.value;
		var phone = event.target.registerPhoneNumber.value;
		var needs = event.target.registerNeeds.value;
		var permission = event.target.registerPermission.value;
		// we then create an account using htem
		// upon success, we go to the main page
		Accounts.createUser({email: email, password: password, school: school, student: student, phone: phone, needs: needs, permission: permission},
			function(error)
			{
				if(error)
				{
					console.log("Error: " + error);
				}
				else
				{
					Router.go('/');
				}
			});
		return false;
	}
});

Template.registerCustomService.events({
	'submit form': function(event)
	{
		// this is very similar to the above
		// but is designed for use with 
		// services like twitter and google
		event.preventDefault();
		var school = event.target.registerSchool.value;
		var student = event.target.registerStudent.value;
		var phone = event.target.registerPhoneNumber.value;
		var needs = event.target.registerNeeds.value;
		var permission = event.target.registerPermission.value;
		Meteor.users.update(Meteor.userId(), {$set:
			{'profile.school': school, 'profile.student': student, 'profile.phone': phone, 'profile.needs': needs, 'profile.permission': permission}},
			function(error)
			{
				if(error)
				{
					console.log("Error: " + error);
				}
				else
				{
					Router.go('/');
				}
			});
		event.target.reset();
		return false;
	}
})


Template.login.events({
	// this is all the code needed to login with
	// the various different type of passwords
	'click a#loginFacebook': function(event)
	{
		// all the services have their own login functions
		Meteor.loginWithFacebook({requestPermissions: ['email']},
		function(error)
		{
			if(error)
			{
				return console.log("There was an error: " + error.reason);
			}
			else if(Meteor.user().profile.student == null ||
				Meteor.user().profile.school == null ||
				Meteor.user().profile.needs == null ||
				Meteor.user().profile.permission==null ||
				Meteor.user().profile.phone == null)
			{// if the user doesn't have certain details filled out
			// we redirect them to fill out those details
				Router.go('registerCustomService');
			}
		});
	},
	'click a#loginGoogle': function(event)
	{
		Meteor.loginWithGoogle({requestPermissions: ['email']},
		function(error)
		{
			if(error)
			{
				return console.log("There was an error: " + error.reason);
			}
			else if(Meteor.user().profile.student == null ||
				Meteor.user().profile.school == null ||
				Meteor.user().profile.needs == null ||
				Meteor.user().profile.permission==null ||
				Meteor.user().profile.phone == null)
			{
				Router.go('registerCustomService');
			}
		});
	},
	'click a#loginTwitter': function(event)
	{
		Meteor.loginWithTwitter({requestPermissions: ['email']},
		function(error)
		{
			if(error)
			{
				return console.log("There was an error: " + error.reason);
			}
			else if(Meteor.user().profile.student == null ||
				Meteor.user().profile.school == null ||
				Meteor.user().profile.needs == null ||
				Meteor.user().profile.permission==null ||
				Meteor.user().profile.phone == null)
			{
				Router.go('registerCustomService');
			}
		});
	},
	'submit form' : function(event)
	{
		// this is for normal user accounts
		// to login in
		event.preventDefault();
		var emailVar = event.target.loginEmail.value;
		var passwordVar = event.target.loginPassword.value;
		console.log("Form submitted");
		Meteor.loginWithPassword(emailVar, passwordVar,
		function(err) {
			if(err)
			{
				console.log("Error");
			}
			else
			{
				console.log("Success");
			}
		});
	}
});