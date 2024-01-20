/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import AuthService from "../../../../services/auth.tsx";
import Loader from "../../../../helper/Loader/Loading.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../slice/AuthSlice/authSlice.tsx";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";

interface Iformprop {
  username: string;
  password: string;
}

function login() {
  const [loader, setLoader] = useState(false);
  const [crypto, setCrypto] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<Iformprop>();
  // const changes = watch(["password", "username"]);
  const userd = useSelector((state) => state);
  // console.log(userd);
  const dispatch = useDispatch();
  const secret: any = process.env.REACT_APP_CRYPTO_SECRET;
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const onSubmit = async (data: any) => {
    // console.log(data);
    setLoader(true);
    await AuthService.Login(data)
      .then((res: any) => {
        setLoader(false);
        const token = Cookies.get("auth");

        if (res !== undefined) {
          const cryp = res.data?.Success;

          // console.log("CRYPE", cryp);
          if (cryp) {
            const decoded = CryptoJS.AES.decrypt(cryp, secret).toString(
              CryptoJS.enc.Utf8
            );
            if (decoded) {
              localStorage.setItem("UserData", decoded);
              const obj = JSON.parse(decoded);
              const userData = obj.user_data[0];
              // console.log("GG", );
              dispatch(setData(userData));
              navigate("/dashboard");
            } else {
              navigate("/login");
              setLoader(false);
            }
          } else {
            console.log("MESSAGE");
            navigate("/login");
            setLoader(false);
          }
        }
        // console.log(decoded);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoader(false)
      });
  };

  return (
    <>
      <div className="row row-cols-2 ">
        <div className="col-8 p-0">
          <div className="web-banner"></div>
        </div>
        <div className="col-4 login-form">
          <div className="login-form-content">
            <div className="container border rounded p-5">
              <div className="img-align pt-5">
                <img
                  src="/assert/spotshop.png"
                  alt="Logo"
                  className="logo-img"
                />
              </div>

              {/* <h4 className="mt-5 text-center headers font-mono">Login</h4> */}
              <div className="mt-5">
                <label className="w-100 form-label">
                  Username
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      {...register("username", { required: true })}
                      aria-invalid={errors.username ? "true" : "false"}
                    />
                    {errors.username?.type === "required" && (
                      <p role="alert" className="text-danger">
                        {" "}
                        Username is required
                      </p>
                    )}
                  </div>
                </label>
              </div>
              <div className="mt-3">
                <label className="w-100 form-label">
                  Password
                  <div>
                    <input
                      type="password"
                      className="form-control"
                      {...register("password", {
                        required: true,
                        // pattern: {
                        //   value:
                        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
                        //   message: "Password must meet the specified criteria",
                        // },
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === "required" ? (
                      <p role="alert" className="text-danger">
                        Password is required
                      </p>
                    ) : (
                      errors.password?.type === "pattern" && (
                        <p role="alert" className="text-danger">
                          {errors.password.message}
                        </p>
                      )
                    )}
                  </div>
                </label>
              </div>
              <div className="mt-3 d-flex justify-content-center mb-3">
                <div className="align-btn">
                  <div className="">
                    <button
                      className="btn btn-success headers"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                forget password?{" "}
                <a href="http://wa.me/+2348161722995"> click here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader && (
        <Loader show={loader} />
      )}
    </>
  );
}

export default login;
