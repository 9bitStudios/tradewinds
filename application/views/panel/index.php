<?php $this->load->view('shared/header'); ?>
	
<div class="row">

    <div class="twelve columns">
	<div class="postContent">	

	    <h1>Administration Panel: <?php user_name(); ?></h1>

	    <p><?php profile_image(); ?></p>

	    <p>Cool stuff a happening here...</p>

	    <ul>
		<li><?php edit_profile_images_link(); ?></li>
	    </ul>

	    <?php show_session_data(); ?>

	</div>
    </div>
</div>

<?php $this->load->view('shared/footer');?>
