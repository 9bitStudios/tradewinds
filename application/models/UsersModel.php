<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class UsersModel extends CI_Model {

    function __construct() {

    }

    /* Returns an array of useful user info or null if nothing found */
    public function get_user_info($email) {

	$this->db->where('email', $email)->limit(1);
	$q = $this->db->get('users');

	if($q) {
		$row = $q->row();
		$userInfo = array(
			"id" => $row->id,
			"username" => $row->username,
			"profile_image" => $row->profile_image
		);

		return $userInfo;
	}
	else {
		return null;			
	}			

    }

    public function can_log_in() {

	$q = $this
		->db
		->where('email', $this->input->post('email'))
		->where('password', sha1($this->input->post('password')))
		->limit(1)
		->get('users'); 		

	if($q->num_rows() > 0) {
	    return true;
	}
	else {
	    return null;			
	}	

    }

    public function add_registration($key) {

	$data = array(
	    'username' => $this->input->post('username'),
	    'email' => $this->input->post('email'),
	    'password' => sha1($this->input->post('password')),
	    'key' => $key
	);

	$q = $this
	    ->db
	    ->insert('registrations', $data);
	if($q) {
	    return true;
	}
	else {
	    return false;
	}

    }	

    public function is_valid_key($key) {
	$this->db->where('key', $key);
	$q = $this->db->get('registrations');

	if($q->num_rows() == 1) {
	    return true;
	}
	else 
	    return false;
    }

    public function add_user($key) {

	$this->db->where('key', $key);
	$temp_user = $this->db->get('registrations');

	if($temp_user) {
	    $row = $temp_user->row();

	    $data = array(
		'username' => $row->username,				
		'email' => $row->email,
		'password' => $row->password,
		'active' => 1
	    );

	    $q = $this->db->insert('users',$data);

	    if($q) {
		$this->db->where('key', $key);
		$this->db->delete('registrations');
		return true;
	    }
	    else {
		return false;
	    }

	}
    }

    public function update_profile() {

	$updateData = array(
	    "username" => $this->input->post('username')
	);

	$q = $this
		->db
		->where('email', $this->session->userdata('email'))
		->update('users', $updateData);

	if($q) {
	    return true;
	}
	else {
	    return false;
	}
    }

    public function update_profile_image($image) {

	$updateData = array(
	    "profile_image" => $image
	);

	$q = $this
		->db
		->where('email', $this->session->userdata('email'))
		->update('users', $updateData);

	if($q) {
	    return true;
	}
	else {
	    return false;
	}
    }				
	
}
