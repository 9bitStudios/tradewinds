var TradewindsAdmin = TradewindsAdmin || { }; 

tinymce.init({
    selector: "textarea.tw-admin-editor",
    plugins: [
	"advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
	"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
	"save table contextmenu directionality emoticons template paste textcolor"
   ],    
 });

TradewindsAdmin = (function () {
 
    ConvertToSlug = function(text) {
	return text.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    };
 
    return {
        ConvertToSlug: ConvertToSlug,
    };
     
})();

jQuery(document).ready(function(){
    jQuery(".tw-admin-post-datepicker").datepicker({dateFormat : "yy/mm/dd"});

    function updatePath(){
	var category = jQuery('.tw-admin-post-category option:selected').attr('data-slug').toLowerCase();
	if(category != "") {
	    category = "/" + category;
	}
	jQuery('.tw-admin-post-path').text(window.location.protocol + '//' + window.location.host + category + '/' + jQuery('.tw-admin-post-slug').val());    
    }      
    
    jQuery('.tw-admin-convert-slug').click(function(e) {
	e.preventDefault();
	var text = TradewindsAdmin.ConvertToSlug(jQuery('.tw-admin-post-title').val());
	jQuery('.tw-admin-post-slug').val(text);
	updatePath();
    });
      
    updatePath();
    
    jQuery('.tw-admin-post-category, .tw-admin-post-slug').change(function(){
	updatePath();
    });
    

    
});