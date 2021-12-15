import { gql } from '@apollo/client';
import { useSubgraph } from "thegraph-react";
import { useSelector } from 'react-redux';

export default function TestSubgraph() {
    const { fluence } = useSelector(state => state.graph)
    const { useQuery } = useSubgraph(fluence);
    const { error, loading, data } = useQuery(gql`
    {
      accounts(first: 5) {
        id
        asGovernor {
          id
        }
        asToken {
          id
        }
        asTimelock {
          id
        }
      }
    }
    `);
    return (
      <div>
        <div>{(error || loading) ? 'Loading...' : JSON.stringify(data)}</div>
      </div>
    );
  }