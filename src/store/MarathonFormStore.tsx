import { create } from "zustand";
import { type MarathonFormState } from "../libs/Store";
export const useMarathonFormStore = create<MarathonFormState>((set) => ({
  fname: "",
  lname: "",
  plan: "funrun",
  gender: "male",
  email: "",
  password: "",
  confirmPassword: "",
  haveCoupon: false,
  couponCode: "",
  setFname: (fname) =>
    set(() => ({
      fname: fname,
    })),
  setLname: (_lname) =>
    set(() => ({
      lname: _lname,
    })),
  setPlan: (_plan) =>
    set(() => ({
      plan: _plan,
    })),
  setGender: (_gender) =>
    set(() => ({
      gender: _gender,
    })),
  setEmail: (_email) =>
    set(() => ({
      email: _email,
    })),
  setPassword: (_password) =>
    set(() => ({
      password: _password,
    })),
  setConfirmPassword: (_confirmPassword) =>
    set(() => ({
      confirmPassword: _confirmPassword,
    })),
  setHaveCoupon: (_haveCoupon) =>
    set(() => ({
      haveCoupon: _haveCoupon,
    })),
  setCouponCode: (_couponCode) =>
    set(() => ({
      couponCode: _couponCode,
    })),
  // Function ชื่อ discountCupon คำนวณ total ตรงนี้
  reset: () =>
    set({
      fname: "",
      lname: "",
      plan: "funrun",
      gender: "male",
      email: "",
      password: "",
      confirmPassword: "",
      haveCoupon: false,
      couponCode: "",
    }),
}));
