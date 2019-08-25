function Sidebar() {
   return (
      <Sidebar className="col-3">
         <h4>Stay in the loop</h4>
         <p>We'll email you about upcoming events. Never spam.</p>
         <label for="mailing_list_first_name">First name</label>
         <input
            id="mailing_list_first_name"
            className="form-control"
            type="text"
         ></input>
         <label for="mailing_list_last_name">Last name</label>
         <input
            id="mailing_list_last_name"
            className="form-control"
            type="text"
         ></input>
         <label for="mailing_list_email">Email</label>
         <input
            id="mailing_list_email"
            className="form-control"
            type="text"
         ></input>
         <button className="btn btn-primary float-right mt-2">
            Occasionally email me
         </button>
      </Sidebar>
   )
}

export default Sidebar
