<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Panel extends CI_Controller {

    function __construct() {
	parent::__construct();

	if(!is_logged_in())
		redirect('home/login');	
    }	

    public function index()
    {	
	$this->load->view('panel/index');
    }

    public function change_password()
    {
	$this->load->view('panel/change_password');
    }	

    public function change_password_validation()
    {
	$this->load->library('form_validation');
	$this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[4]');

	if($this->form_validation->run()) {	

	}
	else {
	    $this->load->view('signup/index');
	}
    }

    public function forgot_password()
    {

    }

    public function edit_profile()
    {
	$this->load->view('panel/edit_profile');	
    }	

    public function edit_profile_validation()
    {

	$this->load->library('form_validation');
	$this->form_validation->set_rules('username', 'Username', 'trim|required|min_length[3]|is_unique[users.username]|is_unique[registrations.username]');	

	if($this->form_validation->run()) {

	    $this->load->model('UsersModel');

	    if($this->UsersModel->update_profile()) {
		$this->session->set_userdata('username', $this->input->post('username'));
		redirect('panel/index');
	    }
	    else
		$this->load->view('panel/edit_profile');
	}
	else {
	    $this->load->view('panel/edit_profile');		
	}

    }

    public function edit_profile_images()
    { 
	$this->load->view('panel/edit_profile_images');			
    }	

    public function edit_profile_images_validation()
    {
	    if($this->upload_profile_image()) {
		redirect('panel/index');
	    }
	    else {
		redirect('panel/edit_profile_images');
	    }
    }	

    private function upload_profile_image()
    {
	$fileName = md5($this->session->userdata('email')).'.jpg';

	$config = array(
	    "upload_path" => './uploads/',
	    "allowed_types" => 'jpg',
	    "max_size" => '1024',
	    "max_width" => '1024',
	    "max_height" => '768',
	    "file_name" => $fileName,
	    "encrypt_name" => TRUE,				
	    "overwrite" => TRUE,
	);

	$this->load->library('upload', $config);

	if ($this->upload->do_upload())
	{
	    $this->load->model('UsersModel');
	    if($this->UsersModel->update_profile_image($fileName)) {
		$this->session->set_userdata('profile_image', $fileName);			
		return true;
	    }
	    else
		return false;
	}
	else
	{
		return false;
	}
    }	

}
