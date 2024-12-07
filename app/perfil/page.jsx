import Page from "@/components/Page/Page";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Profile from "@/components/Profile/Profile";

export const metadata = {
  title: 'Next Crypto | Perfil',
  description: 'Perfil de usuario, tus datos y preferencias.',
}

const PerfilDeUsuario = () => {

  return (
    <ProtectedRoute>
      <Page>
        <Profile />
      </Page>
    </ProtectedRoute>
  );
};

export default PerfilDeUsuario;
