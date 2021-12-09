import { Poster } from "./component/Poster";
import { Editor } from "./component/Editor";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <CanvasWrapper>
        <Poster />
      </CanvasWrapper>
      <div className="App-editor">
        <Editor />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  overflow-y: auto;
  grid-template-columns: 6fr 4fr;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CanvasWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
