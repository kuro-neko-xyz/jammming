import renderer from "react-test-renderer";
import SearchBar from ".";

describe("SearchBar", () => {
  it("should render without crashing", () => {
    renderer.create(<SearchBar onTrackClick={jest.fn()} token="test-token" />);
  });
});
