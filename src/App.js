import React, { useState, useEffect } from 'react';

function App() {
  const [wykladowcy, setWykladowca] = useState([]);
  const [wybranyWykladowca, setWybranyWykladowca] = useState([]);
  const [tekst, setTekst] = useState('');

  useEffect(() => { fetch('https://mocki.io/v1/7604b5c4-1df8-4c8e-9fe8-375aa1591eae').then(res => res.json()).then(data => setWykladowca(data.list))}, []);

  const handleClick = wykladowca => setWybranyWykladowca(wykladowca);
  const handleChange = event => {
    setTekst(event.target.value);
    setWybranyWykladowca([]);
    if (wykladowcy.some(wykladowca => wykladowca.teacher.toLowerCase().includes(tekst.toLowerCase())) === 0) setWybranyWykladowca({});
  };

  const filteredTeachers = wykladowcy.filter(wykladowca => {
    return (
      wykladowca.teacher.toLowerCase().includes(tekst.toLowerCase()) 
      ||
      wykladowca.subjects.some(subject => subject.toLowerCase().includes(tekst.toLowerCase()))
    );
  });

  return (
    <div className="App">
      <input type="text" value={tekst} onChange={handleChange} />
      <div> {filteredTeachers.map(wykladowca => ( <div key={wykladowca.id}>  <button onClick={() => handleClick(wykladowca)}> {wykladowca.teacher} </button> </div> ))} </div>
      {wybranyWykladowca.subjects && ( <ul> {wybranyWykladowca.subjects.map(subject => ( <li key={subject}>{subject}</li> ))} </ul> )}
    </div>
  );
}
export default App;