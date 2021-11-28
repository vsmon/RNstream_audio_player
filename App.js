import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorageStatic,
} from 'react-native';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  Event,
  State,
  Capability,
} from 'react-native-track-player';

export default App = () => {
  const [trackTitle, setTrackTitle] = useState();

  useEffect(() => {
    start();
  }, []);

  useTrackPlayerEvents(
    [
      Event.PlaybackTrackChanged,
      Event.PlaybackState,
      Event.PlaybackError,
      Event.RemotePause,
      Event.RemoteNext,
      Event.RemotePlay,
      Event.RemotePause,
      Event.RemoteStop,
    ],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {id: title} = track || {};
        setTrackTitle(title);
      }
    },
  );

  const play = async () => {
    await TrackPlayer.play();
  };
  const stop = async () => {
    await TrackPlayer.stop();
  };

  const progress = useProgress();
  const playBackState = usePlaybackState();
  async function start() {
    const track = {
      id: 'Kiss FM',
      url: 'https://24923.live.streamtheworld.com/RADIO_KISSFMAAC.aac', //'https://19293.live.streamtheworld.com/JP_NEWSAAC.aac'
    };

    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
      //playIcon: require('./play-icon.png'),
    });

    await TrackPlayer.setupPlayer({maxCacheSize: 5000});
    await TrackPlayer.add(track);

    //play();
  }
  return (
    <View style={Styles.principal}>
      <Text style={{paddingBottom: 100, fontSize: 25}}>MINHAS RADIOS</Text>
      <Text style={Styles.status}>Title: {trackTitle}</Text>
      <Text style={Styles.status}>Progress: {progress.position}</Text>
      <Text style={Styles.status}>Buffer: {progress.buffered}</Text>
      <Text style={Styles.status}>State: {State[playBackState]}</Text>
      {/* <Text>The TrackPlayer is {isPlaying ? 'playing' : 'not playing'}</Text> */}
      <TouchableOpacity style={Styles.playButton} onPress={play}>
        <Text style={Styles.fontButton}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.stopButton} onPress={stop}>
        <Text style={Styles.fontButton}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  principal: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  playButton: {
    backgroundColor: 'green',
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  stopButton: {
    backgroundColor: 'red',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 30,
  },
  fontButton: {
    color: 'white',
    fontSize: 24,
  },
  status: {
    fontSize: 16,
    marginBottom: 20,
  },
});
