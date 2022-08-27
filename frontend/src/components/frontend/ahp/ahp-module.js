//const linearAlgebra = require('linear-algebra')();
const linearAlgebra = require('linear-algebra')();
const Matrix = linearAlgebra.Matrix;


const ri = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
const defaultValue = new Matrix([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);

//exports.getWeights = function getWeights(c) {
const getWeights = (c = defaultValue) => {
// ERROR HANDLERS

  if (!(c.data)) {
    console.log('ERROR. Matrix argument MUST be a linear-algebra module matrix.');
    return 'ERROR';
  }

  if (c.cols > 15) {
    console.log('ERROR. There are too many criteria to analyse. Try with less than 15.');
    return 'ERROR.';
  }

  // Calculating colum sum

  let j; // Cols
  let i = 0; // Rows
  let colsum = 0;
  let num = 0;
  const colsumArray = [];

  for (j = 0; j < c.cols; j += 1) {
    for (i = 0; i < c.rows; i += 1) {
      num = c.data[i][j];
      colsum = num + colsum;
    }


    colsumArray.push(colsum);

    colsum = 0;
  }

  let mcolsumArray = [];


  i = 0;
  for (i = 0; i < c.rows; i += 1) {
    mcolsumArray.push(colsumArray);
  }

  mcolsumArray = new Matrix(mcolsumArray);


  // Normalised Criteria Matrix


  let nc = [];

  nc = c.div(mcolsumArray);


  // EigenVector
  const ev = [];
  num = 0;
  i = 0;
  j = 0;
  for (i = 0; i < c.rows; i += 1) {
    for (j = 0; j < c.cols; j += 1) {
      num = nc.data[i][j] + num;
    }
    num /= c.cols;

    ev.push(num);
    num = 0;
  }


  j = 0;
  let em = [];
  for (j = 0; j < c.cols; j += 1) {
    em.push(ev);
  }
  em = new Matrix(em);

  // Computing consistency matrix
  const cm = c.mul(em);


  // Weighted sum value
  const wsm = [];
  num = 0;
  i = 0;
  i = 0;
  for (i = 0; i < c.rows; i += 1) {
    for (j = 0; j < c.cols; j += 1) {
      num = cm.data[i][j] + num;
    }
    wsm.push(num);
    num = 0;
  }


  // Lamda
  const lamda = [];
  j = 0;
  for (j = 0; j < c.cols; j += 1) {
    lamda.push(wsm[j] / ev[j]);
  }

  // LamdaMax / EigenVector Maks

  let lamdaMax = 0;
  j = 0;
  for (j = 0; j < c.cols; j += 1) {
    num = lamda[j] + num;
  }
  lamdaMax = num / c.cols;


  // Consistency Index
  let ci = (lamdaMax - c.cols) / (c.cols - 1);
  j = c.cols - 1;
  let cr = ci / ri[j];

  // Rounded values
  j = 0;
  for (j = 0; j < c.cols; j += 1) {
    ev[j] = Math.round(ev[j] * 100) / 100;
  }

  ci = Math.round(ci * 100) / 100;
  cr = Math.round(cr * 100) / 100;

  const resp = { ev, ci, cr , lamdaMax };

  return resp;
}; 

const ranking = (ev) => {
  let namedValue = [["Jarak", ev[0]], ["Chance", ev[1]], ["Biaya", ev[2]], ["Nilai", ev[3]]];
  namedValue = namedValue.sort(function(a, b) {
    // return a[1] - b[1];
    return b[1] - a[1];
  });
  return namedValue;
}

const resultKampus = (kampus) => {

  let budget = [];
  let tempat = [];
  let chance = [];
  let nilai = [];
  let listKampus = [];

  for (let key in kampus) {
      budget.push(kampus[key]['budget']);
      tempat.push(kampus[key]['tempat']);
      chance.push(kampus[key]['chance']);
      nilai.push(1);
      listKampus.push(key);
  }

  const vectorBudget = getWeights(new Matrix([[1, 1/budget[0], 1/budget[1], 1/budget[2], 1/budget[3]], [budget[0], 1, 1/budget[4], 1/1, 1/1], [budget[1], budget[4], 1, 1/1, 1/1], [budget[2], 1, 1, 1, 1/1], [budget[3], 1, 1, 1, 1]]));

  const vectorTempat = getWeights(new Matrix([[1, 1/tempat[0], 1/tempat[1], 1/tempat[2], 1/tempat[3]], [tempat[0], 1, 1/tempat[4], 1/1, 1/1], [tempat[1], tempat[4], 1, 1/1, 1/1], [tempat[2], 1, 1, 1, 1/1], [tempat[3], 1, 1, 1, 1]]));

  const vectorChance = getWeights(new Matrix([[1, 1/chance[0], 1/chance[1], 1/chance[2], 1/chance[3]], [chance[0], 1, 1/chance[4], 1/1, 1/1], [chance[1], chance[4], 1, 1/1, 1/1], [chance[2], 1, 1, 1, 1/1], [chance[3], 1, 1, 1, 1]]));

  const vectorNilai = getWeights(new Matrix([[1, 1/nilai[0], 1/nilai[1], 1/nilai[2], 1/nilai[3]], [nilai[0], 1, 1/nilai[4], 1/1, 1/1], [nilai[1], nilai[4], 1, 1/1, 1/1], [nilai[2], 1, 1, 1, 1/1], [nilai[3], 1, 1, 1, 1]]));

  const ranked = (ev) => {
    let namedValue = [[listKampus[0], ev[0]], [listKampus[1], ev[1]], [listKampus[2], ev[2]], [listKampus[3], ev[3]], [listKampus[4], ev[4]]];
    namedValue = namedValue.sort(function(a, b) {
      //return a[1] - b[1];
      return b[1] - a[1];
    });
    return namedValue;
  }

  let listVector = [vectorBudget['ev'], vectorTempat['ev'], vectorChance['ev'], vectorNilai['ev']];
  let listCriteria = ["budget", "tempat", "chance", "nilai"];
  let result = {};

  for (let i = 0; i < listVector.length; i++) {
    result[listCriteria[i]] = ranked(listVector[i]);
  }

  return listVector;
};



export { getWeights, ranking, resultKampus };