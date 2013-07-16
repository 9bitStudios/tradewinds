<?php $this->load->view('shared/header'); ?>

<div class="row">

    <div class="twelve columns">
	<div class="postContent">

	    <?php echo '<h1>Login to the Administration Panel</h1>'; ?>

	    <p>Welcome to your application. Please login below...</p>
	    <div class="clearout"></div>			
	    <?php display_validation_errors(); ?>

	    <?php echo form_open('home/login_validation', 'class="appform"'); 

		echo form_label('Email Address', 'email', $this->input->post('email')); 
		echo form_input('email', set_value('email'), 'id="email_address" class="required"'); 
		echo '<div class="clear"></div>';

		echo form_label('Password', 'password'); 
		echo form_password('password', '', 'id="password" class="required"'); 	
		echo '<div class="clear"></div>';	

		echo form_label('&nbsp;', 'submit');
		echo form_submit('submit', 'Log in'); 
		echo form_close(); 
	    ?>

	    Don't have an account? <?php signup_link(); ?>

	</div>	 
    </div>	 
</div>

<?php $this->load->view('shared/footer'); ?>