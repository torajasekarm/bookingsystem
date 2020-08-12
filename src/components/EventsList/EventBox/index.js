import React from "react";
import { Link } from 'react-router-dom';
import Moment from 'moment';
import EventMedia from "../EventMedia/";

import Styles from "./styles.module.css";
import BtnStyles from "../../common/button.module.css";

function EventBox(props) {
  const data = props.data;

  const _BookNow = () => {
    if(data.available_seats > 0) {
      return (
        <Link className={BtnStyles.Btn} to={`/event/${data.id}/booking`}> Book Now </Link>
      )
    } else {
      return (
        <div className={`${BtnStyles.Btn} ${BtnStyles.SoldOut}`} > Sold Out </div>
      )
    }
  }

  return(
    <article className={Styles.EventBox}>
      <h3>{data.event_name} </h3>
      <div className={Styles.EventInfo}>
        <EventMedia 
          imgURL={data.event_image}
          altText={data.event_name}
        />
        <div className={Styles.EventDetails}>
            <p>{Moment(data.event_date).format('DD-MMM-yy')}</p>
            <p className={Styles.Qty}>Seats Available : {data.available_seats}</p> 
            {_BookNow()}
        </div>
      </div>
    </article>
  )
}

export default React.memo(EventBox);