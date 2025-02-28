import { useMemo } from "react"
import { Activity } from "../types"
import CaloriaDisplay from "./CaloriaDisplay";

type CaloriaTrackerProps = {
    activities: Activity[]
}

export default function CaloriaTracker({ activities }: CaloriaTrackerProps) {

    // Contadores
    const caloriasConsumed = useMemo(() => activities.reduce((total, activity) => activity.categoria === 1 ? total + activity.calorias : total, 0), [activities]);
    
    const caloriasBurned = useMemo(() => activities.reduce((total, activity) => activity.categoria === 2 ? total + activity.calorias : total, 0), [activities]);
    
    const netCalorias = useMemo(() => caloriasConsumed - caloriasBurned , [activities]);

    return (
        <>
            <h2 className="font-black text-4xl text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriaDisplay
                    calorias={caloriasConsumed}
                    texto="Consumidas"
                    color="text-lime-500"
                />
                <CaloriaDisplay
                    calorias={caloriasBurned}
                    texto="Consumidas"
                    color="text-orange-500"
                />
                <CaloriaDisplay
                    calorias={netCalorias}
                    texto="Diferencia de Calorias"
                    color="text-white"
                />
            </div>
        </>
    )
}
