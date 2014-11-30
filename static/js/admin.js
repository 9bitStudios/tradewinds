var Tradewinds = Tradewinds || { }; 

Tradewinds.Admin = {
 
    Utilities: {
        
        CookieHandler: {
            
            createCookie: function (name, value, days) {

               var expires;
               if (days) {
                   var date = new Date();
                   date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                   expires = "; expires=" + date.toGMTString();
               } else {
                   expires = "";
               }
               document.cookie = name + "=" + value + expires + "; path=/";
           },

           readCookie: function (name) {
               var nameEQ = name + "=";
               var ca = document.cookie.split(';');
               for (var i = 0; i < ca.length; i++) {
                   var c = ca[i];
                   while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
                   if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
               }
               return null;
           },

           destroyCookie: function (name) {
               this.createCookie(name, "", -1);
           }           
        },
        
        URLInformation: {
            
            urlContains: function (pathArray, keepQueryString) {

                var url, baseurl;

                if (!keepQueryString || typeof keepQueryString === "undefined") {
                    url = window.location.href;
                    baseurl = url.split("?")[0];
                } else {
                    baseurl = window.location.href;
                }

                for (var i = 0; i < pathArray.length; i++) {
                    if (baseurl.indexOf(pathArray[i]) === -1 && baseurl.indexOf(pathArray[i].toLowerCase()) === -1) {
                        return false;
                    }
                }
                return true; // did we reach the end? everything passed
            },

            hasParameter: function (name) {

                // Get query string
                var fullQString = window.location.search.substring(1);

                if (fullQString.length > 0) {

                    // Split string
                    var paramArray = fullQString.split("&");

                    //Loop through params, check if parameter exists.  
                    for (var i = 0; i < paramArray.length; i++) {
                        var currentParameter = paramArray[i].split("=");
                        if (currentParameter[0] === name) { //Parameter already exists in current url
                            return true;
                        }
                    }
                }

                return false;
            },
            
            getParameter: function (name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            }            
        }
    },
 
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