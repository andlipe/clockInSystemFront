/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import api from '../services/api';
import Day from '../components/Day/day';

interface ClockIn {
  [index: number]: {
    _id: string;
    day: string;
    registers: Array<string>;
  };
}

function Dashboard() {
  const [loading, setLoading] = React.useState(true);
  const [allDays, setAllDays] = React.useState<ClockIn>([]);

  const getAllDays = async () => {
    await api
      .get('/clockIn')
      .then((response) => {
        setAllDays(response.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const dayClockIn = () => {
    api
      .post('/clockIn')
      .then(response => setActualDay([...response.data]))
      .catch(err => console.log(err));
  };




  React.useEffect(() => {
    getAllDays();
  }, []);

  if(loading) {
    return <div>Ta carregando</div>
  }

  return (
    <div>

      <button type="submit" onClick={() => dayClockIn()}>
        Ponto inicial
      </button>
      {allDays
        ? allDays.map(today => (
            <div key={today.id}>
              <h1>{today.day}</h1>
              <br />
              <Link href="/dashboard" key={today.id}>pagina</Link>
              <br />
              <Day actualDay={today}/>
            </div>
          ))
        : null}
    </div>
  );
  }

export default Dashboard;
