
import { useState } from "react" 
import axios from "axios"
const Dashboard = () =>{
    const [form, setForm] = useState({name: '', location:'', reset:false});
    const [data, setData] = useState(null);
    const [error, setError]  = useState(null);
    const [loading, setLoading] = useState({whole:false, card:false});

    const handleLocation = (event)=>{
        setError(null)
        setForm((prev) => ({ ...prev, location: event.target.value}))
    }

    const handleName = (event)=>{
        setError(null)
        setForm((prev) => ({ ...prev, name : event.target.value}))
    }

    const handleFormSubmit= async (event)=>{
        event.preventDefault()
        setError(null)
        setLoading((prev)=>({...prev, whole:true}));
        try{
            const res = await fetch("https://growthproai-assignment-backend-q4gh.onrender.com/business-data", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"name": form.name, "location": form.location})
            });
            const result = await res.json(); 
            if(res.status === 400){
                setError(result.error)
                return;
            }
            setData(result) 
            setForm((prev)=>({...prev, reset:true}))
        }
        catch(err){
            setError("An Error Occured")
        }
        finally{
        setLoading((prev)=>({...prev, whole:false}));
        }
    }

    const resetForm = (event)=>{
        event.preventDefault()
        setError(null)
        setForm((prev)=>({name:'', location:'', reset:false}))
        setData(null)
    }

    const regenerateSEOHeadlines = async (event) => {
        event.preventDefault()
        setError(null)
        setLoading((prev)=>({...prev, card:true}));
        const {name, location} = form;
        try{
            const res = await axios.get('https://growthproai-assignment-backend-q4gh.onrender.com/regenerate-headline', {
            params:{
                name: name,
                location: location
            }
            })
            setData((prev)=> ({ ...prev, headline: res.data.headline}));
        }
        catch(err){
            setError("An Error Occured")
        }
        finally{
        setLoading((prev)=>({...prev, card:false}));
        }
    }

    const Spinner = () => {
        return (
            <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    };

    return(
        <>
        <div className="w-full flex flex-col m-4 p-16 bg-gray-300 rounded-md shadow-md text-center items-center"> 
        <h1 className="text-sm text-blue-900 font-semibold italic text-sm mb-3" >The SEO Headlines Generator Form</h1>
            
        <form onSubmit={handleFormSubmit} className="text-start m-3" >
            <label htmlFor="name" className="font-medium text-lg m-3" >Business Name</label><br/>
            <input id="name" value={form.name} type="text" onChange={handleName} placeholder="Enter your business name" className="text-thin p-1 pr-3 pl-3 m-3 border rounded-md bg-transparent" /><br/>
            <label htmlFor="location" className="font-medium text-lg m-3" >Location</label><br/>
            <input id="location" value={form.location} type="text" onChange={handleLocation}  placeholder="Enter your location" className="text-thin p-1 pr-3 pl-3 m-3 border rounded-md bg-transparent" /><br/>
            {form.reset? (
                <button
            className=" block mx-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 m-3" onClick={resetForm}
            type="button" >
            Reset Details
            </button>
            ):(
            <button
            className=" block mx-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 m-3"
            type="submit" >
            Submit
            </button> )}
            {!error? <p></p>: <p className="text-red-600 text-md font-semibold text-center ">*{error}</p>}
        </form>
        {loading.whole ? (
            <Spinner />) :
            data ? (
                <>
                <h1 className="text-blue-900 text-sm mt-5 mb-5 font-semibold italic text-sm mb-3" >{form.name}'s Details</h1>
                <div className="bg-gray-400 w-full md:w-1/2 shadow-lg rounded-lg p-5 text-start flex flex-col justify-center" >
                    <p className="font-medium text-lg" >Rating- {data.rating}</p>
                    <p className="font-medium text-lg" >Reviews- {data.reviews}</p>
                    {loading.card? (<Spinner/>):<p className="font-medium text-lg" >Headline- {data.headline}</p>}
                    <button className="w-40 block mx-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 m-3"
                        onClick={regenerateSEOHeadlines} >
                        Re-Generate Headline
                    </button> 
                </div>
                </>
                ): 
                (<p></p>)
            } 
            </div> 
        </>
    )
}

export default Dashboard
