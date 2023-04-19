import {BrowserRouter, Route, Routes} from "react-router-dom"
import { HomePage } from "../../pages/HomePage"
import { Suspense } from "react"

export const Router = () => {
  return (
    <>
    <Suspense fallback={<h1>Loading...</h1>}>

        <BrowserRouter>
        <Routes>
            <Route path="/" Component={HomePage}/>
        </Routes>
        </BrowserRouter>
    </Suspense>
    </>
  )
}
