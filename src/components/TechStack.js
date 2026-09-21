import { useState } from 'react';
import {
  FaBootstrap,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa';
import {
  SiAntdesign,
  SiJavascript, // Đã đổi sang SimpleIcons cho đồng bộ kích thước với SiTypescript
  SiJira,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostman,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

const techs = [
  { name: 'JavaScript', color: '#F7DF1E', Icon: SiJavascript }, // Đồng bộ icon JS
  { name: 'TypeScript', color: '#3178C6', Icon: SiTypescript },
  { name: 'ReactJS', color: '#61DAFB', Icon: FaReact },
  { name: 'NextJS', color: '#FFFFFF', Icon: SiNextdotjs },
  { name: 'Redux', color: '#764ABC', Icon: SiRedux },
  { name: 'HTML5', color: '#E34F26', Icon: FaHtml5 },
  { name: 'CSS3', color: '#1572B6', Icon: FaCss3Alt },
  { name: 'TailwindCSS', color: '#38BDF8', Icon: SiTailwindcss },
  { name: 'Bootstrap', color: '#7952B3', Icon: FaBootstrap },
  { name: 'Ant Design', color: '#0170FE', Icon: SiAntdesign },
  { name: 'NodeJS', color: '#339933', Icon: FaNodeJs },
  { name: 'Git', color: '#F05032', Icon: FaGitAlt },
  { name: 'Docker', color: '#2496ED', Icon: FaDocker },
  { name: 'Postman', color: '#FF6C37', Icon: SiPostman },
  { name: 'Jira', color: '#0052CC', Icon: SiJira },
  // { name: 'MongoDB', color: '#47A248', Icon: SiMongodb },
  // { name: 'MySQL', color: '#4479A1', Icon: SiMysql },
];

function TechStack() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className='tech-stack'>
      <div className='tech-row'>
        {techs.map(({ name, color, Icon }) => (
          <span
            key={name}
            className={`tech-icon${hovered === name ? ' is-lit' : ''}`}
            title={name}
            aria-label={name}
            style={{ '--tech-color': color }}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
          >
            <Icon />
          </span>
        ))}
      </div>
    </div>
  );
}

export default TechStack;
