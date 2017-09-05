///<reference path="../../../node_modules/@types/gapi/index.d.ts"/>

function gapiLoad(): void {
  tryAttachedListener();
}

function tryAttachedListener(): void {
  if (!isGapiDefined() || !isAuth2Defined()) {
    setTimeout(tryAttachedListener, 100);
  } else {
    const auth2 = (gapi as any).auth2.getAuthInstance();
    const isSignedIn = auth2.isSignedIn.get();
    if (!isSignedIn) {
      const event = new CustomEvent('signInState', { detail: false });
      window.dispatchEvent(event);
    }
    auth2.isSignedIn.listen(function (val) {
      const event = new CustomEvent('signInState', { detail: val });
      window.dispatchEvent(event);
    });
  }
}

function isGapiDefined(): boolean {
  try {
    if (gapi) {
      return true;
    }
    return false;
  } catch (ex) {
    return false;
  }
}

function isAuth2Defined(): boolean {
  try {
    if ((gapi as any).auth2) {
      return true;
    }
    return false;
  } catch (ex) {
    return false;
  }
}
