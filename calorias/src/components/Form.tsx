import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"

import { v4 as uuidv4 } from "uuid"

import { categorias } from "../data/categorias"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    categoria: 0,
    actividad: '',
    calorias: 0
}

function Form({dispatch, state}: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if (state.activeId) {
            const selectActivity = state.activities.filter(stateActiviy => stateActiviy.id === state.activeId)[0];
            setActivity(selectActivity);
        }
    }, [state.activeId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        
        const isNumberField = ['categoria', 'calorias'].includes(e.target.id);
        
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        });
    }

    const isValidActivity = () => {
        const { categoria, actividad, calorias } = activity;
        return categoria > 0 && actividad.trim() !== '' && calorias > 0;
    }

    const valueName = () => {
        if (activity.categoria === 1) {
            return 'Guardar Comida';
        } else if (activity.categoria === 2) {
            return 'Guardar Ejercicio';
        } else {
            return 'Guardar Comida o Guardar Ejercicio';
        }
    }

    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="categoria" className="font-bold">Categoria:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    name=""
                    id="categoria"
                    value={activity.categoria}
                    onChange= {handleChange}
                >
                    <option value={0} disabled>-- Selecciona una categoria --</option>
                    {categorias.map(categoria => (
                        <option value={categoria.id} key={categoria.id}>
                            {categoria.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="actividad" className="font-bold">Actividad:</label>
                <input
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    type="text"
                    id="actividad"
                    placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta, etc."
                    value={activity.actividad}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calorias" className="font-bold">Calorias:</label>
                <input
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    type="number"
                    id="calorias"
                    placeholder="Calorias. ej. 200 o 500"
                    min={0}
                    value={activity.calorias}
                    onChange={handleChange}
                />
            </div>
            <input
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:hover:cursor-not-allowed" 
                type="submit"
                value={valueName()}
                disabled={!isValidActivity()}
            />
        </form>
    )
}

export default Form