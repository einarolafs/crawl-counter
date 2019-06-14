const cleanUpString = (value) => {
  const regex = /^(@|-)|([!-\-/-?[-`{-~¡-¿–-⁊]|÷)|(,|\.)$/gu

  return value.replace(regex, '').replace(regex, '')
}

export default cleanUpString
