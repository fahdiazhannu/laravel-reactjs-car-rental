import { getWeights, ranking } from './ahp-module';
import { useEffect, useState } from 'react';

const linearAlgebra = require('linear-algebra')();
const Matrix = linearAlgebra.Matrix;

function Ahp() {

  //const c = new Matrix([[1, 0.33, 0.2], [3, 1, 0.14], [5, 7, 1]]);
  //const result = getWeights();
  //{ ev: [ 0.1, 0.19, 0.71 ], ci: 0.12, cr: 0.21 }

  const [v11, setV11] = useState(1);
  const [v22, setV22] = useState(1);
  const [v33, setV33] = useState(1);
  const [v44, setV44] = useState(1);
  const [v21, setV21] = useState();
  const [v31, setV31] = useState();
  const [v41, setV41] = useState();
  const [v32, setV32] = useState();
  const [v42, setV42] = useState();
  const [v43, setV43] = useState();

  const [v12, setV12] = useState();
  const [v13, setV13] = useState();
  const [v14, setV14] = useState();
  const [v23, setV23] = useState();
  const [v24, setV24] = useState();
  const [v34, setV34] = useState();
   
  
  const [result, setResult] = useState(getWeights());
  const matrix = new Matrix([[parseFloat(v11),parseFloat(v12),parseFloat(v13), parseFloat(v14)], [parseFloat(v21),parseFloat(v22),parseFloat(v23), parseFloat(v24)], [parseFloat(v31), parseFloat(v32), parseFloat(v33), parseFloat(v34)], [parseFloat(v41), parseFloat(v42), parseFloat(v43), parseFloat(v44)]]);

  const [ranked, setRanked] = useState([[], [], [], []]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(getWeights(matrix));
    console.log(matrix);
    //setRanked(ranking(result.ev));    
  }

  useEffect(() => {
    console.log('use effect AHP');
    setRanked(ranking(result.ev));
    console.table(result.ev);
  }, [result]);

  return (
    <div className="ahp">

      <h1>AHP - Calculator</h1>
      <br />
      <h2>Pairwaise Comparison</h2>
      <form onSubmit={handleSubmit}>
        <div className="table">

          <table>
            <tr>
              <td></td>
              <th>Jarak</th>
              <th>Chance</th>
              <th>Biaya</th>
              <th>Nilai</th>
            </tr>
            <tr>
              <th >Jarak</th>
              <td><input type="text" value={v11} onChange={(e) => setV11(e.target.value)} disabled/></td>
              <td><input type="text" value={v21} onChange={(e) => {setV21(e.target.value); setV12(1/e.target.value)}}/></td>
              <td><input type="text" value={v31} onChange={(e) => {setV31(e.target.value); setV13(1/e.target.value)}}/></td>
              <td><input type="text" value={v41} onChange={(e) => {setV41(e.target.value); setV14(1/e.target.value)}}/></td>
            </tr>
            <tr>
              <th>Chance</th>
              <td><input type="text" value={v12} onChange={(e) => setV12(e.target.value)} disabled/></td>
              <td><input type="text" value={v22} onChange={(e) => setV22(e.target.value)} disabled/></td>
              <td><input type="text" value={v32} onChange={(e) => {setV32(e.target.value); setV23(1/e.target.value)}}/></td>
              <td><input type="text" value={v42} onChange={(e) => {setV42(e.target.value); setV24(1/e.target.value)}}/></td>
            </tr>
            <tr>
              <th>Biaya</th>
              <td><input type="text" value={v13} onChange={(e) => setV13(e.target.value)} disabled/></td>
              <td><input type="text" value={v23} onChange={(e) => setV23(e.target.value)} disabled/></td>
              <td><input type="text" value={v33} onChange={(e) => setV33(e.target.value)} disabled/></td>
              <td><input type="text" value={v43} onChange={(e) => {setV43(e.target.value); setV34(1/e.target.value)}}/></td>
            </tr>
            <tr>
              <th>Nilai</th>
              <td><input type="text" value={v14} onChange={(e) => setV14(e.target.value)} disabled/></td>
              <td><input type="text" value={v24} onChange={(e) => setV24(e.target.value)} disabled/></td>
              <td><input type="text" value={v34} onChange={(e) => setV34(e.target.value)} disabled/></td>
              <td><input type="text" value={v44} onChange={(e) => setV44(e.target.value)} disabled/></td>
            </tr>
          </table>
          
          
          {/* 
          <input type="text" value={v11} onChange={(e) => setV11(e.target.value)}/>
          <input type="text" value={v21} onChange={(e) => setV21(e.target.value)}/>
          <input type="text" value={v31} onChange={(e) => setV31(e.target.value)}/>
        <br />

          <label htmlFor="">C1</label>
          <input type="text" value={v12} onChange={(e) => setV12(e.target.value)}/>
          <input type="text" value={v22} onChange={(e) => setV22(e.target.value)}/>
          <input type="text" value={v32} onChange={(e) => setV32(e.target.value)}/>
        <br />
        
          <label htmlFor="">C1</label>
          <input type="text" value={v13} onChange={(e) => setV13(e.target.value)}/>
          <input type="text" value={v23} onChange={(e) => setV23(e.target.value)}/>
          <input type="text" value={v33} onChange={(e) => setV33(e.target.value)}/> */}

        </div>
        <br />
        
        <button className="submit">Submit</button>

      </form>
    
      <h2>Results</h2>
      <p>
        Criteria 1: {isNaN(result.ev[0]) ? "" : result.ev[0]}
      </p>
      <p>
        Criteria 2: {isNaN(result.ev[1]) ? "" : result.ev[1]}
      </p>
      <p>
        Criteria 3: {isNaN(result.ev[2]) ? "" : result.ev[2]}
      </p>
      <p>
        Criteria 4: {isNaN(result.ev[3]) ? "" : result.ev[3]}
      </p>
      <p>
        Consistency index: {isNaN(result.ci) ? "" : result.ci}
      </p>
      <p>
        Consistency Ratio: {isNaN(result.cr) ? "" : result.cr}
      </p>
      <br />

      <h2>Ranking</h2>
      
      <p>Rank 1: {isNaN(ranked[0][1]) ? "" : ranked[0][0]} </p>
      <p>Rank 2: {isNaN(ranked[1][1]) ? "" : ranked[1][0]} </p>
      <p>Rank 3: {isNaN(ranked[2][1]) ? "" : ranked[2][0]} </p>
      <p>Rank 4: {isNaN(ranked[3][1]) ? "" : ranked[3][0]} </p>
        



    </div>
  );
}

export default Ahp;
