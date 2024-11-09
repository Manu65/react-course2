// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

//import classes from './EventsList.module.css';

function ProductsTable({products}) {
  // const events = useLoaderData();

  //let setParPage = 5;
  //let searchValue = "";
  let category = "Burger";

  return  (
    <div className='px-2 lg:px-7 pt-5'>
        <h1 className='text-[#000000] font-semibold text-lg mb-3'>Detail of Products</h1>

     <div className='w-full p-4 bg-[#6a5fdf] rounded-md'> 

     <div className='relative overflow-x-auto mt-5'>
<table className='w-full text-sm text-left text-[#d0d2d6]'>
    <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
    <tr>
        <th scope='col' className='py-3 px-4'>No</th>
        <th scope='col' className='py-3 px-4'>Image</th>
        <th scope='col' className='py-3 px-4'>Short Name</th>
        <th scope='col' className='py-3 px-4'>Category</th>
        <th scope='col' className='py-3 px-4'>Price List</th>
    </tr>
    </thead>

    <tbody>
        {
            products.map((d, i) => <tr key={i}>
            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                <img className='w-[45px] h-[45px]' src={ d.smallPhotoURL} alt="" />
            </td>
            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{ d.shortName}...</td>
            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{ category }</td>
            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{ d.priceList} </td>

             
            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
    <div className='flex justify-start items-center gap-4'>
    <Link to={`/seller/dashboard/edit-product/${d.id}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'> Edit</Link> 

    <Link to={`/seller/dashboard/add-banner/${d.id}`} className='p-[6px] bg-sky-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'> Add </Link> 

    <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'> Check </Link>
    <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'> Delete </Link> 
    </div>
    
    </td>
        </tr> )
        }

        
    </tbody> 
</table> 
</div>  


       
     </div>
    </div>
);
}

export default ProductsTable;
