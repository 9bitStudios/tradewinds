<?php $this->load->view('shared/header'); ?>

<div class="row">

    <div class="twelve columns">
	<div class="postContent">

	    <h1>Welcome</h1>
	    Welcome to this application. You can <?php login_link(); ?> 
	    or if you don't have an account you can <?php signup_link(); ?>

	</div>	 
    </div>	 
</div>

<?php $this->load->view('shared/footer'); ?>