export type WordCount = {
  word: string,
  count: number
}

/* @todo Get a better lowdb typescript support to remove the mock interface below */
interface mockDatabaseFunction {
  get: (id: string) => {
    find : ({ word }: {word: string}) => {
      value: () => WordCount,
      assign: ({ count }: {count: number}) => {
        write: () => void
    }
    },
    push: (word: WordCount) => {
      write: () => void
    },
  }
}


const addCount = (words: WordCount[], db: mockDatabaseFunction): void => {
  if (!words) {
    return
  }

  words.forEach((newWord) => {
    const { word, count } = newWord
    const exists: WordCount = db.get('counts').find({ word })
      .value()

    if (exists) {
      const newCount = exists.count + count

      db.get('counts').find({ word })
        .assign({ count: newCount })
        .write()

      return
    }

    db.get('counts').push(newWord)
      .write()
  })
}

export default addCount
