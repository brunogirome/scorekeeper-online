import { Routes as Switch, Route } from 'react-router-dom';

import { Standings } from '../pages/Standings';
import { Dashboard } from '../pages/Dashboard';

export function Routes() {
  return (
    <Switch>
      <Route path="/scoreboard" element={<Standings />} />
      <Route path="/" element={<Dashboard />} />
    </Switch>
  );
}
