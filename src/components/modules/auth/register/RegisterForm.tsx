"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { registerValidation } from "./registerValidation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerValidation),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const result = await registerUser(data);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message);
      }
      return result;
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen   bg-gray-100">
      <div className="bg-white p-8 rounded-lg  border-2  w-full max-w-sm">
        <div className="flex items-center justify-center  rounded-full">
          <div className="w-10 h-10 font-bold text-2xl rounded-full text-white flex items-center justify-center bg-[#16a34a]  ">
            R
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            E
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            G
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            I
          </div>
          <div className=" font-bold text-black rounded-full flex items-center justify-center  text-2xl ">
            S
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            T
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            E
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            R
          </div>
          <div className="w-10 h-10 font-bold text-2xl rounded-full text-white flex items-center justify-center   "></div>
          <div className="w-10 h-10 font-bold text-2xl rounded-full text-white flex items-center justify-center bg-[#16a34a]  ">
            F
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            O
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            R
          </div>

          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            M
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label htmlFor="text">Name</Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label htmlFor="email"> Email</Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label htmlFor="text">Number </Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label htmlFor="password">Confirm Password</Label>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {confirmPassword && password != confirmPassword ? (
                    <FormMessage>Password do not match</FormMessage>
                  ) : (
                    <FormMessage></FormMessage>
                  )}
                </FormItem>
              )}
            ></FormField>

            <Button
              disabled={
                confirmPassword && password != confirmPassword ? true : false
              }
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#16a34a] mt-4"
            >
              {isSubmitting ? "REGISTER...." : "REGISTER"}
            </Button>
          </form>
        </Form>

        <p className="text-center mt-4">
          Already have an account?
          <a
            href="/login"
            className="text-[#16a34a] font-semibold hover:underline"
          >
            LOGIN HERE
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
