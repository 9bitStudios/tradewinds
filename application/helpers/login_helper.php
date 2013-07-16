<?php

function is_logged_in() {
	
    $CI =& get_instance();
    $loggedIn = $CI->session->userdata('is_logged_in');

    if (isset($loggedIn) && $loggedIn == 1) { 
	return true; 
    } else { 
	return false; 
    }
}

function user_name() {
	
    $CI =& get_instance();
    $userName = $CI->session->userdata('username');
    echo $userName;
}

function get_user_name() {
	
    $CI =& get_instance();
    $userName = $CI->session->userdata('username');
    return $userName;
}

function user_email() {
	
    $CI =& get_instance();
    $userEmail = $CI->session->userdata('email');
    echo $userEmail;
}

function get_user_email() {
	
    $CI =& get_instance();
    $userEmail = $CI->session->userdata('email');
    return $userEmail;
}

function show_session_data() {

	if(ENVIRONMENT == 'development') {
        $CI =& get_instance();
	    echo '<pre>';
		    print_r( $CI->session->all_userdata() );
	    echo '</pre>';
	}
}

function nocache()
{
    $CI =& get_instance();
    $CI->output->set_header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');
    $CI->output->set_header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
    $CI->output->set_header('Cache-Control: post-check=0, pre-check=0', FALSE);
    $CI->output->set_header('Pragma: no-cache');
}

function send_mail($fromEmail, $fromName, $to, $subject, $message) {

    $CI =& get_instance();
    $CI->load->library('email', array('mailtype'=>'html')); 

    $CI->email->from($fromEmail, $fromName);
    $CI->email->to($to);
    $CI->email->subject($subject);     
    $CI->email->message($message);        

    if($CI->email->send())
	return true;
    else 
	return false;
}

function show_recaptcha() {

    echo '<div id="recaptcha_widget" style="display:none">';

    echo '<div id="recaptcha_image"></div>';
    echo '<div class="clearout"></div>';
    echo '<div class="recaptcha_only_if_incorrect_sol" style="color:red">Incorrect please try again</div>';
    //echo '<span class="recaptcha_only_if_image">Enter the words above:</span>';
    //echo '<span class="recaptcha_only_if_audio">Enter the numbers you hear:</span>';

    echo '<input type="text" id="recaptcha_response_field" name="recaptcha_response_field" />';
    echo '<div class="clear"></div>';
    echo '<div class="recaptcha_icon"><a href="javascript:Recaptcha.reload()"><span class="fa-icon-refresh" style=""></span></a></div>';
   

    echo '<div class="recaptcha_only_if_image recaptcha_icon"><a href="javascript:Recaptcha.switch_type(\'audio\')"><span class="fa-icon-volume-up recaptcha_icon" style=""></span></a></div>';
    echo '<div class="recaptcha_only_if_audio recaptcha_icon"><a href="javascript:Recaptcha.switch_type(\'image\')"><span class="fa-icon-picture recaptcha_icon" style=""></span></a></div>';

    echo '<div class="recaptcha_help"><a href="javascript:Recaptcha.showhelp()">Help</a></div>';

    echo '</div>';

    echo '<script type="text/javascript" src="http://www.google.com/recaptcha/api/challenge?k='.RECAPTCHA_PUBLIC_KEY.'"></script>';

    echo '<noscript>';
        echo '<iframe src="http://www.google.com/recaptcha/api/noscript?k='.RECAPTCHA_PUBLIC_KEY.'" height="300" width="500" frameborder="0"></iframe><br>';
        echo '<textarea name="recaptcha_challenge_field" rows="3" cols="40">';
        echo '</textarea>';
        echo '<input type="hidden" name="recaptcha_response_field" value="manual_challenge">';
    echo '</noscript>';
}