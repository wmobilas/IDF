
window._W = window.Weebly = window.Weebly || {};
_W.getUserLanguageURL = function(lang){
	return '//cdn2.editmysite.com/js/lang/%lang%/utl.js?buildTime=1234&'.replace('%lang%', lang);
}
_W.tli=function(s){return s;}
_W.userLang = 'ru';
_W.tl=_W.utl=(function() {
	var f = function(s) {
		var t = tls[s] || s;
		var a = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < a.length; i++) {
			var r = new RegExp('\\{\\{' + i + '}}', 'g');
			t = t.replace(r, a[i]);
		}
		
		return t.replace(/^\\s*(.+?)\\s*$/, '$1');
	},
	return f;
})();
_W.tl=_W.tl||_W.stl;