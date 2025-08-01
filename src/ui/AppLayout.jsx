import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
const isProduction = import.meta.env.VITE_IS_PRODUCTION == "true";
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: ${isProduction ? "calc(100dvh - 56px)" : "100dvh"};
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const Warning = styled.div`
  background-color: var(--color-yellow-700);
  color: var(--color-grey-50);
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function AppLayout() {
  return (
    <>
      {isProduction && (
        <Warning>
          <p>
            {`👋 Data mutations (create, update, delete) are deactivated in this demo
        app`}
          </p>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://vimeo.com/1106615936"
            >
              🔗
              <span style={{ textDecoration: "underline" }}>
                Walkthrough of mutations in the full project
              </span>
            </a>
          </p>
        </Warning>
      )}
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}
