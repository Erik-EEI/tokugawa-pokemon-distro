import {
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DashboardSectionTitle,
  HistoryRow,
} from 'components';
import { iconLibrary } from 'config';
import './HistoryPage.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const battleHistory = JSON.parse(localStorage.getItem('battleHistory'));

    setHistory(battleHistory);
  }, []);

  return (
    history.length > 0 && <>
      <section className={'statistics'}>
        <DashboardSectionTitle sectionTitle={'Summary'} />
        <div>
          <div className={'history-card'}>
            <p><FontAwesomeIcon icon={iconLibrary.faCrown} /> TOTAL WINS: {history.filter((battle) => battle.isPlayerWon).length}</p>
            <p><FontAwesomeIcon icon={iconLibrary.faSkull} /> TOTAL LOSSES: {history.filter((battle) => !battle.isPlayerWon).length}</p>
            <p><FontAwesomeIcon icon={iconLibrary.faTrophy} /> WINRATE: {(history.filter((battle) => battle.isPlayerWon).length / history.length).toFixed(2) * 100}%</p>
          </div>
          <div className={'history-card'}>
            <p><FontAwesomeIcon icon={iconLibrary.faCrown} /> TOTAL COIN GAINS: {history.filter((battle) => battle.profit > 0).reduce((sum, curr) => sum += curr.profit, 0)}</p>
            <p><FontAwesomeIcon icon={iconLibrary.faSkull} /> TOTAL COIN LOSSES: {history.filter((battle) => battle.profit < 0).reduce((sum, curr) => sum += curr.profit, 0)}</p>
            <p><FontAwesomeIcon icon={iconLibrary.faTrophy} /> BALANCE: {history.reduce((sum, curr) => sum + curr.profit, 0)}</p>
          </div>
        </div>
      </section>
      <section className={'cards-container'}>
        {history.map((battle) => {
          return (
            <article key={battle.id}>
              <HistoryRow battle={battle} />
            </article>
          );
        })}
      </section>
    </>
  );
};

export default HistoryPage;
