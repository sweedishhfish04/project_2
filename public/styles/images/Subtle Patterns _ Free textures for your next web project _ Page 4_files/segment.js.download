if (!window.analytics || typeof window.analytics.track !== 'function') {
  window.analytics = undefined
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["setAnonymousId", "trackSubmit","trackClick","trackLink","trackForm","pageview","identify","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.0.1";
  analytics.load('jnS4QsHOCAOeG6XvMDCjD9n9bAcQ53Mb');
  }}();
}
(function() {
  function readVisitorIdCookie() {
    var cookieName = 'visitor_id=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.split('=')[1];
      }
    }
  }
  analytics.setAnonymousId(readVisitorIdCookie());
  analytics.page('pages#designpatterns');
})();
