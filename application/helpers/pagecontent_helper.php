<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function page_title($controller, $action) {

    $pageTitles = array(

	"home" => array (
	    "index" => "Welcome",
	    "login" => "Please login to the application",
	    "login_validation" => "Please login to the application"
	),

	"signup" => array (
	    "index" => "Sign up for a new account",
	    "signup_validation" => "Error"
	),				

	"panel" => array (
	    "index" => "Welcome",
	    "change_password" => "Change your password"
	),	

    );

    if(isset($pageTitles[$controller][$action])) {
	    echo $pageTitles[$controller][$action];
    }
    else {
	    echo 'Application Name';
    }
}

function logo() {
    echo '<a href="'.base_url().'"><img src="'.base_url().'images/logo.png" alt="" /></a>';
}

function top_menu() {
	
    $CI =& get_instance();
    $sess = $CI->session->all_userdata();
    if(isset($sess['is_logged_in']) && $sess['is_logged_in'] == 1)
	echo '<a href="'.base_url().'index.php/panel">My Account</a> | <a href="'.base_url().'index.php/home/logout">Log Out</a>';
	else 
	    echo '<a href="'.base_url().'index.php/home/login">Login</a> | <a href="'.base_url().'index.php/signup">Sign Up</a>';

}

function social_media() {
	
    echo '
    <div class="socialLinks">
	<a href="http://www.9bitstudios.com/rss" class="nbs-social-rss" target="_blank"></a>
	<a href="http://www.9bitstudios.com/contact" class="nbs-social-mail" target="_blank"></a>
	<a href="http://www.twitter.com/9bitstudios" class="nbs-social-twitter" target="_blank"></a>
	<a href="http://www.youtube.com/user/9bitstudios" class="nbs-social-youtube" target="_blank"></a>					
    </div>
    ';

}

function login_link() {
	
    $CI =& get_instance();
    $sess = $CI->session->all_userdata();
    if(isset($sess['is_logged_in']) && $sess['is_logged_in'] == 1)
    	echo '<a href="'.base_url().'index.php/home/logout">Log Out</a>';
	else 
	    echo '<a href="'.base_url().'index.php/home/login">Login</a>';
		
}

function logout_link() {	
    echo '<a href="'.base_url().'index.php/home/logout">Log Out</a>';
}

function signup_link() {	
	
    $CI =& get_instance();
    $sess = $CI->session->all_userdata();
    if(isset($sess['is_logged_in']) && $sess['is_logged_in'] == 1)	
	echo '';
	else
	    echo '<a href="'.base_url().'index.php/signup">Sign Up</a>';
}


function edit_profile_link() {
    echo '<a href="'.base_url().'index.php/panel/edit_profile">Edit Profile</a>';
}

function edit_profile_images_link() {
    echo '<a href="'.base_url().'index.php/panel/edit_profile_images">Edit Profile Images</a>';
}


function profile_image() {

    $CI =& get_instance();
    $sess = $CI->session->all_userdata();
    $imageName = 'default.jpg';
    if(isset($sess['profile_image'])) {
	    $imageName = $sess['profile_image'];
    }
    echo '<img src="'.base_url().'/uploads/'.$imageName.'" />';
}

function display_validation_errors() {
	if(validation_errors() != false) {
		echo '<div class="cancel">';
		echo validation_errors('<div>', '</div>');
		echo '</div>'; 
	}
}