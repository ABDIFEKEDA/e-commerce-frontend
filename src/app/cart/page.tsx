"use client";

import React, { useState } from "react";
import { CartItemType, PaymentFormInputs, ShippingFormInputs } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Trash2 } from "lucide-react";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import Image from "next/image";
import useCartStore from "../stores/stores";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeStep = parseInt(searchParams.get("step") || "1");
  const [shippingData, setShippingData] = useState<ShippingFormInputs>();
  const [paymentData, setPaymentData] = useState<PaymentFormInputs>();

  // ✅ FIRST get cart from Zustand
  const { cart, removeFromCart, clearCart } = useCartStore();

 
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1; // 10% discount
  const shippingFee = 10.0;
  const total = subtotal - discount + shippingFee;

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      {/* Step Navigation */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((s) => (
          <div
            key={`step-${s.id}`} // ✅ unique key for steps
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              s.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                s.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {s.id}
            </div>
            <p>{s.title}</p>
          </div>
        ))}
      </div>

      {/* Step Content and Cart Details */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* Step Content */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 rounded-lg flex flex-col gap-8 p-4">
          {/* Step 1: Shopping Cart */}
          {activeStep === 1 &&
            cart.map((item) => (
              <div
                key={`${item.id}+${item.selectSize}+${item.selectColor}`} // ✅ unique key for cart items
                className="flex items-center justify-between"
              >
                <div className="flex gap-8">
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden mt-2 ml-2 mb-2">
                    <Image
                      src={
                        item.image[item.selectColor.toLowerCase() as keyof typeof item.image] ||
                        Object.values(item.image)[0]
                      }
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {item.selectSize}
                      </p>
                      <p className="text-sm text-gray-500">
                        Color: {item.selectColor}
                      </p>
                      <p className="text-sm text-gray-500">
                        Category: {item.category}
                      </p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="w-8 h-8 rounded-full bg-red-100 text-red-400 flex items-center justify-center cursor-pointer mr-2 mt-2 hover:bg-gray-200 transition-all duration-300"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}

          {/* Step 2: Shipping Form */}
          {activeStep === 2 && (
            <div>
              <ShippingForm
                onSubmit={(data) => {
                  setShippingData(data);
                }}
              />
              {/* Continue button after filling shipping */}
              {shippingData && (
                <button
                  className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-4 hover:bg-gray-900 transition-all duration-300"
                  onClick={() => router.push("/cart?step=3", { scroll: false })}
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          )}

          {/* Step 3: Payment Form */}
          {activeStep === 3 && (
            <PaymentForm
              onSubmit={(data) => {
                setPaymentData(data);
                console.log("Order complete!", { shippingData, paymentData });
              }}
            />
          )}
        </div>

        {/* Cart Details */}
        <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 rounded-lg flex flex-col gap-8 h-max p-4">
          <h1 className="font-semibold flex items-center justify-center">
            Cart Details
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Subtotal</p>
              <p className="text-sm font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Discount (10%)</p>
              <p className="text-sm font-medium">${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Shipping Fee</p>
              <p className="text-sm font-medium">${shippingFee.toFixed(2)}</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-sm text-gray-900 font-semibold">Total</p>
              <p className="text-sm font-medium">${total.toFixed(2)}</p>
            </div>

            {/* Continue button for Step 1 */}
            {activeStep === 1 && (
              <button
                className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300"
                onClick={() => router.push("/cart?step=2", { scroll: false })}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
