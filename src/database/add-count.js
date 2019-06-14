const addCount = (words, db) => {
  words.forEach((newWord) => {
    const { word, count } = newWord
    const exists = db.get('counts').find({ word })
      .value()

    if (exists) {
      const newCount = exists.count + count

      return db.get('counts').find({ word })
        .assign({ count: newCount })
        .write()
    }

    return db.get('counts').push(newWord)
      .write()
  })
}

export default addCount
