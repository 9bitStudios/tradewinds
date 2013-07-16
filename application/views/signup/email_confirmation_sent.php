<?php $this->load->view('shared/header'); ?>
	
<div class="row">

    <div class="twelve columns">
	<div class="postContent">		

	    <?php echo '<h1>Email Confirmation Sent</h1>'; ?>
	    <p>Email confirmation has been sent to your email...</p>
	    <p>Except confirm it here: <?php echo $confirmLink; ?></p>
	    
	</div>
    </div>
</div>

<?php $this->load->view('shared/footer');?>
