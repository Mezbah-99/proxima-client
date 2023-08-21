import { createContext, useReducer } from "react";



export const ProjectContext = createContext();

const initialState = {
    projects: [],
}
export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PROJECTS":
           return{
            ...state,
            projects: action.payload
            };
        case "CREATE_PROJECT":
            return{
                ...state,
                projects: [action.payload, ...state.projects]
            };
    
        case "DELETE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter(
                (project) => project._id !== action.payload
                ),
            };
        
        default:
            return state;
    }
}
export const ProjectContextProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ProjectContext.Provider value={{...state, dispatch}}>
            {children}
        </ProjectContext.Provider>
    );
}




