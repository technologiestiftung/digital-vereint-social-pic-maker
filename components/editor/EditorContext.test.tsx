import { render, screen } from "@utils/testUtil";
import { FC, useContext } from "react";
import { defaults, EditorContext } from "./EditorContext";

const TestStateComponent: FC = () => {
  const { state } = useContext(EditorContext);

  return (
    <>
      <span data-testid='width'>{state.width}</span>
      <span data-testid='height'>{state.height}</span>
      <span data-testid='text'>{state.text}</span>
      <span data-testid='imgUrl'>{state.imgUrl}</span>
      <span data-testid='version'>{state.version}</span>
    </>
  );
};

describe("State", () => {
  beforeEach(() => {
    render(<TestStateComponent />);
  });
  it("Should make state width accessible", () => {
    const width = screen.getByTestId("width");
    expect(width).toContainHTML(`${defaults.state.width}`);
  });

  it("Should make state height accessible", () => {
    const height = screen.getByTestId("height");
    expect(height).toContainHTML(`${defaults.state.height}`);
  });
  it("Should make state text accessible", () => {
    const text = screen.getByTestId("text");
    expect(text).toContainHTML(`${defaults.state.text}`);
  });
  it("Should make state imgUrl accessible", () => {
    const imgUrl = screen.getByTestId("imgUrl");
    expect(imgUrl).toContainHTML(`${defaults.state.imgUrl}`);
  });
  it("Should make state version accessible", () => {
    const imgUrl = screen.getByTestId("version");
    expect(imgUrl).toContainHTML(`${defaults.state.imgUrl}`);
  });
});

const TestDraftComponent: FC = () => {
  const { draft } = useContext(EditorContext);

  return (
    <>
      <span data-testid='width'>{draft.width}</span>
      <span data-testid='height'>{draft.height}</span>
      <span data-testid='text'>{draft.text}</span>
      <span data-testid='imgUrl'>{draft.imgUrl}</span>
    </>
  );
};

describe("Draft", () => {
  beforeEach(() => {
    render(<TestDraftComponent />);
  });
  it("Should make state width accessible", () => {
    const width = screen.getByTestId("width");
    expect(width).toContainHTML(`${defaults.draft.width}`);
  });

  it("Should make state height accessible", () => {
    const height = screen.getByTestId("height");
    expect(height).toContainHTML(`${defaults.draft.height}`);
  });
  it("Should make state text accessible", () => {
    const text = screen.getByTestId("text");
    expect(text).toContainHTML(`${defaults.draft.text}`);
  });
  it("Should make state imgUrl accessible", () => {
    const imgUrl = screen.getByTestId("imgUrl");
    expect(imgUrl).toContainHTML(`${defaults.draft.imgUrl}`);
  });
});
