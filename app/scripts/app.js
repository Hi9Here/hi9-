(function(document) {
  'use strict';
  var userUrl
  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.properties = {userUrl: {computed:"getUserUrl(user.uid, user)"}}
  app.getUserUrl = function(uid, user) {
    if (uid && !userUrl) {
      
      this.$.setuser.url = "https://hi9site.firebaseio.com/users/"+uid+"/user/.json"
      this.$.setuser.headers = {'content-type':'application/json'}
      this.$.setuser.body = JSON.stringify(user)
      this.$.setuser.generateRequest()
      
      userUrl = "https://hi9site.firebaseio.com/users/"+uid
      return "https://hi9site.firebaseio.com/users/"+uid
    } else if (userUrl) {
      return userUrl
    }
  }
  
  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
//     var appName = document.querySelector('#mainToolbar .app-name');
/*     var middleContainer = document.querySelector('#mainToolbar .middle-container'); */
    var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
/*     var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale); */
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
/*     Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer); */

    // Scale bottomContainer and bottom sub title to nothing and back
    // Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
/* 		Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName); */
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };
  app.isAdmin = function(uid) {
    return uid === 'google:100713082423959753395' || uid === 'google:100409610707223082187' || uid === 'google:106104524153779723520'
  }
  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    document.getElementById('mainContainer').scrollTop = 0;
  };
  
  
})(document);
