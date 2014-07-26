var TradewindsAdmin = TradewindsAdmin || { }; 

TradewindsAdmin = (function () {
 
    ConvertToSlug = function(text) {
	return text.trim().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
    };
 
    return {
        ConvertToSlug: ConvertToSlug,
    };
     
})();

