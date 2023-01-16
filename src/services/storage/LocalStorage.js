class LocalStorage {
  _isExist(key) {
    return !!window.localStorage[key];
  }

  _localStorageGet(key) {
    return window.localStorage[key];
  }

  getAll(key) {
    if (!this._isExist(key)) {
      return {
        success: false,
        data: {},
        error: {
          message: "Key not found.",
        },
      };
    }
    return {
      success: true,
      data: JSON.parse(this._localStorageGet(key)),
      error: {},
    };
  }

  getById(key, id) {
    const response = this.getAll(key);

    if (!response.success) {
      return response;
    }

    const filteredData = response.data[key].find((a) => a.id === id);

    if (!filteredData) {
      return {
        success: false,
        data: {},
        error: {
          message: "value not found.",
        },
      };
    }

    return {
      success: true,
      data: filteredData,
      error: {},
    };
  }

  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  change(key, partOfValue) {
    const response = this.getAll(key);
    let success = false;
    let error = {
      message: "value not changed.",
    };

    if (!response.success) {
      return response;
    }

    const newData = response.data[key].map((item) => {
      if (item.id === partOfValue.id) {
        success = true;
        error = {};
        return { ...partOfValue };
      }
      return item;
    });

    this.set(key, { [key]: newData });
    return {
      success,
      data: newData,
      error,
    };
  }

  clear() {
    window.localStorage.clear();
  }
}

export default new LocalStorage();
