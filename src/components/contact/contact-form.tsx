"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" id="consult">
      <div>
        <Label htmlFor="name">نام و نام خانوادگی</Label>
        <Input id="name" name="name" required placeholder="نام شما" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="phone">شماره تماس</Label>
        <Input id="phone" name="phone" required placeholder="09..." className="mt-2" />
      </div>
      <div>
        <Label htmlFor="subject">موضوع</Label>
        <Input id="subject" name="subject" required placeholder="موضوع مشاوره" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="message">توضیحات</Label>
        <Textarea id="message" name="message" required placeholder="شرح مختصر پرونده یا سوال حقوقی" className="mt-2" />
      </div>
      <Button type="submit" className="w-full">
        ارسال درخواست مشاوره
      </Button>
      {sent ? <p className="text-sm text-emerald-300">درخواست شما ثبت شد. به زودی با شما تماس می‌گیریم.</p> : null}
    </form>
  );
}
