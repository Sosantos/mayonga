import styled from "styled-components";

export const OverlayContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 50%;
  z-index: 9999;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #e80537;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;
type LoadingProps = {
  isLoading: boolean;
};

export const Loading: React.FC<LoadingProps> = ({
  isLoading,
}: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <OverlayContainer
          id="loading-container"
          role="alert"
          aria-live="assertive"
          aria-labelledby="loading-spinner"
          aria-describedby="loading-description"
        >
          <LoadingSpinner id="loading-spinner" />
          <span
            id="loading-description"
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: "0",
              margin: "0",
              overflow: "hidden",
            }}
          >
            Carregando, por favor aguarde.
          </span>
        </OverlayContainer>
      )}
    </>
  );
};

export default Loading;
