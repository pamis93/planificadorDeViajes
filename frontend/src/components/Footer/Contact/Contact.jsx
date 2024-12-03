const teamMembers = [
  {
    name: 'Alejandro',
    surname: 'García',
    email: 'pamis93@gmail.com',
    linkedin: 'https://www.linkedin.com/in/alejandro-garcia-gomez-0603271b6',
    repo: 'https://github.com/pamis93',
  },
  {
    name: 'Gustavo',
    surname: 'Bolívar',
    email: 'gusta_bolivar@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/gustavo-bolivar/',
    repo: 'https://github.com/gustavobolivarogando',
  },
  {
    name: 'Lara',
    surname: 'Rodriguez',
    email: 'lararh393@gmail.com',
    linkedin: 'https://www.linkedin.com/in/lara-rodr%C3%ADguez-herrero/',
    repo: 'https://github.com/angelsuarezsosa',
  },
  {
    name: 'Carlos Alberto',
    surname: 'Cue Puente',
    email: 'cuepuentecarlos@gmail.com cacp892@gmail.com',
    linkedin: 'https://www.linkedin.com/in/carlosalbertocuepuente',
    repo: 'https://github.com/carloscuepuente',
  },
  {
    name: 'Emanuel',
    surname: 'Gómez',
    email: 'vascogomez247@gmail.com',
    linkedin: 'https://www.linkedin.com/in/emanuel-gomez-silva/',
    repo: 'https://github.com/vascogomez',
  },
  {
    name: 'Alex',
    surname: 'Riera',
    email: 'alrron14@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/alexrierahernandez/',
    repo: 'https://github.com/AlRiera',
  },
  // Agrega más miembros del equipo aquí
];

const Contact = () => {
  return (
    <div className="container mx-auto p-2 mt-[100px] mb-6">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Nuestro Equipo de Desarrolladores:
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-[300px] h-[150px] mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:shadow-black"
          >
            <div className="p-4 flex flex-col items-center h-full">
              <h2 className="text-[30px] font-bold text-gray-800 text-center mb-4">
                {member.name} {member.surname}
              </h2>
              <div className="flex justify-around w-full">
                <a
                  href={`mailto:${member.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/icons/email.svg"
                    alt="Email Icon"
                    className="w-10 h-10 hover:opacity-80 hover:scale-110 transition-transform"
                  />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn Icon"
                    className="w-10 h-10 hover:opacity-80 hover:scale-110 transition-transform"
                  />
                </a>
                <a href={member.repo} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/icons/github.svg"
                    alt="GitHub Icon"
                    className="w-10 h-10 hover:opacity-80 hover:scale-110 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
