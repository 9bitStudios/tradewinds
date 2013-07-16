<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

    public function index()
    {	
	$this->load->view('home/index');
    }

    public function login()
    {
	if(is_logged_in()) {
	    $this->load->view('panel/index');	
	}
	else
	    $this->load->view('home/login');			
    }

    public function logout() {
	$this->session->sess_destroy();
	$this->load->view('home/index');
    }	

    public function login_validation()
    {
	$this->load->library('form_validation');
	$this->form_validation->set_rules('email', 'Email Address', 'trim|required|valid_email|xss_clean|callback_validate_credentials');
	$this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[4]|sha1');

	if($this->form_validation->run()) {
	    redirect('panel/index');
	}
	else {
	    $this->load->view('home/login');
	}

    }		

    public function validate_credentials() {

	$this->load->model('UsersModel');

	if($this->UsersModel->can_log_in()) {

	    $userData = $this->UsersModel->get_user_info($this->input->post('email'));

	    $data = array(
		'user_id' => $userData['id'],
		'username' => $userData['username'],
		'email' => $this->input->post('email'),
		'profile_image' => $userData['profile_image'],
		'is_logged_in' => 1, 
		'role' => 0
	    );

	    $this->session->set_userdata($data);
	    return true;
	}
	else {
	    $this->form_validation->set_message('validate_credentials', 'Incorrect username or password');
	    return false;
	}
    }	
}
