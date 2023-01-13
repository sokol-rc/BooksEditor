class LocalStorage {
  _isExist(key) {
    return !!window.localStorage[key];
  }

  _localStorageGet(key) {
    return window.localStorage[key];
  }

  get(key) {
    let success = false;
    let error = {
      message: "Key not found.",
    };
    let data = {};

    if (this._isExist(key)) {
      success = true;
      error = {};
      data = this._localStorageGet(key);
    }

    return {
      success,
      data,
      error,
    };
  }

  set(key, value) {
    window.localStorage.setItem(key, value);
  }

  clear() {
    window.localStorage.clear();
  }
}

export default new LocalStorage();
