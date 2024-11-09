import { useDispatch } from 'react-redux';
import { searchProductActions } from '../store/searchProduct';
 
function SearchBox({setParPage,setSearchValue,searchValue})  {

    const dispatch = useDispatch();

    const searchHandler = (event) => {
        event.preventDefault();

        dispatch(searchProductActions.changeFilter("hola"));
    };

    return (
        <form onSubmit={searchHandler}>
        <div className='flex justify-between items-center'>
        <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option> 
        </select>
        <input name='filter' className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' /> 
        <button>Search</button>
    </div>
    </form>
    );
}; 

export default SearchBox;