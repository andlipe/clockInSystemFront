import React from 'react';
import api from '../services/api';



const Day: React.FC = actualDay => {
  const [loading, setLoading] = React.useState(true);
  const [registers, setRegisters] = React.useState([]);
  const [id, setId] = React.useState('');

  const handleDeleteRegister = async (id: string, register: string) => {
   await api
      .patch(`/clockIn/${id}`, { time: `${register}` } )
      .then(response => setRegisters(response.data))
      .catch(err => console.log(err));
  };

  const registerClockIn = async (id: string) => {
    await api.put(`/clockIn/${id}`).then(response => setRegisters(response.data)).catch(err => console.log(err));
  };

  React.useEffect(() => {
    setRegisters(actualDay.actualDay);
  }, []);

  React.useEffect(() => {
    setId(registers._id)
    setLoading(false);
  }, [registers])

  if(loading) {
    return <div>Ta carregando</div>
  }

  return (
      <div>
        {registers.registers.map(register => (
          <>
            <p key={register}>{register}</p>
            <button
              type="submit"
              onClick={() => handleDeleteRegister(id, register)}
            >
              X
            </button>
          </>
        ))}
        <button type="submit" onClick={() => registerClockIn(id)}>
                Registrar horário
            </button>
      </div>
    );
  }
export default Day;
