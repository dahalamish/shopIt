import React, { useEffect, useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import { FaHeart } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWishlist,
  updateWishlist,
} from "../features/wishlist/wishlistSlice";
import { store } from "../store";
import "../styles/Header.css";

const Header = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);

  const loginState = useSelector((state) => state.auth.isLoggedIn);

  const fetchWishlist = async () => {
    if (loginState) {
      try {
        const getResponse = await axios.get(
          `http://localhost:8080/user/${localStorage.getItem("id")}`
        );
        const userObj = getResponse.data;
        store.dispatch(updateWishlist({ userObj }));
      } catch (error) {
        console.error(error);
      }
    } else {
      store.dispatch(clearWishlist());
    }
  };

  useEffect(() => {
    setIsLoggedIn(loginState);
    fetchWishlist();
  }, [loginState]);

  return (
    <div className="navbar bg-base-100 max-w-7xl text-2xl mx-auto">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
        >
          <AiFillShopping />
          House Of Fashion
        </Link>
      </div>
      <div className="flex-none flex items-center space-x-4">
        <NavLink className="text-accent-content" to="/">
          Home
        </NavLink>
        <NavLink className="text-accent-content" to="/shop">
          Shop
        </NavLink>
        <NavLink className="text-accent-content" to="/about-us">
          About us
        </NavLink>
        <NavLink className="text-accent-content" to="/contact">
          Contact
        </NavLink>
        {!isLoggedIn && (
          <>
            <NavLink className="text-accent-content" to="/login">
              Login
            </NavLink>
            <NavLink className="text-accent-content" to="/register">
              Register
            </NavLink>
          </>
        )}
        <Link
          to="/search"
          className="btn btn-ghost btn-circle text-accent-content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>
        <Link
          to="/wishlist"
          className="btn btn-ghost btn-circle text-accent-content"
        >
          <FaHeart className="text-xl" />
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg text-accent-content">
                {amount} Items
              </span>
              <span className="text-info text-accent-content">
                Subtotal: ${total.toFixed(2)}
              </span>
              <div className="card-actions">
                <Link
                  to="/cart"
                  className="btn bg-blue-600 btn-block text-white hover:bg-blue-500 text-base-content"
                >
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                  alt="avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  to="/user-profile"
                  className="justify-between text-accent-content"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/order-history" className="text-accent-content">
                  Order history
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-accent-content">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
