import {
    useForm,
    SubmitHandler,
    FieldValues,
    UseFormRegister,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import "./ValidateUserForm.css";

interface SignUpFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

function SignUpForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormData>();

    const formSubmit: SubmitHandler<SignUpFormData> = (data) => {
        console.log("Form Submitted: ", data);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                // Redirect to a new page after successful form submission
                setTimeout(() => {
                    navigate("/");
                }, 300);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
    };

    return (
        <form
            className="validate-user-form"
            onSubmit={handleSubmit(formSubmit)}
        >
            <h1>Sign Up</h1>
            <div>
                {/* <label htmlFor="email">Email:</label> */}
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
                {/*  <label htmlFor="password">Password:</label> */}
                <input
                    placeholder="Password..."
                    id="password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div>
                {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
                <input
                    placeholder="Confirm Password..."
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                    })}
                />
                {errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                )}
            </div>

            <button className="submit-btn" type="submit">
                Register
            </button>
            <Link to="/signin">Already have an account? Sign In</Link>
        </form>
    );
}

export default SignUpForm;
