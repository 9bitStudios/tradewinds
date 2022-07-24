exports.RandomString = function(strLength) {
    if(typeof strLength === 'undefined') { 
	    strLength = 8;
    }

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < strLength; i++ ) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;		
};

exports.GetFileNameWithoutExtension = function(filename) {
    return filename.substring(0,filename.lastIndexOf("."));
};

exports.GetFileExtension = function(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
};

exports.GetFormattedDate = function(date) {

    var month = date.getMonth() + 1; // getMonth() returns 0 -11

    if(month <= 9) {
	    month = '0'+month;
    }

    var day= date.getDate();

    if(day <= 9) {
	    day = '0'+day;
    }    

    return date.getFullYear() + '/' + month + '/' + day;
    
};

exports.GetMenus = function(menuArray){
    var obj = {};
    
    for(var i=0; i < menuArray.length; i++) {
        obj[menuArray[i].name] = JSON.parse(menuArray[i].data);
    }
    return obj;
    
};
