export const getValidationConfig = (type) => {
  switch (type) {
    case 'title':
    case 'publisher':
      return { pattern: /^.{0,30}$/, error: 'Не длиннее 30-ти символов' }
    case 'authorFirstName':
    case 'authorLastName':
      return { pattern: /^.{0,20}$/, error: 'Не длиннее 20-ти символов' }
    case 'pages':
      return {
        pattern: /^([1-9]|[1-9][0-9]{1,3}|10000)$/,
        error: 'Не более 10 000',
      }
    case 'publishedYear':
      return {
        pattern: /180[0-9]|18[1-9][0-9]|19[0-9]{2}|[2-9][0-9]{3}/,
        error: 'Не раньше 1800 года',
      }
    case 'circulationDate':
      return {
        pattern: /180[0-9]|18[1-9][0-9]|19[0-9]{2}|[2-9][0-9]{3}/,
        error: 'Не раньше 01.01.1800',
      }
  }
}
