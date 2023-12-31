import { currencyFormatter } from "../utils/currencyFormattor"
import { useProjectContext } from '../hook/useProjectsContext'
import { useAuthContext } from '../hook/useAuthContext'
import moment from "moment";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {
  const { _id, title, tech, budget, createdAt, updatedAt, manager, dev, duration } = project;

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const { dispatch } = useProjectContext();

  const { user } = useAuthContext()
  
  // Delete a project
  const deleteHandelar = async () => {

    if(!user){
      return; // only return means => if not includes user then break this function
    }

    const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/projects/${_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const json = await res.json();
    dispatch({ type: 'DELETE_PROJECT', payload: json.project._id })
  }
  // Update a project
  const handleUpdate = () => {
    setIsModalOpen(true)
    setIsOverlayOpen(true)


  }
  const handleOverlay = () => {
    setIsModalOpen(false)
    setIsOverlayOpen(false)
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
          <span>Added on: {moment(createdAt).format('MMM-DD, hh:mm A')}</span>
          <span>Last Updated: {moment(updatedAt).format('MMM-DD, hh:mm A')}</span>
        </div>
        <div className="right flex flex-col">
          <span>Manager: {manager}</span>
          <span>Developers: {dev}</span>
          <span>Duration: {`${duration} week${duration === 1 ? "" : "s"}`}</span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button className="bg-sky-400 text-slate-900 py-2 px-5 rounded shadow-xl hover:bg-sky-50 duration-300" onClick={handleUpdate}>Update</button>
        <button className="text-rose-500 hover:underline" onClick={deleteHandelar}>Delete</button>
      </div>

      {/* Overlay */}
      <div onClick={handleOverlay} className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 right-0 bottom-0 ${isOverlayOpen ? '' : 'hidden'}`}></div>

      {/* Modal */}
      <div className={`update-modal w-[35rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10 rounded-xl shadow-xl border border-slate-700 z-[2] ${isModalOpen ? '' : "hidden"}`}>
        <h2 className='text-4xl font-medium text-sky-400 mb-10'>Update project</h2>
        <ProjectForm
          project={project}
          setIsModalOpen={setIsModalOpen}
          setIsOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  )
}

export default ProjectDetails