/* eslint-disable @next/next/no-img-element */
"use client";

import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Text from "@/components/Text/Text";
import { useAuthStore } from "@/store/globalStore";


const PerfilDeUsuario = () => {
  const user = useAuthStore((state) => state.user);

  return (
      <ProtectedRoute>
        <Page>
          <PageTitle title={`Bienvenido ${user.fullName}`} />
          <div className="flex w-full">
            <Text variant={"h2"} colorType={"normal-text"}>
              {user.email}
            </Text>
          </div>
        </Page>
      </ProtectedRoute>
  )
}

export default PerfilDeUsuario;
