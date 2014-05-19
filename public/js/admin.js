tinymce.init({
    selector: "textarea.tw-editor",
    plugins: [
	"advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
	"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
	"save table contextmenu directionality emoticons template paste textcolor"
   ],    
 });

jQuery(document).ready(function(){
    jQuery(".postDatepicker").datepicker({dateFormat : "yy/mm/dd"});
});