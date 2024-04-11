import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import "./ValidateUserForm.css";

interface FormValues {
    email: string;
    password: string;
}

function SignInForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const formSubmit: SubmitHandler<FormValues> = (data) => {
        console.log("Form Submitted: ", data);
        const { email, password } = data;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("User signed in: ", user);
                navigate("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorCode", errorCode);
                console.log("errorMessage", errorMessage);
            });
    };

    return (
        <>
            <form
                className="validate-user-form"
                onSubmit={handleSubmit(formSubmit)}
            >
                <h1>Sign In</h1>
                <div>
                    {/* <label htmlFor="email"></label> */}
                    <input
                        placeholder="Email..."
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div>
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                        placeholder="Password..."
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button type="submit" className="submit-btn">
                    Sign in
                </button>
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </form>
        </>
    );
}

export default SignInForm;
