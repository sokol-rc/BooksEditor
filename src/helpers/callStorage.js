import LocalStorage from '@/services/storage/LocalStorage'

export const callStorage = (args) => {
  const { key, fetchMethod, fetchParam, commit, statusName, types } = args
  const [loading, error] = types

  commit(statusName, loading)

  let response
  switch (fetchMethod) {
    case 'getAll':
      response = LocalStorage.getAll(key)
      break
    case 'getById':
      response = LocalStorage.getById(key, fetchParam)
      break
  }
  if (!response) {
    commit(statusName, error)
  }

  return response
}
