import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState ,  useEffect  } from "react";
import "./index.css";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";



function App() {
  const [items, setItems] = useState([]);
  const API_URL='http://localhost:3500/items';
  const [fetchError , setFetchError] = useState(null);
  const [isLoding ,setIsLoding]=useState(true);

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem =listItems.filter((item) => item.id===id)

    const updateOpitions= {
      method :'PATCH',
      headers :{
        'Content-Type' :'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }

    const reqUrl=`${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOpitions)
    if(result) setFetchError(result)
   
  };
  const deleteClick = async (id) => {
    const del = items.filter((item) => item.id !== id);
    setItems(del);

    const delOpitions ={
      method :'DELETE'
    }

    const reqUrl=`${API_URL}/${id}`
    const result = await apiRequest(reqUrl, delOpitions)
    if(result) setFetchError(result)
    
  };

  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOpitions= {
      method :'POST',
      headers :{
        'Content-Type' :'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL , postOpitions)
    if(result) setFetchError(result)
  };

  const [search, setSearch] = useState("");

  useEffect(()=>{
     const fetchItems =async()=>{
      try{
          const response =await fetch(API_URL)
          if(!response.ok) throw Error("Data Not Received")
          const listItems = await response.json();
          setItems(listItems)
          setFetchError(null)
      }  
      catch(err){
         setFetchError(err.message)
      }
      finally{
         setIsLoding(false)
      }
     }
       setTimeout(()=>{
        (async ()=> await fetchItems()) ()
       } ,2000)
  },[])

  return (
    <div className="App">
      <Header title="TO DO LIST" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoding && <p>Loding Items</p> }
        {fetchError && <p>Error: {fetchError}</p> }
      {!isLoding &&  !fetchError && <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        deleteClick={deleteClick}
      />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
