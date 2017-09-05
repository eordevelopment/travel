function gapiLoad() {
    tryAttachedListener();
  }

  function tryAttachedListener() {
    if (!isGapiDefined() || !isAuth2Defined()) {
      setTimeout(tryAttachedListener, 100);
    } else {
      var auth2 = gapi.auth2.getAuthInstance();
      var isSignedIn = auth2.isSignedIn.get();
      if (!isSignedIn) {
        var event = new CustomEvent('signInState', { detail: false });
        window.dispatchEvent(event);
      }
      auth2.isSignedIn.listen(function (val) {
        var event = new CustomEvent('signInState', { detail: val });
        window.dispatchEvent(event);
      });
    }
  }

  function isGapiDefined() {
    try {
      if (gapi) {
        return true;
      }
      return false;
    } catch (ex) {
      return false;
    }
  }

  function isAuth2Defined() {
    try {
      if (gapi.auth2) {
        return true;
      }
      return false;
    } catch (ex) {
      return false;
    }
  }