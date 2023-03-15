import React from "react";
import { Song as ISong } from "../../../types/song";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  pauseSong,
  playSong,
  restartSong,
  setSong,
} from "../../../store/ducks/song";
import Actions from "./Actions";
import Bars from "../../Bars";
import {
  Index,
  Description,
  Duration,
  Infos,
  SongWrapper,
  Thumbnail,
  Title,
  SongData,
} from "./styles";
import { secondsToMinutes } from "../../../utils";
interface Props {
  song: ISong;
  index: Number;
}

const Song: React.FC<Props> = ({ song, index }) => {
  const dispatch = useDispatch();
  const playlists = useAppSelector((state) => state.playlists);
  const { id, isPlaying } = useAppSelector((state) => state.song);

  const handlePlayOrPause = () => {
    if (isPlaying) {
      if (id === song.id) {
        dispatch(pauseSong());
      } else {
        dispatch(pauseSong());
        dispatch(restartSong());
        dispatch(setSong(song));
        dispatch(playSong());
      }
    } else {
      dispatch(setSong(song));
      dispatch(playSong());
    }
  };

  return (
    <SongWrapper>
      <SongData onClick={handlePlayOrPause}>
        <Index>{Number(index) + 1}</Index>
        <Thumbnail
          src="/src/assets/images/thumb-32x32.jpg"
          alt="Song thumbnail"
        />
        <Bars isActive={isPlaying && id === song.id} />
        <Infos>
          <Title>
            {window.screen.width < 576 && song.title.length > 24
              ? song.title.slice(0, 24) + "..."
              : song.title}
          </Title>
          <Description>
            {window.screen.width < 576 && song.description.length > 24
              ? song.description.slice(0, 24) + "..."
              : song.description}
          </Description>
        </Infos>
        <Duration>{secondsToMinutes(song.duration)}</Duration>
      </SongData>

      <Actions playlists={playlists} song={song} />
    </SongWrapper>
  );
};

export default Song;
