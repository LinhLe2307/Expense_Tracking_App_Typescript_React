import ProgressBar from 'react-bootstrap/ProgressBar';

const GraphDisplay = () => {
  return (
    <div>
        <ProgressBar animated  now={60} />
        <ProgressBar animated  now={40} />
    </div>
  )
}

export default GraphDisplay