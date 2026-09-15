import { useState, useEffect } from "react";
import "../../../css/register/mainForm.css";
import axios from "axios";
import Btn from "../../../help/register/Btn";
import LoadingBtn from "../../../help/register/LoadingBtn";

const server = import.meta.env.VITE_BACKEND_SERVER;

export default function NamePrt({ setPage, create, setCreate }) {

    const [err, setError] = useState({ msg: "", errBox: 0 });
    const [available, setAvailable] = useState({ username: false, email: false });
    const [loadx, setLoadx] = useState(false)

    useEffect(() => {
        if (create.username.length < 5) {
            setAvailable((pre) => ({ ...pre, username: false }));
            return;
        }
        const timer = setTimeout(() => {
            checkUsername(create.username);
        }, 800);

        return () => clearTimeout(timer);
    }, [create.username]);


    useEffect(() => {

        const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(create.email)) {
            setAvailable((pre) => ({ ...pre, email: false }));
            return;
        }
        const timer = setTimeout(() => {
            checkEmail(create.email);
        }, 800);

        return () => clearTimeout(timer);

    }, [create.email]);


    function nextStep() {

        if (create.name.trim().length <= 3) {
            setError({ msg: "Name must be greater than 3 characters", errBox: 1 });
            return;
        }

        if (create.username.trim().length < 5) {
            setError({ msg: "Username must be greater than 4 characters", errBox: 3 });
            return;
        }

        if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(create.email)) {
            setError({ msg: "Please enter a valid email", errBox: 2 });
            return;
        }

        if (!available.username) {
            setError({ msg: "Please choose an available username", errBox: 3 });
            return;
        }

        if (!available.email) {
            setError({ msg: "Please enter an available email", errBox: 2 });
            return;
        }
        setError({ msg: "", errBox: 0 });
        setPage((pre) => ({ ...pre, no: 2 }));
    }


    function handleNames(e) {
        const { name, value } = e.target;
        if (
            (name === "name" && (!/^[a-zA-Z ]*$/.test(value) || value.length > 20)) ||
            (name === "email" && (!/^[a-zA-Z0-9.@_]*$/.test(value) || value.length > 50)) ||
            (name === "username" && (!/^[a-zA-Z0-9._]*$/.test(value) || value.length > 50))
        ) return;

        setError({ msg: "", errBox: 0 });

        if (name === "name") setCreate((pre) => ({ ...pre, [name]: value }));
        else setCreate((pre) => ({ ...pre, [name]: value.toLowerCase() }));

    }


    async function checkUsername(username) {
        try {
            setLoadx(true)
            const response = await axios.get(`${server}/users/existusername/${username}`);
            const result = response.data;

            if (!result) {
                setAvailable((pre) => ({ ...pre, username: true }));
                return;
            }

            setAvailable((pre) => ({ ...pre, username: false }));
            setError({ msg: "Username Already Exists", errBox: 3 });

        } catch (err) {
            console.log("Check username failed:", err);
            setAvailable((pre) => ({ ...pre, username: false }));
            setError({ msg: "Server Side Error", errBox: 0 });
        }finally {
             setLoadx(false);
        }
    }


    async function checkEmail(email) {
        try {
            setLoadx(true);
            const response = await axios.get(`${server}/users/existemail/${email}`);
            const result = response.data;
            if (!result) {
                setAvailable((pre) => ({ ...pre, email: true }));
                return;
            }

            setAvailable((pre) => ({ ...pre, email: false }));
            setError({ msg: "This email is already linked to another account", errBox: 2 });

        } catch (err) {
            console.log("Check email failed:", err);
            setAvailable((pre) => ({ ...pre, email: false }));
            setError({ msg: "Server Side Error", errBox: 0 });
        }finally {
             setLoadx(false);
        }
    }


    return (
        <div className="prt isFlex wd">

            <div className="inpdiv input-group flex-nowrap">
                <span className={`label input-group-text ${err.errBox == 1 && "redInp"}`}>
                    <svg className="svgg" viewBox="0 -0.5 25 25" fill="none">
                        <path d="M14.5 11.5C14.5 12.6046 13.6046 13.5 12.5 13.5C11.3954 13.5 10.5 12.6046 10.5 11.5C10.5 10.3954 11.3954 9.5 12.5 9.5C13.6046 9.5 14.5 10.3954 14.5 11.5Z" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M14.5 5.25C14.0858 5.25 13.75 5.58579 13.75 6C13.75 6.41421 14.0858 6.75 14.5 6.75V5.25ZM10.5 6.75C10.9142 6.75 11.25 6.41421 11.25 6C11.25 5.58579 10.9142 5.25 10.5 5.25V6.75ZM15.25 6C15.25 5.58579 14.9142 5.25 14.5 5.25C14.0858 5.25 13.75 5.58579 13.75 6H15.25ZM13.75 7C13.75 7.41421 14.0858 7.75 14.5 7.75C14.9142 7.75 15.25 7.41421 15.25 7H13.75ZM13.75 6C13.75 6.41421 14.0858 6.75 14.5 6.75C14.9142 6.75 15.25 6.41421 15.25 6H13.75ZM15.25 4C15.25 3.58579 14.9142 3.25 14.5 3.25C14.0858 3.25 13.75 3.58579 13.75 4H15.25ZM14.5 6.75C14.9142 6.75 15.25 6.41421 15.25 6C15.25 5.58579 14.9142 5.25 14.5 5.25V6.75ZM10.5 5.25C10.0858 5.25 9.75 5.58579 9.75 6C9.75 6.41421 
                            10.0858 6.75 10.5 6.75V5.25ZM11.25 6C11.25 5.58579 10.9142 5.25 10.5 5.25C10.0858 5.25 9.75 5.58579 9.75 6H11.25ZM9.75 7C9.75 7.41421 10.0858 7.75 10.5 7.75C10.9142 7.75 11.25 7.41421 11.25 7H9.75ZM9.75 6C9.75 6.41421 10.0858 6.75 10.5 6.75C10.9142 6.75 11.25 6.41421 11.25 6H9.75ZM11.25 4C11.25 3.58579 10.9142 3.25 10.5 3.25C10.0858 3.25 9.75 3.58579 9.75 4H11.25ZM6.05108 17.8992C5.71926 18.1471 5.65126 18.6171 5.89919 18.9489C6.14713 19.2807 6.61711 19.3487 6.94892 19.1008L6.05108 17.8992ZM18.0511 19.1008C18.3829 19.3487 18.8529 19.2807 19.1008 18.9489C19.3487 18.6171 19.2807 18.1471 18.9489 17.8992L18.0511 19.1008ZM14.5 6.75H15.5V5.25H14.5V6.75ZM15.5 6.75C17.2949 
                            6.75 18.75 8.20507 18.75 10H20.25C20.25 7.37665 18.1234 5.25 15.5 5.25V6.75ZM18.75 10V16H20.25V10H18.75ZM18.75 16C18.75 17.7949 17.2949 19.25 15.5 19.25V20.75C18.1234 20.75 20.25 18.6234 20.25 16H18.75ZM15.5 19.25H9.5V20.75H15.5V19.25ZM9.5 19.25C7.70507 19.25 6.25 17.7949 6.25 16H4.75C4.75 18.6234 6.87665 20.75 9.5 20.75V19.25ZM6.25 16V10H4.75V16H6.25ZM6.25 10C6.25 8.20507 7.70507 6.75 9.5 6.75V5.25C6.87665 5.25 4.75 7.37665 4.75 10H6.25ZM9.5 6.75H10.5V5.25H9.5V6.75ZM13.75 6V7H15.25V6H13.75ZM15.25 6V4H13.75V6H15.25ZM14.5 5.25H10.5V6.75H14.5V5.25ZM9.75 6V7H11.25V6H9.75ZM11.25 6V4H9.75V6H11.25ZM6.94892 19.1008C10.2409 16.641 14.7591 16.641 18.0511 19.1008L18.9489 17.8992C15.1245 15.0416 9.87551 15.0416 6.05108 17.8992L6.94892 19.1008Z" fill="#e1e1e1"></path>
                    </svg>
                </span>
                <input
                    onChange={(e) => handleNames(e)}
                    name="name"
                    value={create.name}
                    type="text"
                    className={`form-control inpp clk ${err.errBox == 1 && "redInp"}`}
                    placeholder="Your First Name ?"
                    spellCheck="off"
                    autoComplete="off" />
            </div>
            <div className="inpdiv input-group flex-nowrap">
                <span className={`label input-group-text ${err.errBox == 2 && "redInp"}`}>
                    <svg className="svgg" viewBox="0 -0.5 25 25" fill="none">
                        <path d="M19.7505 9.02905C19.7652 9.443 20.1127 9.76663 20.5267 9.75189C20.9406 9.73715 21.2643 9.38962 21.2495 8.97567L19.7505 9.02905ZM16.214 5.00236V5.75236C16.2224 5.75236 16.2307 5.75222 16.2391 5.75194L16.214 5.00236ZM9.786 5.00236L9.76095 5.75194C9.7693 5.75222 9.77765 5.75236 9.786 5.75236V5.00236ZM4.75048 8.97567C4.73573 9.38962 5.05936 9.73715 5.47331 9.75189C5.88726 9.76663 6.23478 9.443 6.24952 9.02905L4.75048 8.97567ZM21.25 9.00236C21.25 8.58815 20.9142 8.25236 20.5 8.25236C20.0858 8.25236 19.75 8.58815 19.75 9.00236H21.25ZM20.5 15.0024L21.2495 15.029C21.2498 15.0202 21.25 15.0113 21.25 15.0024H20.5ZM16.214 19.0024L16.2391 18.2528C16.2307 18.2525 16.2224 
                            18.2524 16.214 18.2524V19.0024ZM9.786 19.0024V18.2524C9.77765 18.2524 9.7693 18.2525 9.76095 18.2528L9.786 19.0024ZM5.5 15.0024H4.75C4.75 15.0113 4.75016 15.0202 4.75048 15.029L5.5 15.0024ZM6.25 9.00236C6.25 8.58815 5.91421 8.25236 5.5 8.25236C5.08579 8.25236 4.75 8.58815 4.75 9.00236H6.25ZM20.8783 9.64996C21.236 9.44103 21.3565 8.98172 21.1476 8.62406C20.9387 8.2664 20.4794 8.14583 20.1217 8.35476L20.8783 9.64996ZM15.236 12.0774L14.8577 11.4297L14.8515 11.4334L15.236 12.0774ZM10.764 12.0774L11.1486 11.4334L11.1423 11.4298L10.764 12.0774ZM5.8783 8.35476C5.52064 8.14583 5.06133 8.2664 4.8524 8.62406C4.64347 8.98172 4.76404 9.44103 5.1217 9.64996L5.8783 8.35476ZM21.2495 
                            8.97567C21.1534 6.27536 18.8895 4.16252 16.1889 4.25278L16.2391 5.75194C18.1129 5.68931 19.6838 7.15537 19.7505 9.02905L21.2495 8.97567ZM16.214 4.25236H9.786V5.75236H16.214V4.25236ZM9.81105 4.25278C7.11054 4.16252 4.84663 6.27536 4.75048 8.97567L6.24952 9.02905C6.31625 7.15537 7.88712 5.68931 9.76095 5.75194L9.81105 4.25278ZM19.75 9.00236V15.0024H21.25V9.00236H19.75ZM19.7505 14.9757C19.6838 16.8494 18.1129 18.3154 16.2391 18.2528L16.1889 19.7519C18.8895 19.8422 21.1534 17.7294 21.2495 15.029L19.7505 14.9757ZM16.214 18.2524H9.786V19.7524H16.214V18.2524ZM9.76095 18.2528C7.88712 18.3154 6.31624 16.8494 6.24952 14.9757L4.75048 15.029C4.84663 17.7294 7.11054 19.8422 9.81105 
                            19.7519L9.76095 18.2528ZM6.25 15.0024V9.00236H4.75V15.0024H6.25ZM20.1217 8.35476L14.8577 11.4298L15.6143 12.725L20.8783 9.64996L20.1217 8.35476ZM14.8515 11.4334C13.7111 12.1145 12.2889 12.1145 11.1485 11.4334L10.3795 12.7213C11.9935 13.6852 14.0065 13.6852 15.6205 12.7213L14.8515 11.4334ZM11.1423 11.4298L5.8783 8.35476L5.1217 9.64996L10.3857 12.725L11.1423 11.4298Z" fill="#f1f1f1"></path>
                    </svg>
                </span>
                <input
                    onChange={(e) => handleNames(e)}
                    name="email"
                    value={create.email}
                    type="text"
                    className={`form-control inpp clk ${err.errBox == 2 && "redInp"}`}
                    placeholder="Your Email id ?"
                    spellCheck="off"
                    autoComplete="off" />
            </div>

            <div className="inpdiv input-group flex-nowrap">
                <span className={`label input-group-text ${err.errBox == 3 && "redInp"}`}>
                    <svg className="svgg" viewBox="0 -0.5 25 25" fill="none">
                        <path d="M14.9523 12.0001C14.9791 13.5185 13.7707 14.7716 12.2523 14.8001C10.7335 14.7722 9.52456 13.5189 9.55131 12.0001C9.52455 10.4816 10.7329 9.22853 12.2513 9.20007C13.7701 9.22799 14.9791 10.4812 14.9523 12.0001Z" stroke="#f6f6f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.3283 14.683C17.7601 16.1419 16.7124 17.3639 15.3573 18.148C14.0308 18.9102 12.4752 19.172 10.9723 18.886C9.45631 18.5892 8.09247 17.77 7.11831 16.571C5.06696 14.0352 4.95495 10.4437 6.84431 7.78503C7.74122 6.52221 9.05036 5.61162 10.5463 5.21003C12.0246 4.82104 13.5935 4.97576 14.9673 5.64603C16.368 6.33545 17.4903 7.48385 18.1473 8.90003L18.1943 9.00003C18.9083 10.629 18.3663 13.4 16.6403 13.4C15.6876 13.3787 14.9322 12.5898 14.9523 11.637" stroke="#fdfcfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>
                <input
                    onChange={(e) => handleNames(e)}
                    name="username"
                    value={create.username}
                    type="text"
                    className={`form-control inpp clk ${err.errBox == 3 && "redInp"}`}
                    placeholder="Create New Username . . ."
                    spellCheck="off"
                    autoComplete="off" />
            </div>


            {err.msg !== "" && (
                <p className="errMsg wd">
                    {err.msg}
                </p>
            )}


            <div className="inpdiv wd isFlex btndiv">
                {
                    loadx ?
                        <LoadingBtn typ="1" />
                        :
                        <Btn fn={nextStep} msg="Next Step" typ="1" />
                }

            </div>

        </div>
    );
}