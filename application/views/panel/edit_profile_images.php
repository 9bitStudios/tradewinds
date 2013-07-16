<?php $this->load->view('shared/header'); ?>
	
<div class="row">

    <div class="twelve columns">
	<div class="postContent">	

	    <h1>Edit Profile Images</h1>

		<p><?php profile_image(); ?></p>

		<?php display_validation_errors(); ?>

		<?php echo form_open_multipart('panel/edit_profile_images_validation');?>

			<input type="file" name="userfile" size="20" />
			<input type="submit" value="Upload" />
		<?php echo form_close(); ?>
	</div>
    </div>
</div>

<?php $this->load->view('shared/footer');?>
