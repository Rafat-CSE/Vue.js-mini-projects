
/*----main application----*/
var app = new Vue({
	el: "#root",
	data: {
		showingAddModal: false,
		showingEditModal: false,
		showingDeleteModal: false,
		errorMessage: "",
		successMessage: "",
		users: [],
		newUser: {name: "", roll: ""},
		clickedUser: {},
	},
	mounted: function(){
		this.getAllUsers();
	},
	methods: {

		/*----to get all users----*/
		getAllUsers: function(){
			axios.get("http://localhost/VueCRUD/api.php?action=read")
			.then(function(response){
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}else{
					app.users = response.data.users;
				}
			});
		},

		/*----to create a new user----*/
		saveUser: function(){
			var formData = app.toFormData(app.newUser);

			axios.post("http://localhost/VueCRUD/api.php?action=create", formData)
			.then(function(response){
				
				app.newUser = {name: "", roll: ""};

				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message;
					app.getAllUsers();
				}
			});
		},

		/*----to update a user----*/
		updateUser: function(){
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/VueCRUD/api.php?action=update", formData)
			.then(function(response){				
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message; 
					app.getAllUsers();
				}
			});
		},

		/*----to delete a user----*/
		deleteUser: function(){
			var formData = app.toFormData(app.clickedUser);

			axios.post("http://localhost/VueCRUD/api.php?action=delete", formData)
			.then(function(response){				
				app.clickedUser = {};
				if(response.data.error){
					app.errorMessage = response.data.message; 
				} else{
					app.successMessage = response.data.message; 
					app.getAllUsers();
				}
			});
		},

		/*----to select unique user----*/
		selectUser(user){
			app.clickedUser = user;
		},

		/*----find the form data and send to api----*/
		toFormData: function(obj){
			var form_data = new FormData();
		      for ( var key in obj ) {
		          form_data.append(key, obj[key]);
		      }
		      return form_data;
		},

		/*----to clear message----*/
		clearMessage: function(){
			app.errorMessage = "";
			app.successMessage = "";
		}
	},
});




