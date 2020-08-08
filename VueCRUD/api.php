
<?php 
	
	/*----database connection----*/
	$conn = new mysqli("localhost","root","","vue_db");
	if ($conn->connect_error) {
		echo "Connection Failed";
	}

	/*----main array----*/
	$res = array('error'=>false);

	/*----get data from server----*/
	if (isset($_GET['action'])) {
		$action = $_GET['action'];
	}

	/*----select all data from database----*/
	if ($action == 'read') {
		$users = array();
		$sql = "SELECT * FROM stu_info";
		if ($result = mysqli_query($conn, $sql)) {
			while ( $row = $result->fetch_assoc()) {
				array_push($users, $row);
			}
		}
		$res['users'] = $users;
	}

	/*----insert data into database----*/
	if ($action == 'create') {
		$name = $_POST['name'];
		$roll = $_POST['roll'];
		$sql = "INSERT INTO stu_info(name,roll) VALUES('$name','$roll')";
		if(mysqli_query($conn,$sql)){
			$res['message'] = "Information Created Successfully.";
		}else{
			$res['error'] = true;
			$res['message'] = "Information is not Created.";
		}
	}

	/*----update data from database----*/
	if ($action == 'update') {
		$id = $_POST['id'];
		$name = $_POST['name'];
		$roll = $_POST['roll'];
		$sql = "UPDATE stu_info SET name='$name', roll='$roll' WHERE id='$id'";
		if(mysqli_query($conn,$sql)){
			$res['message'] = "Information Updated Successfully.";
		}else{
			$res['error'] = true;
			$res['message'] = "Information is not Update.";
		}
	}

	/*----Delete data from database----*/
	if ($action == 'delete') {
		
		$id = $_POST['id'];

		$sql = "DELETE FROM stu_info WHERE id='$id'";
		if(mysqli_query($conn,$sql)){
			$res['message'] = "Information Deleted Successfully.";
		}else{
			$res['error'] = true;
			$res['message'] = "Information is not Deleted.";
		}
	}



	$conn->close();
	header("Content-type: application/json");
	echo json_encode($res);
	die();

?>







