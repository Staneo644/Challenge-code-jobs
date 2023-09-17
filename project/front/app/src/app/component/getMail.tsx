import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { isParameter } from "typescript"
import { userExist, userParam } from "../communication/user"

export function getMail(setEmail:(setMail:string)=>void){
    const pathname = usePathname()
    const searchParams = useSearchParams()

    
    useEffect(() => {
        
        
        const userExist = userParam(searchParams.get('email')??'null');
        const url = `${pathname}?${searchParams}`
        setEmail(searchParams.get('email')??'null')
    }, [pathname, searchParams])

    }