"use client";
import useCart from "@/hooks/useCart";
import { useEffect, useState } from "react";
import createOrder from "@/app/actions/Order/createOrder";
import Swal from "sweetalert2";
const Payment = (props) => {
  const { userInfo, user } = props;

  const [message, setMessage] = useState("");
  const { basket } = useCart();

  useEffect(() => {
    async function setupPaymentForm() {
      try {
        if (basket.length === 0) {
          setMessage("Sepetiniz Boş");
          return;
        }

        const res = await createOrder(user, userInfo, basket);

        if (res?.status === "success") {
          const checkoutFormContent = res.checkoutFormContent;

          if (checkoutFormContent) {
            const div = document.createElement("div");
            div.innerHTML = checkoutFormContent;
            document.getElementById("iyzipay-checkout-form").appendChild(div);

            // Script'i çalıştırmak için script içeriğini ayrıştır ve çalıştır
            const scripts = div.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const script = document.createElement("script");
              script.type = "text/javascript";
              script.text = scripts[i].text;
              document.head.appendChild(script);
            }
          }
        } else {
          setMessage(res);
          return;
        }
      } catch (error) {
        setMessage(error);
      }
    }
    async function checkbasket() {
      if (basket.length === 0) {
        await Swal.fire({
          icon: "error",
          title: "Sepetiniz Boş",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      }
    }
    checkbasket();
    setupPaymentForm();
  }, [basket, user, userInfo]);

  return (
    <>
      <div className="order_review bg-white">
        <div className="payment_method flex flex-col items-center justify-center mb-12 md:mb-0">
          <div className="text-sm text-center text-red-600">
            {message && message}
          </div>
          {basket.length > 0 && (
            <div
              id="iyzipay-checkout-form"
              className="responsive w-full h-full"
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
