<?php

require_once(APPPATH.'libraries/REST_Controller.php');

class Test extends REST_Controller
{
    public function index_get()
    {
	echo 'Get';
    }

    public function index_post()
    {
        echo 'Post';
    }
    
    public function index_put()
    {
        echo 'Put';
    }
    
    public function index_delete()
    {
        echo 'Delete';
    }    
    
    
}
