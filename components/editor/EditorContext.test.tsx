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
      <span data-testid='image'>{state.image?.url}</span>
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
  it("Should make state image accessible", () => {
    const image = screen.getByTestId("image");
    expect(image).toContainHTML(`${defaults.state.image?.url || ""}`);
  });
  it("Should make state version accessible", () => {
    const image = screen.getByTestId("version");
    expect(image).toContainHTML(`${defaults.state.version}`);
  });
});

const TestDraftComponent: FC = () => {
  const { draft } = useContext(EditorContext);

  return (
    <>
      <span data-testid='width'>{draft.width}</span>
      <span data-testid='height'>{draft.height}</span>
      <span data-testid='text'>{draft.text}</span>
      <span data-testid='image'>{draft?.image}</span>
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
  it("Should make state image accessible", () => {
    const image = screen.getByTestId("image");
    expect(image).toContainHTML(`${defaults.draft.image?.url || ""}`);
  });
});
