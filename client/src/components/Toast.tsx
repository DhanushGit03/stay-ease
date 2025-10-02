import { useEffect } from "react"

type ToastProps = {
    message : String,
    type : "SUCCESS" | "ERROR",
    onClose : () => void
}

const Toast = ({message, type, onClose} : ToastProps) => {

    const styles = type === "SUCCESS"
        ?" fixed top-4 right-4 bg-green-600 z-50 p-4 rounded-md text-white max-w-md"
        : " fixed top-4 right-4 bg-red-600 z-50 p-4 rounded-md text-white max-w-md"

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)
        
        return () => {
            clearTimeout(timer)
        }

    });
    // const styles = `fixed top-4 right-4 bg-${type === "SUCCESS"?"green":"red"}-600 z-50 p-4 rounded-md text-white max-w-md`
    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    )
}

export default Toast