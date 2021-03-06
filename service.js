import TrackPlayer, {Event, State} from 'react-native-track-player';
module.exports = async function () {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async e => {
    if (e.permanent === true) {
      TrackPlayer.stop();
    } else {
      if (e.paused === true) {
        const playerState = await TrackPlayer.getState();
        wasPausedByDuck = playerState !== State.Paused;
        TrackPlayer.pause();
      } else {
        if (wasPausedByDuck === true) {
          TrackPlayer.play();
          wasPausedByDuck = false;
        }
      }
    }
  });
};
