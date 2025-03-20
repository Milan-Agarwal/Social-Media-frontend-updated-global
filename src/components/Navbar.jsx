import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import styled from 'styled-components';

const Navbar = () => {
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleLogout = () => {
        // Remove user authentication data
        localStorage.removeItem("userId");
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login");
    };

    return (
        <nav className="bg-violet-700 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
            <div className="flex items-center gap-2 flex-col">
                <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
                <h1 className="text-lg font-bold">SocialMedia</h1>
            </div>
            <StyledWrapper2>
                <button onClick={() => navigate("/feed")}>
                    <span className="span-mother">
                        <span>H</span>
                        <span>o</span>
                        <span>m</span>
                        <span>e</span>
                    </span>
                    <span className="span-mother2">
                        <span>H</span>
                        <span>o</span>
                        <span>m</span>
                        <span>e</span>
                    </span>
                </button>
            </StyledWrapper2>

            <StyledWrapper>
                <button className="btn-23" onClick={() => navigate("/Friends")}>
                    <span className="text">Friends</span>
                    <span aria-hidden className="marquee">Friends</span>
                </button>
            </StyledWrapper>

            <StyledWrapper>
                <button className="button button-item" onClick={() => navigate("/peoplelist")}>
                    <span className="button-bg">
                        <span className="button-bg-layers">
                            <span className="button-bg-layer button-bg-layer-1 -purple" />
                            <span className="button-bg-layer button-bg-layer-2 -turquoise" />
                            <span className="button-bg-layer button-bg-layer-3 -yellow" />
                        </span>
                    </span>
                    <span className="button-inner">
                        <span className="button-inner-static">People</span>
                        <span className="button-inner-hover">People</span>
                    </span>
                </button>
            </StyledWrapper>

            <StyledWrapper3>
                <button className="Btn" onClick={handleLogout}>
                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>        <div className="text">Logout</div>
                </button>
            </StyledWrapper3>

            <StyledWrapper4>
                <button onClick={() => navigate("/")}>
                    <span>Signup</span>
                </button>
            </StyledWrapper4>
        </nav>
    );
};

const StyledWrapper = styled.div`
  .btn-23,
  .btn-23 *,
  .btn-23 :after,
  .btn-23 :before,
  .btn-23:after,
  .btn-23:before {
    border: 0 solder-bo</div> .btn-23-webkit-tap-highlight-colo transparent;
    -webkit-apprance: button;
    background-color: #000;
    background-image: none;
    color: #fff;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    font-weight: 900;
    line-height: 1.5;
    margsolder: -</div> al-gradie000, #fff);
    padding: 0;
    text-transform: uppercase;
  }

  .btn-23:disabled {
    cursor: default;
  }

  .btn-23:-moz-focusring {
    outline: auto;
  }

  .btn-23 svg {
    display: block;
    vertical-align: middle;
  }

  .btn-23 [hidden] {
    display: none;
  }

  .btn-23 {
    border-radius: 99rem;
    border-width: 2px;
    overflow: hidden;
    padding: 0.8rem 3rem;
    position: relative;
  }

  .btn-23 span {
    display: grid;
    inset: 0;
    place-items: center;
    position: absolute;
    transition: opacity 0.2s ease;
  }

  .btn-23 .marquee {
    --spacing: 5em;
    --start: 0em;
    --end: 5em;
    -webkit-animation: marquee 1s linear infinite;
    animation: marquee 1s linear infinite;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    opacity: 0;
    position: relative;
    text-shadow: #fff var(--spacing) 0, #fff calc(var(--spacing) * -1) 0,
      #fff calc(var(--spacing) * -2) 0;
  }

  .btn-23:hover .marquee {
    -webkit-animation-play-state: running;
    animation-play-state: running;
    opacity: 1;
  }

  .btn-23:hover .text {
    opacity: 0;
  }

  @-webkit-keyframes marquee {
    0% {
      transform: translateX(var(--start));
    }

    to {
      transform: translateX(var(--end));
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(var(--start));
    }

    to {
      transform: translateX(var(--end));
    }
  }
   
  button {
    all: unset;
  }

  .button {
    position: relative;
    display: inline-flex;
    height: 3rem; /* Reduced height */
    align-items: center;
    border-radius: 9999px;
    padding-left: 1.5rem; /* Reduced padding */
    padding-right: 1.5rem; /* Reduced padding */
    font-family: Segoe UI;
    font-size: 1rem; /* Slightly smaller font size */
    font-weight: 640;
    color: #fafaf6;
    letter-spacing: -0.06em;
  }

  .button-item {
    background-color: transparent;
    color: #1d1d1f;
  }

  .button-item .button-bg {
    border-color: rgba(255, 208, 116);
    background-color: rgba(255, 208, 116);
  }

  .button-inner,
  .button-inner-hover,
  .button-inner-static {
    pointer-events: none;
    display: block;
  }

  .button-inner {
    position: relative;
  }

  .button-inner-hover {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(70%);
  }

  .button-bg {
    overflow: hidden;
    border-radius: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 1.8s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button-bg,
  .button-bg-layer,
  .button-bg-layers {
    display: block;
  }

  .button-bg-layers {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: -60%;
    aspect-ratio: 1 / 1;
    width: max(180%, 8rem); /* Adjusted size for responsiveness */
  }

  .button-bg-layer {
    border-radius: 9999px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
  }

  .button-bg-layer.-purple {
    background-color: rgba(163, 116, 255);
  }

  .button-bg-layer.-turquoise {
    background-color: rgba(23, 241, 209);
  }

  .button-bg-layer.-yellow {
    --tw-bg-opacity: 1;
    background-color: rgba(255, 208, 116, var(--tw-bg-opacity));
  }

  .button:hover .button-inner-static {
    opacity: 0;
    transform: translateY(-70%);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-inner-hover {
    opacity: 1;
    transform: translateY(0);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button:hover .button-bg-layer {
    transition:
      transform 1.3s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-bg-layer-1 {
    transform: scale(1);
  }

  .button:hover .button-bg-layer-2 {
    transition-delay: 0.1s;
    transform: scale(1);
  }

  .button:hover .button-bg-layer-3 {
    transition-delay: 0.2s;
    transform: scale(1);
  }

  @media (max-width: 768px) {
    .btn-23 {
      padding: 0.6rem 2rem;
      font-size: 0.9rem;
    }
    .btn-23 .marquee {
      font-size: 0.8rem;
    }
    .button {
      height: 2.5rem; /* Further reduced height for smaller screens */
      padding-left: 1.2rem;
      padding-right: 1.2rem;
      font-size: 0.9rem;
    }
    .button-bg-layers {
      width: max(160%, 7rem); /* Adjusted for smaller screens */
    }
  }
`; 
  const StyledWrapper2 = styled.div`
  button {
    font-weight: bold;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
    width: 95.02px;
    height: 42.66px;
    border: none;
    background-color: #3653f8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
  }

  button:hover .span-mother {
    position: absolute;
  }

  button:hover .span-mother span {
    transform: translateY(1.2em);
  }

  button .span-mother span:nth-child(1) {
    transition: 0.2s;
  }

  button .span-mother span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother span:nth-child(5) {
    transition: 0.6s;
  }

  button .span-mother span:nth-child(6) {
    transition: 0.7s;
  }

  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
  }

  button .span-mother2 span {
    transform: translateY(-1.2em);
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }

  button .span-mother2 span {
    transition: 0.2s;
  }

  button .span-mother2 span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother2 span:nth-child(3) {
    transition: 0.4s;
  }

  button .span-mother2 span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother2 span:nth-child(5) {
    transition: 0.6s;
  }

  button .span-mother2 span:nth-child(6) {
    transition: 0.7s;
  }

  @media (max-width: 768px) {
    button {
      width: 80px;
      height: 36px;
      font-size: 0.8rem;
    }
    button .span-mother span,
    button .span-mother2 span {
      font-size: 0.7rem;
    }
  }
`;
  const StyledWrapper3 = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: rgb(255, 65, 65);
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .3s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .3s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }

  @media (max-width: 768px) {
    .Btn {
      width: 40px;
      height: 40px;
    }
    .Btn:hover {
      width: 100px;
    }
    .text {
      font-size: 1rem;
    }
  }
`;

  const StyledWrapper4 = styled.div`
  button {
   outline: none;
   cursor: pointer;
   border: none;
   padding: 0.9rem 2rem;
   margin: 0;
   font-family: inherit;
   font-size: inherit;
   position: relative;
   display: inline-block;
   letter-spacing: 0.05rem;
   font-weight: 700;
   font-size: 17px;
   border-radius: 500px;
   overflow: hidden;
   background: #66ff66;
   color: ghostwhite;
  }

  button span {
   position: relative;
   z-index: 10;
   transition: color 0.4s;
  }

  button:hover span {
   color: black;
  }

  button::before,
  button::after {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   z-index: 0;
  }

  button::before {
   content: "";
   background: #000;
   width: 120%;
   left: -10%;
   transform: skew(30deg);
   transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  button:hover::before {
   transform: translate3d(100%, 0, 0);
  }

  @media (max-width: 768px) {
    button {
      padding: 0.7rem 1.5rem;
      font-size: 0.9rem;
    }
  }
`;
export default Navbar;