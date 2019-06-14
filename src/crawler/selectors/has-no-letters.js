const hasNoLetters = value => !value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/gu)

export default hasNoLetters
