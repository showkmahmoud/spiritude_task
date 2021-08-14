import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AvForm } from "availity-reactstrap-validation";
import { BsFillPersonFill } from "react-icons/bs";
import { auth, signInWithGoogle  } from "../../Firebase/config";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
const SignIn = () => {
    const initialValue = {
        email: "",
        password: "",
      };
    const [formData, setFormData] = useState(initialValue)
    const { email, password } = formData;
    const handleFormChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      await auth.signInWithEmailAndPassword(email, password);
    };
  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="container py-5  ">
        <div className="card  mx-auto col-lg-6 col-md-8 col-sm-11 py-4  mb-5 mt-4">
          <h3 className="section_title text-capitalize">sign in</h3>
          <div className="sign_in_card_icon pt-3 mx-auto  text-muted">
            <BsFillPersonFill style={{ fontSize: "80px" }} />
          </div>
          <AvForm onSubmit={handleSubmit} > 
            <AvInput
                name="email" 
                type="email" 
                onChange={handleFormChange}
                value={email}
                placeholder="Enter your mail : something@idk.cool"
                className=" rounded-pill w-75 my-3 mx-auto"
                required
            />
            <AvInput
              className="rounded-pill w-75 my-3 mx-auto"
              name="password"
              type="password"
              onChange={handleFormChange}
              value={password}
              placeholder="Enter Your password"
              required
            />
             <p className="text-center mt-4 mb-2">
            Have no account yet
            <span >
              <Link to="/SignUp" > Sign Up</Link>
            </span>
             </p>
            
             <div className="w-75 mx-auto">
              <button
                className="btn btn-primary rounded-pill text-capitalize col-12  col-lg-12 my-2 mx-auto "
                type='submit'
              >
                Sign In
              </button>
              <button
                onClick={signInWithGoogle}
                className="btn btn-danger rounded-pill text-capitalize col-12  col-lg-12 my-2 mx-auto"
              >
                Sign With google
              </button>
              </div> 
          </AvForm>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
