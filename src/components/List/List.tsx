import { Repository } from '../../graphql/repositories';


interface ListProps {
  data: {
    node: Repository;
  }[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <ul>
      {data.map(({ node }) => (
        <li key={node.id}>
          <span>{node.name}</span><br />
          <span>{node.owner.login}</span><br />
          <img style={{ maxWidth: "50px" }} src={node.owner.avatarUrl} alt={node.owner.login} />
        </li>
      ))}
    </ul>
  );
}

export default List;