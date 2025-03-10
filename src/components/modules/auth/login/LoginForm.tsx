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
import { loginrUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { loginValidation } from "./loginValidation";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });
  const { setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const result = await loginrUser(data);
      setIsLoading(true);
      if (result?.success) {
        toast.success(result.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(result.message);
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
            L
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            O
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            G
          </div>
          <div className=" font-bold text-2xl rounded-full text-black flex items-center justify-center   ">
            I
          </div>
          <div className=" font-bold text-black rounded-full flex items-center justify-center  text-2xl ">
            N
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
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <Label htmlFor="text"> Email or Number</Label>
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

            <Button
              type="submit"
              className="w-full bg-[#16a34a] hover:bg-[#16a34a] mt-4"
            >
              {isSubmitting ? "LOGING......" : "LOGIN"}
            </Button>
          </form>
        </Form>

        <p className="text-center mt-4">
          You have no account?
          <a
            href="/register"
            className="text-[#16a34a] font-semibold hover:underline"
          >
            REGISTER HERE
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
