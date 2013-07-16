<?php $this->load->view('shared/header'); ?>
	
<div class="row">

    <div class="twelve columns">
	<div class="postContent">	
	    <h1>Edit Profile</h1>
	    <?php display_validation_errors(); ?>

	    <?php echo form_open('panel/edit_profile_validation', 'id="appForm"'); 
		echo form_label('Username', 'username'); 
		echo form_input('username', set_value('username', get_user_name()), 'id="username" class="required"'); 
		echo '<div class="clear"></div>';

		echo form_label('&nbsp;', 'submit');
		echo form_submit('submit', 'Update'); 
		echo form_close(); 
	    ?>
	</div>
    </div>
</div>

<?php $this->load->view('shared/footer');?>
