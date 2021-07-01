import { getImageLink } from './helpers';
import { Link } from 'react-router-dom';
import '../styles/BD_styles.scss';

interface Props {
  publicationDate: string;
  name: string;
  id: string;
  imageHomepage: string;
}

export function BD(props: Props) {
  let date: Date | string = new Date(props.publicationDate);
  date = date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
  });

  return (
    <Link className="BD-container" to={'/BD?bd=' + props.id}>
      <img src={getImageLink(props.imageHomepage)} alt="muslim show" />
      <span className="bold date">
        {date} -<span className="bold title"> {props.name.toLowerCase()}</span>
      </span>
    </Link>
  );
}
