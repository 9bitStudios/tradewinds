tinymce.init({
    selector: "textarea.tw-editor"
 });

jQuery(document).ready(function(){
    jQuery(".postDatepicker").datepicker({dateFormat : "yy/mm/dd"});
});