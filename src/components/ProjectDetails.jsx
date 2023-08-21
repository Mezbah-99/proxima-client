import { useEffect } from "react";
import { currencyFormatter } from "../utils/currencyFormattor"
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectDetails = ({ project }) => {
  const {_id, title, tech, budget, createdAt, updatedAt, manager, dev, duration} = project;

  const {projects, dispatch} = useProjectsContext();
  const deleteHandle = async () => {
    
      const res = await fetch(`http://localhost:5000/api/projects/${_id}`,{method: 'DELETE'})
      const json = await res.json();
      if(res.ok){
        dispatch({type: "DELETE_PROJECT", payload: json.project._id})
      }
    
  }
  return (
    <div className="project bg-slate-800 p-5 rounded-xl shadow-xl border border-slate-700 flex flex-col gap-5 w-[30rem]">
        <div className="top">
            <span className="text-sky-400">ID: {_id}</span>
            <h3 className="text-3xl font-medium truncate">{title}</h3>
            <span className="uppercase text-xs tracking-widest text-slate-500 font-medium">{tech}</span>
        </div>
        <div className="mid text-slate-300 flex gap-10">
            <div className="left flex flex-col">
                <span>Budget: {currencyFormatter(budget)}</span>
                <span>Added on: {new Date(createdAt).toLocaleDateString()}</span>
                <span>Last Updated: {new Date(updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="right flex flex-col">
              <span>Manager: {manager}</span>
              <span>Developers: {dev}</span>
              <span>Duration: {`${duration} week${duration === 1 ? "" : "s"}`}</span>
            </div>
        </div>
        <div className="bottom flex gap-5">
          <button className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300">Update</button>
          <button className="text-rose-500 hover:underline" onClick={deleteHandle}>Delete</button>
        </div>
    </div>
  )
}

export default ProjectDetails