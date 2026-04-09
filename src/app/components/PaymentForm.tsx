"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormSchema, PaymentFormInputs } from "../types";
import Image from "next/image";

interface PaymentFormProps {
  onSubmit: (data: PaymentFormInputs) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(PaymentFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Card Holder */}
      <div>
        <label className="block text-sm font-medium mb-1">Card Holder</label>
        <input
          type="text"
          {...register("CardHolder")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.CardHolder && <p className="text-red-500 text-sm">{errors.CardHolder.message}</p>}
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <input
          type="text"
          maxLength={16}
          {...register("CardNumber")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.CardNumber && <p className="text-red-500 text-sm">{errors.CardNumber.message}</p>}
      </div>

      {/* Expiration Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Expiration Date (MM/YY)</label>
        <input
          type="text"
          placeholder="MM/YY"
          maxLength={5}
          {...register("ExpitationDate")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.ExpitationDate && <p className="text-red-500 text-sm">{errors.ExpitationDate.message}</p>}
      </div>

      {/* CVV */}
      <div>
        <label className="block text-sm font-medium mb-1">CVV</label>
        <input
          type="text"
          maxLength={3}
          {...register("cvv")}
          className="w-full border border-gray-300 rounded p-2"
        />
        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
      </div>



<div className="flex items-center gap-2 mt-4">
  <Image  src="/klarna.png" alt="klarna" width ={50}height={25} className="border-md"/>
  <Image  src="/cards.png" alt="klarna" width ={50}height={25} className="border-md"/>
  <Image  src="/stripe.png" alt="klarna" width ={50}height={25} className="border-md"/>

</div>
      <button
        type="submit"
        className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900 transition"
      >
        Submit Payment
      </button>
    </form>
  );
};

export default PaymentForm;
