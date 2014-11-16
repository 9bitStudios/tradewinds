var Tradewinds = Tradewinds || { }; 

Tradewinds.Admin = {
 
    ConvertToSlug: function(text) {
	return text.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    },
    UpdatePath: function(){
        var category = jQuery('.tw-admin-post-category option:selected').attr('data-slug').toLowerCase();
        if(category !== "") {
            category = "/" + category;
        }
        jQuery('.tw-admin-post-path').text(window.location.protocol + '//' + window.location.host + category + '/' + jQuery('.tw-admin-post-slug').val());         
    },
    AddMenuItemEvents: function(){
        jQuery('.tw-admin-menu-item-remove').on('click',function(e){
            e.preventDefault();
            jQuery(this).parent().remove();
        });
    },
    SaveMenu: function(menuObject, csrfToken, postURL, redirect){
        jQuery.ajax({
            url: postURL,
            beforeSend: function (request) {
                request.setRequestHeader("x-csrf-token", csrfToken);
            },
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(menuObject),
            type: 'POST',
            xhrFields: {withCredentials: true}, // required for authenticating session in AJAX request
            success: function(data, textStatus, jqXHR){
                alert('Menu Saved');
                if(redirect && typeof redirect !== 'undefined'){
                    window.location = '/admin/menu/edit/' + data.id;
                }
            },
            error: function(){
                alert('There was an error saving the menu');
            }
        });        
    }
};