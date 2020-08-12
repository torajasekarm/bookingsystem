import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useData } from '../../data/DataContext';
import { useForm, Controller, useWatch } from "react-hook-form";
import EventMedia from "../EventsList/EventMedia/";
import { TextInput } from "../common/TextInput";
import ReactSelect from "react-select";
import Button from "../common/Button";

import eventIcon from '../../icons/event-icon.png';

import Styles from "./styles.module.css";
import CommonStyles from "../common/styles.module.css";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const BookingConfirmation = () => {
  return (
    <div className={Styles.BookingConfirmation}>
    <img className={Styles.Icon} src={eventIcon} alt="Event Icon" />
    <p> Tickets booked. </p>
    </div>
  )
}

const AttendeeNamesInputs = ({control, available_seats, errors, bookingStatus}) => {
  const selected = useWatch({
    control,
    name: "number_of_seats"
  })

  if(selected && selected.value === '') {
    return
  }

  return (
    <>
    {selected.value > 0 && selected.value <= available_seats && [...Array(selected.value - 1)].map((item, index) =>
      <Controller
        key={index}
        as={<TextInput />}
        id={`attendees[${index}].name`}
        name={`attendees[${index}].name`}
        label={`Name of the Ateendee ${index + 2}`}
        control={control}
        disabled={bookingStatus}
        rules={{
          required: `Please enter the name of Attendee ${index + 2}`,
        }}
       error={errors.attendees && errors.attendees[index]  ? errors.attendees[index].name : null}
      />
    )}
    </>
  );
}

export default function Booking(props) {
  let history = useHistory();
  const { findEventById } = useData();
  const details = findEventById(props.match.params.id);

  const [bookingStatus, setBookingStatus] = useState(false);
  const [bookingInfo, setBookingInfo] = useState('');

  useEffect(() => {
    scrollToTop();
  }, [bookingInfo]);

  const { handleSubmit, errors, control, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      user_name: '',
      name: '',
      email: '',
      number_of_seats: '',
      attendees: []
    }
  });

  const seatOptions = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5},
    {value: 6, label: 6},
  ]

  const onSubmit = (data) => {
    if(data && errors !== null) {
      setBookingStatus(true);
      setBookingInfo(data);
    }
  }

  const handleCancel = () => {
    reset();
    history.push("/");
  }

  return(
    <>
     <Link className={Styles.BackLink} to="/">
      &larr; Back
     </Link>
      {details && (
        <div className={Styles.BookingWrapper}>
        <div className={Styles.BookingHeader}>
          <h1 className={Styles.Title}> {details.event_name}</h1>
          <p>Number of available seats: <b>{details.available_seats}</b></p>
        </div>

        {bookingStatus &&
        <div class="booking__confirmation_wrapper">
          <BookingConfirmation />
            <div className={Styles.BookingInfo}>
              <pre>
                {JSON.stringify(bookingInfo, null, 4) }
              </pre>
            </div>
        </div>
        }

        <div className={Styles.BookingDetails}>
          <div>
            <EventMedia 
              imgURL={details.event_image}
              altText={details.event_name}  
              />
          </div>
          <div className={Styles.BookingForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                
              <Controller
                as={<TextInput />}
                id="user_name"
                name="user_name"
                label="User Name"
                control={control}
                rules={{
                  required: "Please enter user name",
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Only letters and spaces are allowed"
                  }
                }}
                disabled={bookingStatus}
                error={errors.user_name}
              />

            <Controller
                as={<TextInput />}
                id="name"
                name="name"
                label="Name"
                control={control}
                rules={{
                  required: "Please enter your name",
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Only letters and spaces are allowed"
                  }
                }}
                disabled={bookingStatus}
                error={errors.name}
              />

              <Controller
                as={<TextInput />}
                id="email"
                name="email"
                label="Email"
                control={control}
                rules={{
                  required: "Please enter your email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email"
                  }
                }}
                disabled={bookingStatus}
                error={errors.email}
              />
              
             
              <div className={CommonStyles.FormItem}>
                <div className={CommonStyles.FormItemGroup}>
                  <label htmlFor="number_of_seats"> Number of seats </label>

                  <div className={Styles.SelectSeats}>
                    <Controller
                      as={<ReactSelect />}
                      options={seatOptions}
                      name="number_of_seats"
                      control={control}
                      isSearchable={false}
                      isDisabled={bookingStatus}
                      rules={{
                        required: "Please select the number of seats",
                        validate: ({value}) => {
                          if(value !== undefined && value > details.available_seats) {
                            return "Number of seats selected is more than available seats"
                          }
                        }
                      }}
                    />
                  </div>
                  {errors.number_of_seats && <div className={CommonStyles.Error}>{errors.number_of_seats.message}</div>}
                  
                </div>
              </div>
             
              <AttendeeNamesInputs control={control} available_seats={details.available_seats} errors={errors} bookingStatus={bookingStatus} />
              
              <div className={Styles.Form__actions}>
                <Button type="submit" value="Submit" disabled={bookingStatus ? 'disabled' : ''}/>
                <Button type="reset" value="Cancel" onClick={handleCancel} disabled={bookingStatus ? 'disabled' : ''} />
              </div>
              </form>

            </div>
          
        </div>
      </div>
      )}
    </>
  )
}