const createSectorsArray = (arr) => {
    let newArr = [];
    arr.forEach(element => {
        element.data.forEach(sector => {
          newArr.push(sector.sector);
        })
    });
    return newArr;
};

export default createSectorsArray;
  
  