<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class SignUp extends CI_Controller {

    function __construct() {
	parent::__construct();
    }	

    public function index()
    {
	$this->load->view('signup/index');
    }

    public function thanks()
    {
	$this->load->view('signup/thanks');
    }	

    public function email_confirmation_sent()
    {
	$this->load->view('signup/email_confirmation_sent');
    }		

    public function invalid_key()
    {	
	$pageInfo = array(
	    'heading' => 'Invalid Key',
	    'message' => 'The signup key was invalid. Please try signing up again...'
	);		

	$this->load->view('signup/signup_error', $pageInfo);
    }		

    public function confirmation_error()
    {
	$pageInfo = array(
	    'heading' => 'SignUp Error',
	    'message' => 'There was an error in the sign up process...'
	);			
	$this->load->view('signup/signup_error', $pageInfo);
    }		


    public function signup_validation()
    {
	    $this->load->library('form_validation');
	    $this->form_validation->set_rules('username', 'Username', 'trim|required|min_length[3]|xss_clean|is_unique[users.username]|is_unique[registrations.username]');		
	    $this->form_validation->set_rules('email', 'Email Address', 'trim|required|valid_email|xss_clean|is_unique[users.email]|is_unique[registrations.email]');
	    $this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[5]');
	    $this->form_validation->set_rules('cpassword', 'Confirm Password', 'trim|required|matches[password]|min_length[5]');
	    $this->form_validation->set_rules('recaptcha_response_field', 'Captcha', 'callback_check_recaptcha');
	    $this->form_validation->set_message('is_unique', 'That %s already exists');

	    if($this->form_validation->run()) {

		// send email
		$key = md5(uniqid());
		$this->load->model('UsersModel');
		$message = '<p><a href="'.base_url().'index.php/signup/confirm_registration/'.$key.'">Click here to confirm your accoutn</a></p>';
		$data['confirmLink'] = '<a href="'.base_url().'index.php/signup/confirm_registration/'.$key.'">CONFIRM IT</a>';

		if($this->UsersModel->add_registration($key)) {				

		    if(ENVIRONMENT == "development")	
			    $this->load->view('signup/email_confirmation_sent', $data);

		    /*
		    if(send_mail('no-reply@somewhere.com', 'Sign Up', $this->input->post('email'), 'Please confirm', $message)) {
			    echo 'Sent';
		    }
		    else
			    echo 'Could not send';
		    */
		}
		else {
		    redirect('signup/email_confirmation_sent');
		}	

	    }
	    else {
		$this->load->view('signup/index');
	    }
    }

    public function check_recaptcha() {
	    $this->load->library('recaptcha');	
	    $this->recaptcha->recaptcha_check_answer($_SERVER['REMOTE_ADDR'],$this->input->post('recaptcha_challenge_field'),$this->input->post('recaptcha_response_field'));

	    if($this->recaptcha->is_valid) {
		return true;
	    }
	    else {
		$this->form_validation->set_message('check_recaptcha', 'Captcha was invalid');
		return false;
	    }

    }

    public function confirm_registration($key) {

	$this->load->model('UsersModel');

	if($this->UsersModel->is_valid_key($key)) {

	    if($this->UsersModel->add_user($key)) {
		redirect('signup/thanks');
	    }
	    else {
		redirect('signup/confirmation_error');
	    }
	}
	else {
		redirect('signup/invalid_key');	
	}

    }
	
	
}
