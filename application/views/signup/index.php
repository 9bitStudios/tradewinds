<?php $this->load->view('shared/header'); ?>
	
<div class="row">

    <div class="twelve columns">
	<div class="postContent">

	<script type="text/javascript">
	var RecaptchaOptions = {
	   theme : 'custom',
	   custom_theme_widget: 'recaptcha_widget'
	};
	</script>

	<?php echo '<h1>Sign Up</h1>'; ?>

	<p>Welcome to your application. Please sign up by filling out the form below. You will recieve a e-mail confirming your registration. Note that you will have 24 hours to confirm (after which you must sign up again)</p>
	<div class="clearout"></div>
	<?php display_validation_errors(); ?>

	<?php 
	    echo form_open('signup/signup_validation', 'class="appform"'); 

		echo form_label('Email Address', 'email'); 
		echo form_input('email', set_value('email'), 'id="email_address" class="required"'); 
		echo '<div class="clear"></div>';

		echo form_label('Username', 'email'); 
		echo form_input('username', set_value('username'), 'id="username" class="required"'); 
		echo '<div class="clear"></div>';

		echo form_label('Password', 'password'); 
		echo form_password('password', '', 'id="password" class="required"'); 
		echo '<div class="clear"></div>';

		echo form_label('Confirm Password', 'cpassword'); 
		echo form_password('cpassword', '', 'id="cpasswrod" class="required"'); 
		echo '<div class="clearout"></div>';

		echo form_label("Are you human?");
		show_recaptcha();
		echo '<div class="clearout"></div>';
		 		
		echo form_submit('submit', 'Sign Up'); 

	    echo form_close(); 
	?>
	</div>	 
    </div>	 
</div>
<?php $this->load->view('shared/footer');?>
