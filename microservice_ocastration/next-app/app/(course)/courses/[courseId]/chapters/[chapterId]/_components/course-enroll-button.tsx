"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      triggerEmailAndMessage();
      window.location.assign(response.data.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerEmailAndMessage = async () => {
    try {
      console.log("hay dilan 1");
      // Send request to trigger email and message functions
      const res = await axios.post(`http://localhost:3001/api/sendEmail`);
      toast.success("Email and SMS sent successfully");
      console.log(res);
      console.log("awa dilaaan");
    } catch (error) {
      toast.error("Failed to send email and SMS");
    }
  };

  return (
    <Button
      size="sm"
      className="w-full md:w-auto"
      onClick={onClick}
      disabled={isLoading}
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
