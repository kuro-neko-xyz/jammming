import renderer from "react-test-renderer";
import Playlist from ".";

describe("Playlist", () => {
  it("should render without crashing", () => {
    renderer.create(
      <Playlist
        playlist={[]}
        setPlaylist={jest.fn()}
        onTrackClick={jest.fn()}
        token="test-token"
      />
    );
  });
});
