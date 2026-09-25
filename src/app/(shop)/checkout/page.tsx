"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { PageHero } from "@/components/shared/page-hero";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";

const provinces = [
  { value: "gauteng", label: "Gauteng" },
  { value: "western-cape", label: "Western Cape" },
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
  { value: "eastern-cape", label: "Eastern Cape" },
  { value: "free-state", label: "Free State" },
  { value: "limpopo", label: "Limpopo" },
  { value: "mpumalanga", label: "Mpumalanga" },
  { value: "north-west", label: "North West" },
  { value: "northern-cape", label: "Northern Cape" },
];

export default function CheckoutPage() {
  const { items, total, clearCart, hydrated } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Phase 1: mocked payment — no real transaction is processed here.
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      clearCart();
    }, 900);
  }

  if (submitted) {
    return (
      <>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
        <section className="py-24 px-6 max-w-2xl mx-auto text-center">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-sm bg-paper">
            <Image
              src="/images/checkout/thank-you.webp"
              alt="A Colour Cafe coffee beside a hand fanning through paint colour cards"
              fill
              sizes="(min-width: 672px) 624px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <h1>Thank you for your order!</h1>
          <p className="mt-4 text-muted leading-relaxed">
            Your order has been placed successfully. This is a demo checkout, so no payment has actually been
            processed and no order will be shipped.
          </p>
          <Button href="/products" className="mt-8" variant="primary">
            Continue Shopping
          </Button>
        </section>
      </>
    );
  }

  if (!hydrated) {
    return (
      <>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        <section className="py-24 px-6 max-w-2xl mx-auto" aria-hidden="true" />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
        <section className="py-24 px-6 max-w-2xl mx-auto text-center">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-sm bg-paper">
            <Image
              src="/images/checkout/empty-bag.webp"
              alt="A Colour Cafe coffee cup in front of Olympic Paints Adventure colour boxes"
              fill
              sizes="(min-width: 672px) 624px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <h1>Your bag is empty.</h1>
          <p className="mt-4 text-muted">Add some products before checking out.</p>
          <Button href="/products" className="mt-8" variant="primary">
            Shop Products
          </Button>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <PageHero
        eyebrow="Checkout"
        title="Complete your order."
        backgroundImage="/images/checkout/hero.webp"
        compact
      />

      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <form className="lg:col-span-2 space-y-10" onSubmit={handleSubmit}>
            <fieldset className="space-y-4">
              <legend className="text-lg font-medium mb-2">Shipping Details</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" required autoComplete="given-name" />
                <Input label="Last Name" name="lastName" required autoComplete="family-name" />
              </div>
              <Input label="Email" name="email" type="email" required autoComplete="email" />
              <Input label="Phone" name="phone" type="tel" required autoComplete="tel" />
              <Input label="Street Address" name="address" required autoComplete="street-address" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="City" name="city" required autoComplete="address-level2" />
                <Select label="Province" name="province" options={provinces} required />
                <Input label="Postal Code" name="postalCode" required autoComplete="postal-code" />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-lg font-medium mb-2">Payment Details</legend>
              <p className="text-xs text-muted -mt-2">
                This is a demo store. Do not enter real card details &mdash; no payment will be processed.
              </p>
              <Input label="Name on Card" name="cardName" required autoComplete="cc-name" />
              <Input label="Card Number" name="cardNumber" required autoComplete="off" inputMode="numeric" placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry (MM/YY)" name="cardExpiry" required autoComplete="off" placeholder="MM/YY" />
                <Input label="CVC" name="cardCvc" required autoComplete="off" inputMode="numeric" placeholder="123" />
              </div>
            </fieldset>

            <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
              {submitting ? "Processing…" : `Place Order — ${formatPrice(total)}`}
            </Button>
          </form>

          <aside className="border border-ink/10 rounded-sm p-6 h-fit">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <ul className="divide-y divide-ink/10">
              {items.map((item) => (
                <li key={`${item.productId}-${item.sizeLabel}-${item.colourId}`} className="py-3 flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-muted mt-0.5">
                      {item.sizeLabel}
                      {item.colourName ? ` · ${item.colourName}` : ""} &times; {item.qty}
                    </p>
                  </div>
                  <p className="whitespace-nowrap">{formatPrice(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink/10 font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
