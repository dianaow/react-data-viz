export function sumData(data) {

  const dict = [];

  Object.keys(data).forEach(function(key) {
    const arr = [];
    Object.keys(data[key]).forEach(function(key1) {
      arr.push(data[key][key1])
    })
    const sum = arr.reduce((sum, currentKey) => sum + currentKey, 0);
    dict.push({key:key, value:sum});
  })

  return dict;
};


export function transformData(data) {

  console.log(data);

  const result = data.reduce((r, a, i) => {
    //console.log(r);
    //console.log(a);
    //console.log(i);
    if (i) {
      a.forEach((e, j) => {
        if (j) {
          let key = data[0][j]
          if (!r[key]) r[key] = {}
          r[key][a[0]] = e;
        }
      })
    }
    return r;
  }, {})

};




