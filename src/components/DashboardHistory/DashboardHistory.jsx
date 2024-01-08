import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  DashboardSectionTitle,
  GenericButton,
  HistoryCard,
} from 'components';
import './DashboardHistory.css';

const DashboardHistory = () => {
  const [shortHistory, setShortHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('battleHistory'));

    const latestHistory = [
      history[history.length - 1],
      history[history.length - 2],
      history[history.length - 3],
    ];

    setShortHistory(latestHistory.filter((history) => history));
  }, []);

  return (
    <>
      <DashboardSectionTitle sectionTitle={'History'} />
      <div className={'dashboard-history-content'}>
        {shortHistory.length > 0 ? shortHistory.map((battle) => <HistoryCard key={uuidv4()} battle={battle} />) : <p>You did not fight in any battles, yet.</p>}
      </div>
      <Link to={'/dashboard/history'}><GenericButton buttonText={'See full History'} disabled={shortHistory.length === 0} /></Link>
    </>
  );
};

export default DashboardHistory;
