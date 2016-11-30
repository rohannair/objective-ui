import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './Feed.css';
import dateformat from 'dateformat';

// Components
import Button from '../../components/Button';
import Card from '../../components/Card';
import LoadingBar from '../../components/LoadingBar';
import Pill from '../../components/Pill';
import TextArea from '../../components/Forms/TextArea';
import UserTab from '../../components/UserTab';

import Checkbox from 'react-toolbox/lib/checkbox';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import FlipMove from 'react-flip-move';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      blocker: false,
      objective: '',
    };
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      viewer: PropTypes.object
    }).isRequired,

    addSnapshot: PropTypes.func.isRequired
  }

  render() {
    const { data: { viewer, loading } } = this.props;
    if (loading) {
      return <LoadingBar />;
    }

    const snapshots = viewer.snapshots.map(snap =>
      <div className={`${styles.snapshot}`} key={snap.id}>
        <header className={styles.snapshot__head} >
          <UserTab {...snap.user}>
            <small>{dateformat(snap.createdAt, 'mmm dd h:MM TT')}</small>
          </UserTab>
        </header>

        <section className={styles.snapshot__body}>
          { snap.body }
        </section>

        <footer className={styles.snapshot__footer}>
          <Pill>{snap.objective.name}</Pill>
        </footer>
      </div>
    );

    const autoCompleteValues = viewer.objectives
      .reduce((o, v) => {
        o[v.id] = v.name;
        return o;
      }, {});

    return (
      <div className={styles.Feed}>
        <div className={styles.controlBar}>
          <h2>Feed</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.add}>
              <div className={styles.addSnapshotContainer}>
                <h4>Add New Snapshot</h4>
                <TextArea
                  label="Snapshot body"
                  value={this.state.body}
                  onChange={this._handleChange.bind(this, 'body')}
                />

                <div className={styles.addSnapshotMeta}>
                  <Autocomplete
                    direction="down"
                    label="Objective"
                    value={this.state.objective}
                    source={autoCompleteValues}
                    onChange={this._handleChange.bind(this, 'objective')}
                  />
                  <Checkbox
                    checked={this.state.blocker}
                    label="Blocker"
                    onChange={this._handleChange.bind(this, 'blocker')}
                  />

                  <Button onClick={this._submit}>Submit</Button>
                </div>
              </div>
          </div>

          <div className={styles.feedBody}>
            <FlipMove easing="ease-in-out">
              {snapshots}
            </FlipMove>
          </div>
        </div>
      </div>
    );
  };

  _submit = () => {
    const { submit } = this.props;
    const { body, blocked, objective } = this.state;
    submit (body, blocked, objective);
  };

  _handleChange = (name, val) => this.setState({ [name]: val });
}

const NEW_SNAPSHOT = gql`
  mutation addSnapshot($body: String!, $objective: String) {
    addSnapshot(body: $body, objective: $objective) {
      id
      body
      createdAt
      user {
        id
        firstName
        lastName
        img
      }

      objective {
        name
      }
    }
  }
`;

const withMutation = graphql(NEW_SNAPSHOT, {
  props: ({ mutate }) => ({
    submit: (body, blocked, objective) => mutate({
      variables: { body, blocked, objective },
      optimisticResponse: {
        __typename: 'Mutation',
        addSnapshot: {
          __typename: 'CheckIn', // TODO: Rename checkin to snapshot
          id: Math.random().toString(16).slice(2),
          body,
          createdAt: Date.now()
        }
      },

      updateQueries: {
        Feed: (prev, { mutationResult}) => ({
          ...prev,
          viewer: {
            ...prev.viewer,
            snapshots: [
              mutationResult.data.addSnapshot,
              ...prev.viewer.snapshots
            ]
          }
        })
      }
    })
  })
});

const GET_FEED_QUERY = gql`
  query Feed {
    viewer {
      id
      img
      firstName
      lastName
      snapshots {
        id
        body
        createdAt
        user {
          id
          firstName
          lastName
          img
        }

        objective {
          name
        }
      }
      objectives {
        id
        name
      }
      squads {
        id
        name
      }
    }
  }
`;

const withData = graphql(GET_FEED_QUERY);

export default withData(withMutation(Feed));

