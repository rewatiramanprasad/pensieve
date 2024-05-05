import { useState,useEffect } from "react";
import "./sumary.css";
import {
  faArrowDown,
  faArrowUp,
  faSearch,
  faGreaterThan,
  faLessThan
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns} />
//     </div>
//   );
// }

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];
// const rows = [
//   {
//     id: 1,
//     DeviceId: "D-1567",
//     DeviceType: "Aircraft",
//     Timestamp: "31-08-2022 10:25",
//     Location: "L2",
//     hell: "->",
//   },
//   {
//     id: 2,
//     DeviceId: "D-1568",
//     DeviceType: "Personal",
//     Timestamp: "31-08-2022 10:25",
//     Location: "L3",
//     hell: "->",
//   },
//   {
//     id: 3,
//     DeviceId: "D-1569",
//     DeviceType: "Asset",
//     Timestamp: "31-08-2022 10:35",
//     Location: "L2",
//     hell: "-->",
//   },
//   {
//     id: 4,
//     DeviceId: "D-1570",
//     DeviceType: "Personal",
//     Timestamp: "31-08-2022 10:35",
//     Location: "L5",
//     hell: "-->",
//   },
//   {
//     id: 5,
//     DeviceId: "D-1571",
//     DeviceType: "Asset",
//     Timestamp: "31-08-2022 10:35",
//     Location: "L6",
//     hell: "->",
//   },
// ];

// const columns = [
//         { field: 'DeviceId', headerName: 'DeviceId', width: 150 },
//         { field: 'DeviceType', headerName: 'DeviceType', width: 150 },
//         { field: 'Timestamp', headerName: 'Timestamp', width: 150 },
//         { field: 'Location', headerName: 'Location', width: 150 },
//         { field: 'hell', headerName: '', width: 150 },

//       ];

const Summary = () => {
  let [data, setData] = useState([]);
  let [mainData, setMainData] = useState([]);
  const [order, setOrder] = useState("ASC");
  let [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  let[search,setSearch]=useState("")
  const[isError,setIsError]=useState(false);
  const[error,setError]=useState("")
  let start=(page-1)*limit;
  console.log(page,search);
  const handlePagination=async()=>{
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    console.log(startIndex,endIndex);

    data=await mainData.slice(startIndex,endIndex);
    // setData(data);
    return data;
    // console.log("over");
  }
  const handlePage=async(data)=>{
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    console.log(startIndex,endIndex);
   let  result=await data.slice(startIndex,endIndex);
    // setData(data);
    return result;
    // console.log("over");
  }
  const handleNextPage = async() => {
    page=page+1;
    setPage(page);
    setData(await handlePagination());
  };
  const handlePreviousPage = async() => {
    if(page>1){
    page-=1;
    setPage(page);
    setData(await handlePagination());
    }
  };
  useEffect(() => {
    const submitHandler = async () => {
        try {
          const response = await fetch(`https://pensieve-api-next.vercel.app/gps/summary`, {
            method:"GET",
            headers: {
              "Content-Type": "application/json",
            },
            
          });
          const dbData = await response.json();
          if(dbData.success){
            console.log("success")
            console.log(dbData.data);
            setMainData(dbData.data);
            setData(await handlePage(mainData));
          }else{
            setIsError(true);
            setError(dbData.message|| "something went wrong");
          }
          
        } catch (error) {
          console.log(error);
          setIsError(true);
          setError(error.message||"something went wrong");


        }
      };
     submitHandler();
    //  let str=`{data:"hello"}`
    //   console.log(JSON.parse(str))
     
  },[]);
  const handleFetch=()=>{}
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  //  let init='&uarr;';
  //  const[buttonText,setButtonText]=useState(init);
  //  const changeText=()=>{
  //     if(buttonText===init)
  //     setButtonText("&darr;");
  //     else if(buttonText==="&darr;"){
  //         setButtonText(init);
  //     }
  //  }
  //console.log(data);
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = data.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  return (
    <div className="summaryMain">
      <div className="  subSummaryMain  ">
        <table className="table">
          <tr>
            <td colSpan="2">
              <div className="searchWrapper">
                <FontAwesomeIcon onClick={handleFetch} className="searchIcon" icon={faSearch} />
                <input
                  className="search"
                  type="text"
                  // value={search}
                  placeholder="search only"
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
              </div>
            </td>
            <td colSpan="3" className="d-flex flex-row"><div className="pagination">{start}-{page*limit}of{mainData.length}</div>
              <div>
                <FontAwesomeIcon className="less than" onClick={handlePreviousPage} icon={faLessThan}/><FontAwesomeIcon  className="greater than"onClick={handleNextPage} icon={faGreaterThan}/>
              </div>
            </td>
          </tr>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                DeviceId
                <FontAwesomeIcon
                  onClick={() => {
                    sorting("DeviceId");
                  }}
                  icon={order === "ASC" ? faArrowUp : faArrowDown}
                />
              </th>
              <th className="hello" scope="col">
                DeviceType
                <FontAwesomeIcon
                  onClick={() => {
                    sorting("DeviceType");
                  }}
                  className="hello"
                  icon={order === "ASC" ? faArrowUp : faArrowDown}
                />
              </th>
              <th scope="col">Timestamp</th>
              <th scope="col">Location</th>
              <th scope="col"> </th>
            </tr>
            
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.DeviceId}</td>
                <td>{d.DeviceType}</td>
                <td>{d.Timestamp}</td>
                <td>{d.Location}</td>
                <td colspan="5">
                  {/* <span className='revelar'><span className='hidden'>see details</span>-&gt;</span> */}
                  <button
                    type="button"
                    class=""
                    data-toggle="tooltip"
                    data-placement="left"
                    title="see details"
                  >
                    
                    <Link className="summaryLink" to={`/gps/details/${d.DeviceId}/${d.DeviceType}`}>
                    -&gt;
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
