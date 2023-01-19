class LocalStorage {
  _isExist(key) {
    return !!window.localStorage[key]
  }

  _localStorageGet(key) {
    return window.localStorage[key]
  }

  getAll(key) {
    if (!this._isExist(key)) {
      return {
        success: false,
        data: {},
      }
    }
    return {
      success: true,
      data: JSON.parse(this._localStorageGet(key)),
    }
  }

  getById(key, id) {
    const response = this.getAll(key)

    if (!response.success) {
      return response
    }

    const filteredData = response.data[key].find((a) => a.id === id)

    if (!filteredData) {
      return {
        success: false,
        data: {},
      }
    }

    return {
      success: true,
      data: filteredData,
    }
  }

  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  change(key, partOfValue) {
    const response = this.getAll(key)
    let success = false

    if (!response.success) {
      return response
    }

    const newData = response.data[key].map((item) => {
      if (item.id === partOfValue.id) {
        success = true
        return { ...partOfValue }
      }
      return item
    })

    this.set(key, { [key]: newData })
    return {
      success,
      data: newData,
    }
  }

  add(key, partOfValue) {
    const response = this.getAll(key)
    if (!response.success) {
      return response
    }
    const currentData = response.data[key]

    currentData.push(partOfValue)

    this.set(key, { [key]: currentData })
    return {
      success: true,
      data: partOfValue,
    }
  }

  clear() {
    window.localStorage.clear()
  }
}

export default new LocalStorage()
