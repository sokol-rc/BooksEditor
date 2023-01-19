class LocalStorage {
  _isExist(key) {
    return !!window.localStorage[key]
  }

  _localStorageGet(key) {
    return window.localStorage[key]
  }

  getAll(key) {
    if (!this._isExist(key)) {
      return
    }
    return {
      data: JSON.parse(this._localStorageGet(key)),
    }
  }

  getById(key, id) {
    const response = this.getAll(key)

    if (!response) {
      return
    }

    const filteredData = response.data[key].find((a) => a.id === id)

    if (!filteredData) {
      return {
        data: {},
      }
    }

    return {
      data: filteredData,
    }
  }

  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  change(key, partOfValue) {
    const response = this.getAll(key)

    if (!response) {
      return
    }

    const newData = response.data[key].map((item) => {
      if (item.id === partOfValue.id) {
        return { ...partOfValue }
      }
      return item
    })

    this.set(key, { [key]: newData })
    return {
      data: newData,
    }
  }

  add(key, partOfValue) {
    const response = this.getAll(key)
    if (!response) {
      return
    }
    const currentData = response.data[key]

    currentData.push(partOfValue)

    this.set(key, { [key]: currentData })
    return {
      data: partOfValue,
    }
  }

  clear() {
    window.localStorage.clear()
  }
}

export default new LocalStorage()
