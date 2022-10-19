const transactionList = ["number", "key", "number", "laptop"]
const newList = transactionList.reduce((prev, curr) => {
            if(curr in prev) {
              prev[curr]++
            } else {
              prev[curr] = 1
            }
            return prev
          }, {})

console.log(newList)