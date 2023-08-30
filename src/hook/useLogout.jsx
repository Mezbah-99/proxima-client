import { useAuthContext } from "./useAuthContext";
import { useProjectContext } from "./useProjectsContext";
export const useLogout = () => {

    const { dispatch: logoutDispatch } = useAuthContext()
    const { dispatch: projectsDispatch } = useProjectContext()
    const logout = () => {
        // clear local storage
        localStorage.removeItem("user")
        // dispatch logout
        logoutDispatch({type: 'LOGOUT'})
        
        projectsDispatch({type: 'SET_PROJECTS', payload: null})
    }
    return { logout };
}