import { TodayTrends } from '../components/homepage/TodayTrends';

export const TrendingPage = () => {
  return (
    <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em', height: "100%"}}>
      <TodayTrends/>
    </div>
  );
};