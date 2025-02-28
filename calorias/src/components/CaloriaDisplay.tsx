type CaloriaDisplayProps = {
    calorias: number,
    texto: string,
    color: string
}

export default function CaloriaDisplay({ calorias, texto, color }: CaloriaDisplayProps) {
    return (
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            <span className={`font-black text-6xl ${color}`} >{calorias}</span>
            {texto}
        </p>
    )
}
