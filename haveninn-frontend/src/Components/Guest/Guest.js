import React, { useState, useEffect } from "react";
import axios from "axios";
import Variables from "../../Variables/Variables";
import { useNavigate } from "react-router-dom";

function Guest() {
  const [Guests, setGuest] = useState([]);
  const navigate = useNavigate();

  const getGuestId = (id) => {
    navigate("/Guest/Update", { state: { Id: id } });
  };

  useEffect(() => {
    axios
      .get(Variables.api + "Guests", {
        headers: { Authorization: `Bearer ${Variables.token}` },
      })
      .then((response) => response.data)
      .then((res) => setGuest(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <>
        <div className="container mt-5 mb-5 guest-container">
          <div className="row">
            {Guests.map((guest) => (
              <div className="col-md-6" key={guest.GuestId}>
                <article className="card mb-3 room-card p-3">
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div className="m-2">
                        <h5>
                          <b>Guest Id: </b>
                          {guest.GuestId}
                        </h5>
                        <p>
                          <b>Guest Name</b> {guest.Name}
                        </p>
                        <p>
                          <b>Email</b> {guest.Email}
                        </p>
                        <p>
                          <b>Mobile Number</b> {guest.MobileNo}
                        </p>
                        <p>
                          <b>Aadhar Card Number</b> {guest.AadharCardNo}
                        </p>
                      </div>
                    </div>

                    <aside className="col-md-4">
                      <div>
                        <div className="d-grid gap-3 d-md-flex justify-content-md-right mt-5">
                          <a href="/Guest/Update">
                            <i
                              className="far fa-edit fa-2x text-dark"
                              onClick={() => getGuestId(guest.GuestId)}
                            ></i>
                          </a>
                          <a href="/Guestf">
                            <i
                              className="fa fa-trash fa-2x text-dark"
                              onClick={() => this.deleteGuest(guest.GuestId)}
                            ></i>
                          </a>
                        </div>
                      </div>
                    </aside>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

export default Guest;
