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
    AppendNewMenuItem: function(){
        
        var template = '<li class="tw-admin-menu-item">'
        + '<a class="tw-admin-menu-item-remove tw-button-medium tw-button-black-flat">(-) Remove</a>'
        + '<label>Label:</label><input class="tw-admin-menu-item-label" type="text" />'
        + '<label>URL:</label><input class="tw-admin-menu-item-url" type="text" />'
        + '<label>New Window:</label> <input class="tw-admin-menu-item-new-window" type="checkbox" />'
        + '</li>';        
        jQuery('.tw-admin-menu-sorter').append(template);
        this.AddMenuItemEvents();
    },
    AppendExistingMenuItem: function(label, url, checked){
        
        var template = '<li class="tw-admin-menu-item">'
        + '<a class="tw-admin-menu-item-remove tw-button-medium tw-button-black-flat">(-) Remove</a>'
        + '<label>Label:</label><input class="tw-admin-menu-item-label" type="text" value="'+ label +'" />'
        + '<label>URL:</label><input class="tw-admin-menu-item-url" type="text" value="'+ url +'" />'
        + '<label>New Window:</label> <input class="tw-admin-menu-item-new-window" type="checkbox" '+ checked +' />'
        + '</li>';        
        jQuery('.tw-admin-menu-sorter').append(template);
        this.AddMenuItemEvents();
    },    
    AddMenuItemEvents: function(){
        jQuery('.tw-admin-menu-item-remove').on('click',function(e){
            e.preventDefault();
            jQuery(this).parent().remove();
        });
    },
    SaveMenu: function(menuId, csrfToken, postURL, redirect){
        
        var menuObject = {};
        menuObject.name = $('.tw-admin-menu-name').val();
        var menuArray = [];

        jQuery('.tw-admin-menu-sorter li').each(function(){
            var menuItem = {};
            menuItem.label = jQuery(this).find('.tw-admin-menu-item-label').val();
            menuItem.url = jQuery(this).find('.tw-admin-menu-item-url').val();
            menuItem.newWindow = jQuery(this).find('.tw-admin-menu-item-new-window').is(':checked');
            menuArray.push(menuItem);
        });

        if(menuId && typeof menuId !== "undefined") {
            menuObject.id = menuId;
        }
        menuObject.menu = menuArray;        
        
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