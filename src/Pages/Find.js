import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { database, txtDB } from '../FirebaseConfig'

const Find = () => {
  const [Data, setData] = useState([]);
  const [searchData, setSearchData] = useState('')
  useEffect(() => {
    getData();
  },[])
  const getData = async () => {
    const valRef = collection(txtDB, 'txtData')
    const datadb = await getDocs(valRef);
    const allData = datadb.docs.map(val => ({ ...val.data(), id: val.id }));
    console.log(allData);
    setData(allData);
  }
  const handleDelete = async (id) => {
    const deleteVall = doc(database, 'txtData', id)
    // console.log(database,'database')
    await deleteDoc(deleteVall)
    console.log('deleted')
  }
  const handleSearchResult=(e)=>{
    e.preventDefault();
    console.log(searchData,'searched Data')
    const filteredData=Data.filter((item,index)=>item.Tags===searchData)
    console.log(filteredData,'filtered data');
    setData(filteredData)
    setSearchData('');
  }

  return (
    <>
    <div style={{display:'flex',justifyContent:'end'}}>
    <nav className="navbar navbar-light bg-light">
  <form className="form-inline" style={{display:'flex',alignItems:'center'}}>
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchData} onChange={(e)=>setSearchData(e.target.value)}/>
    <button style={{marginLeft:'10px'}} className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleSearchResult}>Search</button>
  </form>
</nav>
</div>

    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>

      {
        Data.map((item, index) => {
          return (
            <div key={item.key} className="card" style={{width:"400px",margin:'30px'}}>
              <div className="card-body">
                <div className="card-title">Title: {item.Title}</div>
                {
                  item.imgUrl &&
                  <img src={item.imgUrl} height={'50%'} width={'40%'} className="card-img-top" />
                }
                <h4 className="card-text">Abstract: {item.Abstract}</h4>
                <h4 className="card-text">Article: {item.ArticleText}</h4>
                <h4 className="card-text">Tags: {item.Tags}</h4>
                <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
                <button style={{padding:'5px',backgroundColor:'gray'}} onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>

              )
        })
      }
    </div>
    </>
  )
}

export default Find