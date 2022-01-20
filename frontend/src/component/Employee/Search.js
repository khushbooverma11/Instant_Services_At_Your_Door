import React ,{useState,Fragment} from 'react'
import './Search.css'
import MetaData from "../layout/MetaData";
const Search = ({ history }) => {

    const [keyword,setKeyword] = useState("");

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()) {
          history.push(`/Employees/${keyword}`);
        }else {
            history.push(`/Employees`);
        }
    }

    return (
        <Fragment>
            <MetaData title="Search"/>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                   type="text"
                   placeholder='Search What u Want...'
                   onChange={(e)=> setKeyword(e.target.value)}
                   />
                   <input type='submit' value="search" />
                </form>
        </Fragment>
    )
}

export default Search
