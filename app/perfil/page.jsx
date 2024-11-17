"use client";

import Page from "@/components/Page/Page";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAuthStore } from "@/store/globalStore";


const PerfilDeUsuario = () => {
  const user = useAuthStore((state) => state.user);
  console.log("🚀 ~ PerfilDeUsuario ~ user:", user)

  return (
      <ProtectedRoute>
        <Page>
          <h1>Perfil de usuario</h1>
        </Page>
      </ProtectedRoute>
  )
}

export default PerfilDeUsuario;
