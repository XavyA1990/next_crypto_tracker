import Page from "@/components/Page/Page";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Profile from "@/components/Profile/Profile";

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
