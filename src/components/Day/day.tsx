import React from 'react';
import api from '../../services/api';



const Day: React.FC = actualDay => {
  const [loading, setLoading] = React.useState(true);
  const [dayObject, setDayObject] = React.useState([]);
  const [dayRegisters, setDayRegisters] = React.useState([]);
  const [id, setId] = React.useState('');

  const handleDeleteRegister = async (id: string, register: string) => {
   await api
      .patch(`/clockIn/${id}`, { time: `${register}` } )
      .then(response => setDayRegisters(response.data.registers))
      .catch(err => console.log(err));
  };

  const handleUpdateRegister = async (id: string, oldTime: string, newTime: string ) => {
    const indexTime = oldTime;
    const IndexOfArray = dayRegisters.indexOf(indexTime);

    if(IndexOfArray > -1){
      dayRegisters[IndexOfArray] = newTime;
      setDayRegisters(dayRegisters);
      await api.patch(`/clockIn/${id}`, {newTime: dayRegisters} )
      .then(response => setDayRegisters(response.data.registers))
      .catch(err => console.log(err))
    }
  }

  const registerClockIn = async (id: string) => {
    await api.put(`/clockIn/${id}`).then(response => setDayRegisters(response.data.registers)).catch(err => console.log(err));
  };

  React.useEffect(() => {
    setDayRegisters(actualDay.actualDay.registers);
    setId(actualDay.actualDay._id);
  }, []);

  React.useEffect(() => {
    setLoading(false);
  }, [dayRegisters])

  if(loading) {
    return <div>Ta carregando</div>
  }

  return (
      <div>
        {dayRegisters.map(register => (
          <>
            <input onBlur={(e) => handleUpdateRegister(id, register, e.currentTarget.value)} key={register} type="text" defaultValue={register} />
            <button
              type="submit"
              onClick={() => handleDeleteRegister(id, register)}
            >
              X
            </button>
            <br />
          </>
        ))}
        <button type="submit" onClick={() => registerClockIn(id)}>
                Registrar horário
            </button>
      </div>
    );
  }
export default Day;
