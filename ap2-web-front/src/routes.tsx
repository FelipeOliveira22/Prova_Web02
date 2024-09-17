import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./_layouts/app-layout";
import { Home } from "./pages/Home";
import { AlunosCurso } from "./pages/alunos-curso";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/alunos-cursos', element: <AlunosCurso /> }
    ]
  }
])