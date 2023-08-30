import { useState } from 'react'
import { useProjectContext } from '../hook/useProjectsContext';
import { useAuthContext } from '../hook/useAuthContext';

const ProjectForm = ({ project, setIsModalOpen, setIsOverlayOpen }) => {

    const [title, setTitle] = useState(project ? project.title : '');
    const [tech, setTech] = useState(project ? project.tech : '');
    const [budget, setBudget] = useState(project ? project.budget : '');
    const [duration, setDuration] = useState(project ? project.duration : '');
    const [manager, setManager] = useState(project ? project.manager : '');
    const [dev, setDev] = useState(project ? project.dev : '');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useProjectContext();
    
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in!')
            return;
        }

        // data
        const projectObj = { title, tech, budget, duration, manager, dev };
        // if there is no project , send post req
        if (!project) {
            // post request
            const res = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: {
                    'Content-type': "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(projectObj)
            });
            const json = await res.json();

            // !req.ok, set error
            if (!res.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields)
            }
            // req.ok, reset
            if (res.ok) {
                setTitle('')
                setTech('')
                setBudget('')
                setDuration('')
                setManager('')
                setDev('')
                setError(null)
                setEmptyFields([])
                dispatch({ type: 'CREATE_PROJECT', payload: json })

            }
            return;
        }
        // if there is a project, send patch req
        if (project) {
            // send patch req
            const res = await fetch(`http://localhost:5000/api/projects/${project._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(projectObj)
            });
            const json = await res.json();
            // !res.ok
            if (!res.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }

            // res.ok
            if (res.ok) {
                setError(null);
                setEmptyFields([])

                //dispatch
                dispatch({ type: 'UPDATE_PROJECT', payload: json })
                console.log(json)
                //close overlay and modal
                setIsModalOpen(false)
                setIsOverlayOpen(false)
            }
            return;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} action="" className='project-form flex flex-col gap-5'>
                <h2 className={`text-4xl font-medium text-sky-400 mb-10 ${project ? 'hidden' : ''}`}>Add a new projects.</h2>
                <div className="form-control flex flex-col gap-2">
                    <label htmlFor="title" className='cursor-pointer hover:text-sky hover:text-sky-300 duration-400'>Project title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder='e.g. node.js react.js redux.js'
                        id="title"
                        className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 
                ${emptyFields.includes('title')
                                ? 'border-rose-500'
                                : ' border-slate-500'}`
                        }
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
                        className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 
                ${emptyFields.includes('tech')
                                ? 'border-rose-500'
                                : ' border-slate-500'}`
                        }
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
                        className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 
                ${emptyFields.includes('budget')
                                ? 'border-rose-500'
                                : ' border-slate-500'}`
                        }
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
                        className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 
                ${emptyFields.includes('duration')
                                ? 'border-rose-500'
                                : ' border-slate-500'}`
                        }
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
                        className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 
                ${emptyFields.includes('manager')
                                ? 'border-rose-500'
                                : ' border-slate-500'}`
                        }
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
                        className={`bg-transparent border py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300 
                ${emptyFields.includes('dev')
                                ? 'border-rose-500'
                                : ' border-slate-500'}`
                        }
                    />
                </div>
                <button type='submit' className='bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300'>
                    {project ? "Confirm Update" : "Add project"}
                </button>
                {error && <p className='bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500'>
                    {error}
                </p>}
            </form>
        </>
    )
}

export default ProjectForm