import { useCallback, useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import AddAppointment from './components/AddAppointment';
import AppointmentInfo from './components/AppointmentInfo';
import Search from './components/Search';

function App() {
  let [appointmentsList, setAppointMentsList] = useState([]);
  let [query, setQuery] = useState('');

  // ??
  const filteredAppointments = appointmentsList.filter(item => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  });

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setAppointMentsList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container px-5 mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BiCalendar className="inline-block text-red-400 align-top" />Your Appointments
      </h1>
      <AddAppointment />
      <Search query={query} onQueryChange={myQuery => setQuery(myQuery)} />

      <ul className="divide-y divide-gray-200">
        {
          filteredAppointments.map(appointment => <AppointmentInfo key={appointment.id} appointment={appointment}
            onDeleteAppointment={(appointMentId) =>
              setAppointMentsList((appointmentsList).filter((appointment) => appointment.id !== appointMentId))
            } />)
        }
      </ul>
    </div>
  );
}

export default App;
