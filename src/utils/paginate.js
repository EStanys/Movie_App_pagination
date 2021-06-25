export function paginate(items, pageNumber, pageSize) {
  // items [9]
  // number 2
  // pageSize 4

  // items 0-4
  //        4                2               4
  const startIndex = (pageNumber - 1) * pageSize;

  return items.slice(startIndex, startIndex + pageSize);
}

// const nameProperty = 'name'

// const obj = {
//   name: 'bob',
//   age: 39
// }

// obj.name // 'bob
// obj['name'] // bob
// obj.nameProperty // undefined
// obj[nameProperty] // 'bob
