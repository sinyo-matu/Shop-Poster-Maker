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
  height: 100vh;
  scrollbar-width: none;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  display: grid;
  grid-template-columns: 6fr 4fr;
`;

const CanvasWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
