import './App.css';
// using NPM package
// import SnapshotWebCam from './components/WebcamNPM/Webcam';
import Signature from './components/Signature/SignatureWidget';

import Snapshot from './components/Snapshot/Snapshot'

function App() {
  return (
    <main className="App">
      <Snapshot />
      {/* <SnapshotWebCam /> */}
      <Signature />
    </main>
  );
}

export default App;
