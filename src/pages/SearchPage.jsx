import Search from "../components/Search"
import Sidebar from "../components/Sidebar";


const SearchPage = () => {
    
    return(
        <div className="h-screen w-full ">
       <div className="h-screen flex mx-0 my-0 px-0 py-0 ">
        <Sidebar/>        
        <div className="w-full mr-3">
            <Search />
            </div>
    </div>
    </div>

    )
}
export default SearchPage ; 