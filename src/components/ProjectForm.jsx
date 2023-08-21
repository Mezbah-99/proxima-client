import { useState } from 'react'
import { useProjectsContext } from '../hooks/useProjectsContext';

const ProjectForm = () => {
    const [title, setTitle] = useState("");
    const [tech, setTech] = useState("");
    const [budget, setBudget] = useState("");
    const [duration, setDuration] = useState("");
    const [manager, setManager] = useState("");
    const [dev, setDev] = useState("");
    const [error, setError] = useState(null);
    
    const {dispatch} = useProjectsContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // data
        const project = {title, tech, budget, duration, manager, dev};

        // post request
        const res = await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(project)
        });
        const json = await res.json();
        // !req.ok, set error
        if(!res.ok){
            setError(json.error);
        }
        // req.ok, reset
        if(res.ok){
            setTitle('')
            setTech('')
            setBudget('')
            setDuration('')
            setManager('')
            setDev('')
            setError(null)

            console.log("New project has been added to the database.", json)
            dispatch({type: "CREATE_PROJECT", payload: json})
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit} action="" className='project-form flex flex-col gap-5'>
            <h2 className='text-4xl font-medium text-sky-400 mb-10'>Add a new projects.</h2>
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="title" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Project title</label>
                <input 
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text" 
                placeholder='e.g. node.js react.js redux.js' 
                id="title" 
                className='bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300'
                />
            </div>

            <div className="form-control flex flex-col gap-2">
                <label htmlFor="tech" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Technologies</label>
                <input 
                value={tech}
                onChange={e => setTech(e.target.value)}
                type="text" 
                placeholder='e.g. Node.js react.js redux.js vanila.js' 
                id="tech" 
                className='bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300'
                />
            </div>

            <div className="form-control flex flex-col gap-2">
                <label htmlFor="budget" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Budget (in USD)</label>
                <input 
                value={budget}
                onChange={e => setBudget(e.target.value)}
                type="number" 
                placeholder='e.g. $500' 
                id="budget" 
                className='bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300'
                />
            </div>

            <div className="form-control flex flex-col gap-2">
                <label htmlFor="duration" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Duration (IN weeks)</label>
                <input 
                value={duration}
                onChange={e => setDuration(e.target.value)}
                type="number" 
                placeholder='e.g. Duration (IN weeks)' 
                id="duration" 
                className='bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300'
                />
            </div>

            <div className="form-control flex flex-col gap-2">
                <label htmlFor="manager" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Manager</label>
                <input 
                value={manager}
                onChange={e => setManager(e.target.value)}
                type="text" 
                placeholder='e.g. Blackey-baby' 
                id="manager" 
                className='bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300'
                />
            </div>
            
            <div className="form-control flex flex-col gap-2">
                <label htmlFor="dev" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Developers</label>
                <input 
                value={dev}
                onChange={e => setDev(e.target.value)}
                type="text" 
                placeholder='e.g. 5-10' 
                id="dev" 
                className='bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300'
                />
            </div>
            <button type='submit' className='bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300'>Add project</button>
            {error && <p className='bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500'>{error}</p>}
        </form>
    </>
  )
}

export default ProjectForm