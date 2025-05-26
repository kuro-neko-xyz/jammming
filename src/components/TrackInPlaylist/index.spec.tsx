import renderer from "react-test-renderer";
import TrackInPlaylist from ".";

describe("TrackInPlaylist", () => {
  it("should render without crashing", () => {
    renderer.create(
      <TrackInPlaylist
        track={{
          album: "",
          artist: "",
          cover: "",
          name: "",
          uri: "",
        }}
        onTrackClick={jest.fn()}
      />
    );
  });
});
