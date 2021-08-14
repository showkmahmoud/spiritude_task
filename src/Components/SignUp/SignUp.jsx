import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  {AvForm}  from "availity-reactstrap-validation";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
import { BsFillPersonFill } from "react-icons/bs";
import { auth, handleUserProfile } from "../../Firebase/config";
import { FormGroup } from "reactstrap";
import AvField from "availity-reactstrap-validation/lib/AvField";
const SignUp = () => {
  const initialValue = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const { displayName, email, password, confirmPassword } = formData;
  const [error, setError] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Not matching");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  const handleFormChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    } else {
        const { user } =  auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await handleUserProfile(user, { displayName });
        setFormData(initialValue)
        console.log("confirm");
    } 
  };
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="container py-5  ">
        <div className="card  mx-auto col-lg-6 col-md-8 col-sm-11 py-4  mb-5 mt-4">
          <h3 className="section_title text-capitalize">sign up</h3>
          <div className="sign_in_card_icon pt-3 mx-auto  text-muted">
            <BsFillPersonFill style={{ fontSize: "80px" }} />
          </div>
          <AvForm onSubmit={handleSubmit}>
          <FormGroup className='my-3'>
              <AvField
                name="displayName"
                onChange={handleFormChange}
                value={displayName}
                className=" rounded-pill w-75 my-3 mx-auto"
                type="text"
                pattern="^[[a-zA-Z]{3,}"
                placeholder="Enter your name"
                title="Only letters are allowed"
                required
              />
            </FormGroup>
            
            <FormGroup className='my-3'>
              <AvField
                name="email"
                onChange={handleFormChange}
                value={email}
                type="email"
                className="rounded-pill w-75 my-3 mx-auto"
                title="Enter valid email"
                placeholder="something@idk.cool"
                required
              />
            </FormGroup>
            <FormGroup className='my-3'>
              <AvField
                name="password"
                onChange={handleFormChange}
                value={password}
                className="rounded-pill w-75 my-3 mx-auto"
                type="password"
                pattern="^[a-zA-Z0-9]{8,}$"
                placeholder="Enter password (at least 8 digits)"
                title="Minimum eight characters"
                required
              />
            </FormGroup>
            <FormGroup className='my-3'>
              <AvField
                className="rounded-pill w-75 my-3 mx-auto"
                onChange={handleFormChange}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id="examplePassword2"
                pattern="^[a-zA-Z0-9]{8,}$"
                placeholder="Confirm your password"
                title="Confirm your password"
                required
              />
            </FormGroup>
            <div className="w-75 mx-auto">
              <div className="text-danger mb-2">{error}</div>
              <p className="text-center mt-4 mb-2">
                Have an account 
                <span >
                   <Link to="/SignIn" className="sign_up_link">
                     Sign in
                  </Link>
                </span>
              </p>
              <button
                className="btn btn-primary text-capitalize rounded-pill w-75 my-3 mx-auto "
                type="submit"
              >
                register
            </button>
            </div>
            
          </AvForm>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
