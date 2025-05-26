import renderer from "react-test-renderer";
import Option from ".";

describe("Option", () => {
  it("should render without crashing", () => {
    renderer.create(
      <Option
        track={{
          album: "",
          artist: "",
          cover: "",
          name: "",
          uri: "",
        }}
        onClick={jest.fn()}
      />
    );
  });
});
