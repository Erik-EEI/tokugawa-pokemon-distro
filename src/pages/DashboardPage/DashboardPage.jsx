import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  DashboardAdventure,
  DashboardHistory,
  DashboardMarket,
  DashboardSummary,
  DashboardTeam,
} from 'components';
import './DashboardPage.css';

const DashboardPage = () => {
  const loader = useLoaderData();

  useEffect(() => {
    localStorage.setItem('newPlayer', JSON.stringify(false));
  }, []);

  return (
    <main className={'dashboard-layout'}>
      <section className={'summary-layout'}>
        <DashboardSummary flashDealFetch={loader} flashDealPokemonValue={Math.floor((loader.stats[1].base_stat * 10) * 0.85)} />
      </section>
      <section className={'team-layout'}>
        <DashboardTeam />
      </section>
      <section className={'marketplace-layout'}>
        <DashboardMarket />
      </section>
      <section className={'adventure-layout'}>
        <DashboardAdventure />
      </section>
      <section className={'history-layout'}>
        <DashboardHistory />
      </section>
    </main>
  );
};

export default DashboardPage;
