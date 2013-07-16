<?php $this->load->view('shared/header'); ?>

<div class="row">
    <div class="twelve columns">
	<div class="postContent">

	    <?php echo '<h1>Change Your Password</h1>'; ?>

	    <?php display_validation_errors(); ?>


	    <?php echo form_open('panel/update_password', 'class="appform"'); 

		echo form_label('Old Password', 'password'); 
		echo form_password('opassword', '', 'id="opassword" class="required"'); 	
		echo '<div class="clear"></div>';				

		echo form_label('New Password', 'npassword'); 
		echo form_password('npassword', '', 'id="npassword" class="required"'); 	
		echo '<div class="clear"></div>';	

		echo form_label('Confirm New Password', 'cnpassword'); 
		echo form_password('cnpassword', '', 'id="cnpassword" class="required"'); 	
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