import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export const useProjectContext = ()=> {
    const context = useContext(ProjectContext);
    return context;
}