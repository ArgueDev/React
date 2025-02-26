import { Dispatch, useMemo } from "react"

import { PencilSquareIcon } from "@heroicons/react/24/outline"

import { Activity } from "../types"
import { categorias } from "../data/categorias"
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

  const categoriaName = useMemo( () =>
    (categoria: Activity['categoria']) => categorias.map(cat => cat.id === categoria ? cat.name : ''),
    [activities]);

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
          <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.categoria === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
              {categoriaName(activity.categoria)}
            </p>
            <p className="text-2xl font-bold pt-5">
              {activity.actividad}
            </p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calorias} {''}
              <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => dispatch({type: 'set-activeId', payload: {id: activity.id}})}
            >
              <PencilSquareIcon
                className="h-8 w-8 text-gray-800 hover:cursor-pointer"
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
