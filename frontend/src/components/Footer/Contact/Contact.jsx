

const teamMembers = [
  {
    name: 'Alejandro',
    surname: 'García Gómez',
    email: 'pamis93@gmail.com',
    linkedin: 'www.linkedin.com/in/alejandro-garcia-gomez-0603271b6',
    repo: 'https://github.com/pamis93',
  },

  {
    name: 'Gustavo Enrique ',
    surname: 'Bolívar Ogando',
    email: 'gustavo@example.com',
    linkedin: 'https://www.linkedin.com/in/gustavobolivarogando',
    repo: 'https://github.com/gustavobolivarogando',
  },

  {
    name: 'Lara  ',
    surname: 'Rodriguez',
    email: 'lararh393@gemail.com',
    linkedin: 'https://www.linkedin.com/in/lara-rodríguez-herrero',
    repo: 'https://github.com/larucodonosor',
  },
  {
    name: 'Carlos',
    surname: 'Cue',
    email: 'sergio@example.com',
    linkedin: 'https://www.linkedin.com/in/sergiomanzanoesclapez',
    repo: 'https://github.com/sergiomanzanoesclapez',
  },

  {
    name: 'Enmanuel',
    surname: 'Gómez',
    email: 'gustavo@example.com',
    linkedin: 'https://www.linkedin.com/in/gustavobolivarogando',
    repo: 'https://github.com/gustavobolivarogando',
  },

  {
    name: 'Alex',
    surname: 'Riera',
    email: 'gustavo@example.com',
    linkedin: 'https://www.linkedin.com/in/gustavobolivarogando',
    repo: 'https://github.com/gustavobolivarogando',
  },
  // Agrega más miembros del equipo aquí
];

const Contact = () => {
  return (
    <div className="container mx-auto p-2 mt-[100px] mb-6">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Nuestro Equipo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {member.name} {member.surname}
              </h2>
              <p className="text-gray-600 mt-2">
                Correo:{' '}
                <a href={`mailto:${member.email}`} className="text-blue-500">
                  {member.email}
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                LinkedIn:{' '}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {member.linkedin}
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                Repositorio:{' '}
                <a
                  href={member.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {member.repo}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
