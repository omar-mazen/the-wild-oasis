import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoutes({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) return children;
}
