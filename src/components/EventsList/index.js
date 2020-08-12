import React, { useState, useMemo } from "react";
import matchSorter from 'match-sorter';
import { useData } from "../../data/DataContext";
import EventBox from "./EventBox/";
import TextBox from "../common/TextBox";

import Styles from "./styles.module.css";

export default function EventsList() {
  const { events } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchEvent = (value) => {
    setSearchTerm(value);
  }

  const finalEvents = useMemo(() => {
    if (!events) {
     return [];
    }
    return matchSorter(events, searchTerm, { 
     keys: [{threshold: matchSorter.rankings.CONTAINS, key: 'event_name'}],
    });
  }, [searchTerm, events]);

  const NoResults = () => {
    return(
      <div className={Styles.NoResults}> No results found! </div>
    )
  }

  return(
    <>
      <div className={Styles.Filters}>
        <TextBox
          id="searchbox"
          name="searchbox"
          label="Search events by name"
          placeholder="SEARCH EVENTS"
          onChange={handleSearchEvent}
        />
      </div>
      {finalEvents.length > 0 && 
        <section className={Styles.EventsListWrapper}>
          {finalEvents.map((item, index) => (
            <EventBox key={index} data={item} />
          ))}
        </section>
      }

      {finalEvents.length === 0 && <NoResults />}
    </>
  )
}